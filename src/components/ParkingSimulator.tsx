import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Car,
  CheckCircle2,
  LogOut,
  Pause,
  Play,
  Plus,
  RotateCcw,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  buildWalkthroughStateAtStep,
  createParkingLot,
  getFreeSlots,
  getOccupancyRate,
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

const DEMO_PRESET = WALKTHROUGH_PRESETS[0]; // Table 5.1 (Capacity 3, 8 steps)

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

  const isDemoActive = activePresetId === DEMO_PRESET.id;

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollTop = consoleEndRef.current.scrollHeight;
    }
  }, [lotState.consoleLog.length]);

  useEffect(() => {
    if (!isPlaying || !isDemoActive) return;
    if (presetStep >= DEMO_PRESET.steps.length) {
      setIsPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => {
      const nextStep = presetStep + 1;
      onSelectPreset(DEMO_PRESET.id, nextStep);
      onChangeState(buildWalkthroughStateAtStep(DEMO_PRESET.capacity, DEMO_PRESET.steps, nextStep));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [isPlaying, isDemoActive, presetStep, onSelectPreset, onChangeState]);

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

  function handleStepDemo(targetStep: number) {
    setIsPlaying(false);
    const clamped = Math.max(0, Math.min(DEMO_PRESET.steps.length, targetStep));
    onSelectPreset(DEMO_PRESET.id, clamped);
    onChangeState(buildWalkthroughStateAtStep(DEMO_PRESET.capacity, DEMO_PRESET.steps, clamped));
  }

  function handleToggleDemoPlay() {
    if (!isDemoActive || presetStep >= DEMO_PRESET.steps.length) {
      onSelectPreset(DEMO_PRESET.id, 0);
      onChangeState(createParkingLot(DEMO_PRESET.capacity));
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  }

  const freeSlots = getFreeSlots(lotState);
  const occupancyRate = getOccupancyRate(lotState);
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

  const activeStepLabel =
    isDemoActive && presetStep > 0
      ? DEMO_PRESET.steps[presetStep - 1].label
      : 'Replays Table 5.1 (Capacity 3, V1–V5) step by step.';

  return (
    <section id="simulator" className="scroll-mt-16 py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-blue-700">01. Live Demonstration</p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance">
            Interactive Stack &amp; Queue Simulator
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Mirrors the exact C <code className="font-mono text-slate-900">struct ParkingLot</code> logic: vehicles park in a LIFO stack, overflow into a FIFO waiting queue, and auto-park when a slot opens.
          </p>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:items-start">
          {/* LEFT ZONE: Visual Stage + Console */}
          <div className="lg:col-span-8 space-y-5">
            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
              {/* Live Counters */}
              <div
                aria-label="Live parking lot status"
                className="grid grid-cols-4 gap-3 border-b border-slate-200 pb-4"
              >
                <div>
                  <p className="text-xs text-slate-500">Capacity</p>
                  <p data-testid="stat-capacity" className="mt-0.5 font-mono text-2xl font-semibold text-slate-900 tabular-nums">
                    {lotState.capacity}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-blue-700 font-medium">Parked</p>
                  <p data-testid="stat-parked" className="mt-0.5 font-mono text-2xl font-semibold text-blue-700 tabular-nums">
                    {lotState.parked.length}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-emerald-700 font-medium">Free</p>
                  <p data-testid="stat-free" className="mt-0.5 font-mono text-2xl font-semibold text-emerald-700 tabular-nums">
                    {freeSlots}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-amber-700 font-medium">Waiting</p>
                  <p data-testid="stat-waiting" className="mt-0.5 font-mono text-2xl font-semibold text-amber-700 tabular-nums">
                    {lotState.waiting.length}
                  </p>
                </div>
              </div>

              {/* Operation Status Banner */}
              <div
                role="status"
                aria-live="polite"
                data-testid="transition-banner"
                className={`mt-4 flex items-start gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm ${transitionTone.border}`}
              >
                <div className="mt-0.5">{transitionTone.icon}</div>
                <div className="min-w-0">
                  <span className="font-mono text-xs font-semibold mr-2">
                    [{transitionTone.label}]
                  </span>
                  <span>{lotState.lastTransition.message}</span>
                </div>
              </div>

              {/* Aligned Stack & Queue Visual Lanes */}
              <div className="mt-5 grid gap-6 md:grid-cols-2 md:items-stretch">
                {/* STACK: Parked Vehicles */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-900">Parked · Stack (LIFO)</span>
                    <span className="font-mono text-blue-700">struct Stack</span>
                  </div>
                  <div className="mb-1.5 flex items-center justify-between px-1 text-[11px] font-mono text-slate-500">
                    <span className="inline-flex items-center gap-1 text-blue-700 font-medium">
                      <ArrowDown className="h-3 w-3" aria-hidden="true" />
                      PUSH
                    </span>
                    <span>Single Gate</span>
                    <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                      POP
                      <ArrowUp className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </div>

                  <div
                    data-testid="stack-lane"
                    className="flex-1 min-h-[216px] flex flex-col justify-end gap-2 rounded-b-xl border-x-2 border-b-4 border-slate-800 bg-slate-50 p-3"
                  >
                    {stackSlots.map(({ slotNumber, plate, isTop }) => (
                      <div
                        key={slotNumber}
                        className={`flex h-12 items-center justify-between rounded-lg border px-3 transition-colors ${
                          plate
                            ? isTop
                              ? 'border-blue-600 bg-blue-50 text-blue-950'
                              : 'border-blue-200 bg-white text-slate-900'
                            : 'border-dashed border-slate-300 bg-slate-100/60 text-slate-400'
                        }`}
                      >
                        <span className="font-mono text-xs text-slate-500 tabular-nums">
                          Slot {slotNumber}
                        </span>

                        {plate ? (
                          <div key={plate} className="animate-stack-in flex items-center gap-2">
                            <Car
                              className={`h-4 w-4 ${isTop ? 'text-blue-700' : 'text-slate-600'}`}
                              aria-hidden="true"
                            />
                            <span className="font-mono text-sm font-semibold tracking-wide">
                              {plate}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs italic text-slate-400">Free</span>
                        )}

                        <span className="w-12 text-right font-mono text-[11px] font-semibold text-blue-700">
                          {isTop ? '← TOP' : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-1.5 text-center font-mono text-[11px] text-slate-500">
                    BOTTOM (Dead-End Wall)
                  </p>
                </div>

                {/* QUEUE: Waiting Vehicles */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-900">Waiting · Queue (FIFO)</span>
                    <span className="font-mono text-amber-700">struct Queue</span>
                  </div>
                  <div className="mb-1.5 flex items-center justify-between px-1 text-[11px] font-mono text-slate-500">
                    <span className="text-emerald-700 font-medium">← DEQUEUE</span>
                    <span className="text-amber-700 font-medium">ENQUEUE →</span>
                  </div>

                  <div
                    data-testid="queue-lane"
                    className="flex-1 min-h-[216px] flex flex-col justify-center gap-2 rounded-xl border-y-2 border-slate-800 bg-slate-50 p-3"
                  >
                    {lotState.waiting.length === 0 ? (
                      <div className="py-8 text-center text-sm text-slate-500">
                        <p className="font-medium text-slate-700">Queue empty</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {freeSlots > 0
                            ? `${freeSlots} free slot${freeSlots === 1 ? '' : 's'} available.`
                            : 'Lot full — next car enters Pos 1.'}
                        </p>
                      </div>
                    ) : (
                      lotState.waiting.map((plate, index) => {
                        const isFront = index === 0;
                        const isRear = index === lotState.waiting.length - 1;
                        return (
                          <div
                            key={plate}
                            className={`animate-queue-in flex items-center justify-between rounded-lg border px-3 py-2.5 ${
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
                            <span className="w-14 text-right font-mono text-[11px] font-semibold text-amber-800">
                              {isFront ? 'FRONT' : isRear ? 'REAR' : ''}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <p className="mt-1.5 text-center font-mono text-[11px] text-slate-500">
                    FRONT auto-parks when a slot opens
                  </p>
                </div>
              </div>
            </div>

            {/* Compact C Console Output */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 text-slate-100 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2 text-xs font-mono">
                <span className="text-slate-300">Console Output (./parking)</span>
                <span className="text-slate-500 tabular-nums">{lotState.consoleLog.length} events</span>
              </div>
              <div
                ref={consoleEndRef}
                data-testid="console-output"
                className="max-h-36 overflow-y-auto p-3.5 font-mono text-xs leading-relaxed space-y-2"
              >
                {lotState.consoleLog.map((entry) => (
                  <div key={entry.id}>
                    {entry.command && <div className="text-slate-500">$ {entry.command}</div>}
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

          {/* RIGHT ZONE: Controls & Table 5.1 Demo */}
          <div className="lg:col-span-4 space-y-5">
            <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-semibold text-slate-900">
                  Controls
                </h3>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Reset</span>
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="capacity-slider" className="font-medium text-slate-700">
                    Lot Capacity
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
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>8</span>
                </div>
              </div>

              <form onSubmit={handleSubmitEntry} className="space-y-3 border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="plate-input" className="text-sm font-medium text-slate-700">
                    Vehicle Number Plate
                  </label>
                  <button
                    type="button"
                    onClick={handleFillSamplePlate}
                    className="text-xs font-medium text-blue-700 hover:underline whitespace-nowrap shrink-0"
                  >
                    Fill sample
                  </button>
                </div>
                <input
                  id="plate-input"
                  type="text"
                  value={plateInput}
                  onChange={(e) => setPlateInput(e.target.value.toUpperCase())}
                  placeholder="e.g. MH12AB1234"
                  maxLength={16}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors whitespace-nowrap"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  <span>Park / Enqueue Vehicle</span>
                </button>
              </form>

              <div className="border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={handleExitVehicle}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors whitespace-nowrap"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  <span>Exit Top Vehicle (POP)</span>
                </button>
              </div>
            </div>

            {/* Clean Table 5.1 Step-Through Demo */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-display text-base font-semibold text-slate-900">
                  Report Example (Table 5.1)
                </h3>
                <span className="font-mono text-xs text-blue-700 tabular-nums">
                  {isDemoActive ? `${presetStep} / ${DEMO_PRESET.steps.length}` : '8 steps'}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed min-h-[2rem]">
                {activeStepLabel}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStepDemo(isDemoActive ? presetStep - 1 : 0)}
                  disabled={!isDemoActive || presetStep === 0}
                  aria-label="Previous demo step"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <SkipBack className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleToggleDemoPlay}
                  className="flex-1 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 px-3 text-xs font-semibold text-slate-900 hover:bg-slate-100 whitespace-nowrap"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Pause Demo</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{isDemoActive && presetStep < DEMO_PRESET.steps.length ? 'Resume Demo' : 'Play Table 5.1'}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleStepDemo(isDemoActive ? presetStep + 1 : 1)}
                  disabled={isDemoActive && presetStep >= DEMO_PRESET.steps.length}
                  aria-label="Next demo step"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <SkipForward className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Recharts Analytics Dashboard: Occupancy Rate Over Time & Total Vehicles Served */}
        <div
          data-testid="analytics-dashboard"
          className="mt-6 rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Live Parking Analytics
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Updates automatically with every vehicle entry, queue overflow, exit, and demo step.
              </p>
            </div>
            <div className="flex items-center gap-6 text-right">
              <div>
                <p className="text-xs text-slate-500">Occupancy Rate</p>
                <p
                  data-testid="metric-occupancy-rate"
                  className="font-mono text-xl font-semibold text-blue-700 tabular-nums"
                >
                  {occupancyRate}%
                </p>
              </div>
              <div className="border-l border-slate-200 pl-6">
                <p className="text-xs text-slate-500">Total Vehicles Served</p>
                <p
                  data-testid="metric-total-served"
                  className="font-mono text-xl font-semibold text-emerald-700 tabular-nums"
                >
                  {lotState.totalVehiclesServed}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-6 lg:grid-cols-12">
            {/* Occupancy Rate Over Time (Area Chart) */}
            <div className="lg:col-span-7 min-w-0">
              <div className="mb-3 flex items-baseline justify-between">
                <h4 className="font-display text-sm font-semibold text-slate-900">
                  Occupancy Rate Over Time (%)
                </h4>
                <span className="font-mono text-xs text-slate-500 tabular-nums">
                  {lotState.parked.length} / {lotState.capacity} slots occupied
                </span>
              </div>
              <div className="h-52 w-full min-w-0" data-testid="occupancy-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={lotState.history}
                    margin={{ top: 8, right: 12, left: -16, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="occupancyFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.22} />
                        <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 11, fill: '#64748B', fontFamily: 'IBM Plex Mono, monospace' }}
                      axisLine={{ stroke: '#CBD5E1' }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      ticks={[0, 25, 50, 75, 100]}
                      tickFormatter={(v) => `${v}%`}
                      tick={{ fontSize: 11, fill: '#64748B', fontFamily: 'IBM Plex Mono, monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Occupancy Rate']}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#CBD5E1',
                        borderRadius: '0.5rem',
                        fontSize: '12px',
                        fontFamily: 'IBM Plex Mono, monospace',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="occupancyRate"
                      name="Occupancy Rate"
                      stroke="#1D4ED8"
                      strokeWidth={2}
                      fill="url(#occupancyFill)"
                      dot={{ r: 3.5, fill: '#1D4ED8', strokeWidth: 0 }}
                      activeDot={{ r: 5, fill: '#1E40AF' }}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Total Vehicles Served (Bar Chart) */}
            <div className="lg:col-span-5 min-w-0">
              <div className="mb-3 flex items-baseline justify-between">
                <h4 className="font-display text-sm font-semibold text-slate-900">
                  Total Vehicles Served
                </h4>
                <span className="font-mono text-xs text-slate-500 tabular-nums">
                  {lotState.totalVehiclesExited} completed exit{lotState.totalVehiclesExited === 1 ? '' : 's'}
                </span>
              </div>
              <div className="h-52 w-full min-w-0" data-testid="served-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={lotState.history}
                    margin={{ top: 8, right: 12, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 11, fill: '#64748B', fontFamily: 'IBM Plex Mono, monospace' }}
                      axisLine={{ stroke: '#CBD5E1' }}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 11, fill: '#64748B', fontFamily: 'IBM Plex Mono, monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value) => [value, 'Total Vehicles Served']}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#CBD5E1',
                        borderRadius: '0.5rem',
                        fontSize: '12px',
                        fontFamily: 'IBM Plex Mono, monospace',
                      }}
                    />
                    <Bar
                      dataKey="totalServed"
                      name="Total Vehicles Served"
                      fill="#047857"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={32}
                      isAnimationActive={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
