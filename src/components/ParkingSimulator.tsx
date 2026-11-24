import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Car,
  CheckCircle2,
  List,
  LogOut,
  Pause,
  Play,
  Plus,
  RotateCcw,
  SkipBack,
  SkipForward,
  Terminal,
} from 'lucide-react';
import {
  buildWalkthroughStateAtStep,
  createParkingLot,
  getFreeSlots,
  logDisplayParked,
  logDisplayWaiting,
  logStatus,
  MAX_CAPACITY,
  MIN_CAPACITY,
  type ParkingLotState,
  vehicleEntry,
  vehicleExit,
} from '../simulation/parkingLot';
import { SAMPLE_PLATES, WALKTHROUGH_PRESETS, type WalkthroughPreset } from '../data/reportData';

interface ParkingSimulatorProps {
  lotState: ParkingLotState;
  onChangeState: (next: ParkingLotState) => void;
  activePresetId: WalkthroughPreset['id'] | null;
  presetStep: number;
  onSelectPreset: (id: WalkthroughPreset['id'] | null, step?: number) => void;
}

export function ParkingSimulator({
  lotState,
  onChangeState,
  activePresetId,
  presetStep,
  onSelectPreset,
}: ParkingSimulatorProps) {
  const [plateInput, setPlateInput] = useState('');
  const [sampleCursor, setSampleCursor] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const consoleEndRef = useRef<HTMLDivElement | null>(null);

  const activePreset = WALKTHROUGH_PRESETS.find((p) => p.id === activePresetId) ?? null;

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollTop = consoleEndRef.current.scrollHeight;
    }
  }, [lotState.consoleLog.length]);

  useEffect(() => {
    if (!isPlaying || !activePreset) return;
    if (presetStep >= activePreset.steps.length) {
      setIsPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => {
      const nextStep = presetStep + 1;
      onSelectPreset(activePreset.id, nextStep);
      onChangeState(buildWalkthroughStateAtStep(activePreset.capacity, activePreset.steps, nextStep));
    }, 1100);
    return () => window.clearTimeout(timer);
  }, [isPlaying, activePreset, presetStep, onSelectPreset, onChangeState]);

  function handleCapacityChange(newCap: number) {
    setIsPlaying(false);
    onSelectPreset(null, 0);
    onChangeState(createParkingLot(newCap));
  }

  function handleSubmitEntry(e: React.FormEvent) {
    e.preventDefault();
    setIsPlaying(false);
    onSelectPreset(null, 0);
    const next = vehicleEntry(lotState, plateInput);
    onChangeState(next);
    if (next.lastTransition.type === 'parked' || next.lastTransition.type === 'queued') {
      setPlateInput('');
    }
  }

  function handleFillSamplePlate() {
    const used = new Set([...lotState.parked, ...lotState.waiting]);
    let picked = SAMPLE_PLATES[sampleCursor % SAMPLE_PLATES.length];
    for (let i = 0; i < SAMPLE_PLATES.length; i++) {
      const candidate = SAMPLE_PLATES[(sampleCursor + i) % SAMPLE_PLATES.length];
      if (!used.has(candidate)) {
        picked = candidate;
        setSampleCursor((sampleCursor + i + 1) % SAMPLE_PLATES.length);
        break;
      }
    }
    setPlateInput(picked);
  }

  function handleExitVehicle() {
    setIsPlaying(false);
    onSelectPreset(null, 0);
    onChangeState(vehicleExit(lotState));
  }

  function handleReset() {
    setIsPlaying(false);
    onSelectPreset(null, 0);
    setPlateInput('');
    onChangeState(createParkingLot(lotState.capacity));
  }

  function handleLoadPreset(preset: WalkthroughPreset) {
    setIsPlaying(false);
    onSelectPreset(preset.id, 0);
    onChangeState(createParkingLot(preset.capacity));
  }

  function handleStepPreset(targetStep: number) {
    if (!activePreset) return;
    setIsPlaying(false);
    const clamped = Math.max(0, Math.min(activePreset.steps.length, targetStep));
    onSelectPreset(activePreset.id, clamped);
    onChangeState(buildWalkthroughStateAtStep(activePreset.capacity, activePreset.steps, clamped));
  }

  const freeSlots = getFreeSlots(lotState);
  const stackSlots = Array.from({ length: lotState.capacity }, (_, idx) => {
    const slotNumber = lotState.capacity - idx;
    const plate = lotState.parked[slotNumber - 1] ?? null;
    const isTop = plate !== null && slotNumber === lotState.parked.length;
    return { slotNumber, plate, isTop };
  });

  const transitionTone = (() => {
    switch (lotState.lastTransition.type) {
      case 'parked':
        return {
          border: 'border-blue-200 bg-blue-50/70 text-blue-950',
          label: 'STACK PUSH',
          icon: <CheckCircle2 className="h-4 w-4 text-blue-700 shrink-0" aria-hidden="true" />,
        };
      case 'queued':
        return {
          border: 'border-amber-200 bg-amber-50/80 text-amber-950',
          label: 'QUEUE ENQUEUE',
          icon: <ArrowRight className="h-4 w-4 text-amber-700 shrink-0" aria-hidden="true" />,
        };
      case 'auto-allocated':
        return {
          border: 'border-emerald-200 bg-emerald-50/80 text-emerald-950',
          label: 'AUTO-ALLOCATED',
          icon: <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" aria-hidden="true" />,
        };
      case 'exited':
        return {
          border: 'border-slate-300 bg-slate-100 text-slate-900',
          label: 'STACK POP',
          icon: <LogOut className="h-4 w-4 text-slate-700 shrink-0" aria-hidden="true" />,
        };
      case 'duplicate':
      case 'empty-exit':
      case 'invalid':
        return {
          border: 'border-red-200 bg-red-50/80 text-red-950',
          label: 'REJECTED',
          icon: <AlertCircle className="h-4 w-4 text-red-700 shrink-0" aria-hidden="true" />,
        };
      default:
        return {
          border: 'border-slate-200 bg-slate-50 text-slate-700',
          label: 'READY',
          icon: <Car className="h-4 w-4 text-slate-500 shrink-0" aria-hidden="true" />,
        };
    }
  })();

  return (
    <section id="simulator" className="scroll-mt-16 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-blue-700">
            01. Interactive Simulation Engine
          </p>
          <h2 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">
            Live Stack &amp; Queue Parking Simulator
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Test the exact C++ <code className="font-mono text-sm text-slate-900">ParkingLot</code> logic in real time. Vehicles enter a single-lane LIFO stack until full, overflow into a fair FIFO waiting queue, and auto-park whenever the top vehicle exits.
          </p>
        </div>

        {/* Two-Zone Sandbox Layout: Left Interactive Stage (~62%) + Right Control Deck (~38%) */}
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-start">
          {/* LEFT ZONE: Interactive Visual Stage */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
              {/* Live Status Strip matching lot.status() */}
              <div
                aria-label="Live parking lot status"
                className="grid grid-cols-2 gap-3 border-b border-slate-200 pb-5 sm:grid-cols-4"
              >
                <div>
                  <p className="text-xs text-slate-500">Capacity</p>
                  <p data-testid="stat-capacity" className="mt-0.5 font-mono text-2xl font-semibold text-slate-900 tabular-nums">
                    {lotState.capacity}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-blue-700 font-medium">Parked (Stack)</p>
                  <p data-testid="stat-parked" className="mt-0.5 font-mono text-2xl font-semibold text-blue-700 tabular-nums">
                    {lotState.parked.length}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-emerald-700 font-medium">Free Slots</p>
                  <p data-testid="stat-free" className="mt-0.5 font-mono text-2xl font-semibold text-emerald-700 tabular-nums">
                    {freeSlots}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-amber-700 font-medium">Waiting (Queue)</p>
                  <p data-testid="stat-waiting" className="mt-0.5 font-mono text-2xl font-semibold text-amber-700 tabular-nums">
                    {lotState.waiting.length}
                  </p>
                </div>
              </div>

              {/* Dual-coded Live Operation Status Banner */}
              <div
                role="status"
                aria-live="polite"
                data-testid="transition-banner"
                className={`mt-5 flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${transitionTone.border}`}
              >
                <div className="mt-0.5">{transitionTone.icon}</div>
                <div className="min-w-0">
                  <span className="font-mono text-xs font-semibold mr-2">
                    [{transitionTone.label}]
                  </span>
                  <span>{lotState.lastTransition.message}</span>
                </div>
              </div>

              {/* Visual Lane Stage: Stack (Vertical LIFO) + Queue (Horizontal FIFO) */}
              <div className="mt-6 grid gap-6 md:grid-cols-12">
                {/* STACK: Parked Vehicles */}
                <div className="md:col-span-6">
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
                    <span className="font-semibold text-slate-900">
                      Parked Vehicles · Stack (LIFO)
                    </span>
                    <span className="font-mono text-blue-700">
                      std::stack&lt;string&gt;
                    </span>
                  </div>

                  {/* Single Gate Top Marker */}
                  <div className="mb-2 flex items-center justify-between px-2 text-xs font-mono text-slate-500">
                    <span className="inline-flex items-center gap-1 text-blue-700 font-medium">
                      <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                      PUSH (Entry)
                    </span>
                    <span>Single Gate</span>
                    <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                      POP (Exit)
                      <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>

                  {/* Open-top, closed-bottom lane walls matching Figure 2.1 */}
                  <div
                    data-testid="stack-lane"
                    className="rounded-b-xl border-x-2 border-b-4 border-slate-800 bg-slate-50 p-3 space-y-2"
                  >
                    {stackSlots.map(({ slotNumber, plate, isTop }) => (
                      <div
                        key={slotNumber}
                        className={`relative flex h-13 items-center justify-between rounded-lg border px-3.5 transition-colors ${
                          plate
                            ? isTop
                              ? 'border-blue-600 bg-blue-50 text-blue-950'
                              : 'border-blue-200 bg-white text-slate-900'
                            : 'border-dashed border-slate-300 bg-slate-100/60 text-slate-400'
                        }`}
                      >
                        <span className="font-mono text-xs font-medium text-slate-500 tabular-nums">
                          Slot {slotNumber}
                        </span>

                        {plate ? (
                          <div
                            key={plate}
                            className="animate-stack-in flex items-center gap-2.5"
                          >
                            <Car
                              className={`h-4 w-4 ${isTop ? 'text-blue-700' : 'text-slate-600'}`}
                              aria-hidden="true"
                            />
                            <span className="font-mono text-sm font-semibold tracking-wide">
                              {plate}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs italic text-slate-400">Free slot</span>
                        )}

                        <span className="w-14 text-right font-mono text-[11px] font-semibold text-blue-700">
                          {isTop ? '← TOP' : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-center font-mono text-[11px] text-slate-500">
                    DEAD-END WALL · BOTTOM (Slot 1 enters first, exits last)
                  </p>
                </div>

                {/* QUEUE: Waiting Vehicles */}
                <div className="md:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
                      <span className="font-semibold text-slate-900">
                        Waiting Outside · Queue (FIFO)
                      </span>
                      <span className="font-mono text-amber-700">
                        std::queue&lt;string&gt;
                      </span>
                    </div>

                    <div className="mb-2 flex items-center justify-between px-2 text-xs font-mono text-slate-500">
                      <span className="text-emerald-700 font-medium">
                        ← DEQUEUE (Auto-Park)
                      </span>
                      <span className="text-amber-700 font-medium">
                        ENQUEUE →
                      </span>
                    </div>

                    <div
                      data-testid="queue-lane"
                      className="min-h-[212px] rounded-xl border-y-2 border-slate-800 bg-slate-50 p-3 flex flex-col justify-center gap-2"
                    >
                      {lotState.waiting.length === 0 ? (
                        <div className="py-10 text-center text-sm text-slate-500">
                          <p className="font-medium text-slate-700">No vehicles waiting</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {freeSlots > 0
                              ? `${freeSlots} slot${freeSlots === 1 ? '' : 's'} still open inside the stack.`
                              : 'Lot is full. Next arriving vehicle will join Position 1.'}
                          </p>
                        </div>
                      ) : (
                        lotState.waiting.map((plate, index) => {
                          const isFront = index === 0;
                          const isRear = index === lotState.waiting.length - 1;
                          return (
                            <div
                              key={plate}
                              className={`animate-queue-in flex items-center justify-between rounded-lg border px-3.5 py-2.5 ${
                                isFront
                                  ? 'border-amber-500 bg-amber-50 text-amber-950'
                                  : 'border-slate-200 bg-white text-slate-900'
                              }`}
                            >
                              <span className="font-mono text-xs text-slate-500 tabular-nums">
                                Pos {index + 1}
                              </span>
                              <span className="inline-flex items-center gap-2 font-mono text-sm font-semibold">
                                <Car className="h-4 w-4 text-amber-700" aria-hidden="true" />
                                {plate}
                              </span>
                              <span className="w-16 text-right font-mono text-[11px] font-semibold text-amber-800">
                                {isFront ? 'FRONT' : isRear ? 'REAR' : ''}
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <p className="mt-2 text-center font-mono text-[11px] text-slate-500">
                      FAIR LINE · Longest-waiting vehicle moves to TOP when a slot opens
                    </p>
                  </div>

                  {/* Quick inspection menu actions matching C++ Menu Options 3, 4, 5 */}
                  <div className="mt-5 pt-4 border-t border-slate-200">
                    <p className="text-xs font-medium text-slate-500 mb-2">
                      C++ Console Inspection Commands
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onChangeState(logDisplayParked(lotState))}
                        className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0"
                      >
                        <List className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>3. Display Parked</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onChangeState(logDisplayWaiting(lotState))}
                        className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0"
                      >
                        <List className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>4. Display Waiting</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onChangeState(logStatus(lotState))}
                        className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0"
                      >
                        <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>5. Show Status</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Authentic C++ Console Output Mirror */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 text-slate-100 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5 text-xs">
                <span className="font-mono font-medium text-slate-300">
                  C++ Console Output (./parking)
                </span>
                <span className="font-mono text-slate-400 tabular-nums">
                  {lotState.consoleLog.length} log entries
                </span>
              </div>
              <div
                ref={consoleEndRef}
                data-testid="console-output"
                className="max-h-56 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-2.5"
              >
                {lotState.consoleLog.map((entry) => (
                  <div key={entry.id}>
                    {entry.command && (
                      <div className="text-slate-400">
                        $ {entry.command}
                      </div>
                    )}
                    {entry.lines.map((line, i) => (
                      <div
                        key={i}
                        className={
                          entry.kind === 'duplicate' || entry.kind === 'invalid-input' || entry.kind === 'empty-exit'
                            ? 'text-red-300'
                            : entry.kind === 'auto-allocated'
                            ? 'text-emerald-300'
                            : entry.kind === 'queued'
                            ? 'text-amber-300'
                            : entry.kind === 'parked'
                            ? 'text-sky-300'
                            : 'text-slate-200'
                        }
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT ZONE: Control & Guided Walkthrough Deck */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* Manual Controls Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-slate-900">
                  Attendant Controls
                </h3>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Reset Lot</span>
                </button>
              </div>

              {/* Capacity Slider */}
              <div>
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="capacity-slider" className="font-medium text-slate-700">
                    Parking Lot Capacity
                  </label>
                  <span className="font-mono text-sm font-semibold text-slate-900 tabular-nums">
                    {lotState.capacity} {lotState.capacity === 1 ? 'slot' : 'slots'}
                  </span>
                </div>
                <input
                  id="capacity-slider"
                  type="range"
                  min={MIN_CAPACITY}
                  max={MAX_CAPACITY}
                  value={lotState.capacity}
                  onChange={(e) => handleCapacityChange(Number(e.target.value))}
                  className="mt-2 w-full accent-blue-700 cursor-pointer"
                />
                <div className="mt-1 flex justify-between font-mono text-[11px] text-slate-400 tabular-nums">
                  <span>{MIN_CAPACITY}</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>{MAX_CAPACITY}</span>
                </div>
              </div>

              {/* Vehicle Entry Form */}
              <form onSubmit={handleSubmitEntry} className="space-y-3 border-t border-slate-200 pt-5">
                <div className="flex items-center justify-between">
                  <label htmlFor="plate-input" className="text-sm font-medium text-slate-700">
                    Vehicle Number Plate
                  </label>
                  <button
                    type="button"
                    onClick={handleFillSamplePlate}
                    className="text-xs font-medium text-blue-700 hover:text-blue-800 hover:underline whitespace-nowrap shrink-0"
                  >
                    Fill sample plate
                  </button>
                </div>
                <input
                  id="plate-input"
                  type="text"
                  value={plateInput}
                  onChange={(e) => setPlateInput(e.target.value.toUpperCase())}
                  placeholder="e.g. MH12AB1234"
                  maxLength={16}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors whitespace-nowrap"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  <span>1. Vehicle Entry (Park / Enqueue)</span>
                </button>
              </form>

              {/* Vehicle Exit Action */}
              <div className="border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={handleExitVehicle}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-900 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors whitespace-nowrap"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  <span>2. Exit Top Vehicle (POP)</span>
                </button>
                <p className="mt-2 text-xs text-slate-500">
                  Removes the top car from the stack. If the waiting queue is non-empty, the front car is automatically parked.
                </p>
              </div>
            </div>

            {/* Guided Report Walkthroughs Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Report Walkthrough Replays
              </h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Step through the exact worked examples documented in the project report.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-2">
                {WALKTHROUGH_PRESETS.map((preset) => {
                  const selected = activePresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleLoadPreset(preset)}
                      className={`w-full rounded-lg border px-3.5 py-3 text-left transition-colors ${
                        selected
                          ? 'border-blue-600 bg-blue-50/70'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-slate-900">
                          {preset.title}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {preset.reference} · {preset.steps.length} steps
                      </p>
                    </button>
                  );
                })}
              </div>

              {activePreset && (
                <div className="mt-4 border-t border-slate-200 pt-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">Playback Progress</span>
                    <span className="font-mono font-semibold text-blue-700 tabular-nums">
                      Step {presetStep} / {activePreset.steps.length}
                    </span>
                  </div>

                  {/* Playback Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleStepPreset(presetStep - 1)}
                      disabled={presetStep === 0}
                      aria-label="Previous walkthrough step"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <SkipBack className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (presetStep >= activePreset.steps.length) {
                          handleStepPreset(0);
                          setIsPlaying(true);
                        } else {
                          setIsPlaying((prev) => !prev);
                        }
                      }}
                      className="flex-1 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 text-xs font-semibold text-white hover:bg-slate-800 whitespace-nowrap"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Pause Replay</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{presetStep >= activePreset.steps.length ? 'Replay Again' : 'Auto Play'}</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStepPreset(presetStep + 1)}
                      disabled={presetStep >= activePreset.steps.length}
                      aria-label="Next walkthrough step"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <SkipForward className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Step List */}
                  <ol className="max-h-44 overflow-y-auto divide-y divide-slate-100 rounded-lg border border-slate-200 text-xs">
                    {activePreset.steps.map((step, idx) => {
                      const num = idx + 1;
                      const isCurrent = num === presetStep;
                      const isDone = num < presetStep;
                      return (
                        <li key={num}>
                          <button
                            type="button"
                            onClick={() => handleStepPreset(num)}
                            className={`flex w-full items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                              isCurrent
                                ? 'bg-blue-50 font-semibold text-blue-900'
                                : isDone
                                ? 'bg-white text-slate-600 hover:bg-slate-50'
                                : 'bg-white text-slate-500 hover:bg-slate-50'
                            }`}
                          >
                            <span className="font-mono text-[11px] tabular-nums w-5 shrink-0 text-slate-400">
                              {num}.
                            </span>
                            <span className="truncate">{step.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
