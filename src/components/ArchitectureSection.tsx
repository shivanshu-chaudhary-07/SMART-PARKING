import { useState } from 'react';
import {
  ENTRY_ALGORITHM_STEPS,
  EXIT_ALGORITHM_STEPS,
  VARIABLES_TABLE,
} from '../data/reportData';

type ArchModule = 'all' | 'class' | 'stack' | 'queue';

export function ArchitectureSection() {
  const [selectedModule, setSelectedModule] = useState<ArchModule>('all');
  const [flowTab, setFlowTab] = useState<'entry' | 'exit'>('entry');
  const [activeStepId, setActiveStepId] = useState<string>('dup');

  const filteredVars =
    selectedModule === 'all'
      ? VARIABLES_TABLE
      : VARIABLES_TABLE.filter((v) => v.module === selectedModule);

  return (
    <section id="architecture" className="scroll-mt-16 border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-blue-700">
            03. System Design &amp; Control Flow
          </p>
          <h2 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">
            Class Architecture, Flowcharts &amp; Algorithms
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            The attendant interacts through a menu loop in <code className="font-mono text-sm text-slate-900">main()</code>, which invokes encapsulated public methods on a single <code className="font-mono text-sm text-slate-900">ParkingLot</code> class owning both containers.
          </p>
        </div>

        {/* Figure 5.1 System Architecture + Table 4.2 Interactive Filter */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          <figure className="lg:col-span-6 rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Figure 5.1: System Architecture
              </h3>
              <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs" role="group" aria-label="Filter architecture variables">
                {(
                  [
                    { id: 'all', label: 'All' },
                    { id: 'class', label: 'Class' },
                    { id: 'stack', label: 'Stack' },
                    { id: 'queue', label: 'Queue' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedModule(item.id)}
                    className={`rounded-md px-2.5 py-1 font-medium transition-colors whitespace-nowrap ${
                      selectedModule === item.id
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center rounded-lg border border-slate-100 bg-slate-50/70 p-4">
              <svg
                viewBox="0 0 460 320"
                className="h-auto w-full max-w-md"
                role="img"
                aria-label="Figure 5.1 Architecture diagram from User through Menu Interface and ParkingLot class to Stack and Queue and Console Output"
              >
                {/* User box */}
                <rect x="135" y="10" width="190" height="36" rx="6" fill="#F8FAFC" stroke="#334155" strokeWidth="1.5" />
                <text x="230" y="32" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#0F172A" fontFamily="DM Sans, sans-serif">
                  User / Parking Attendant
                </text>
                <line x1="230" y1="46" x2="230" y2="66" stroke="#334155" strokeWidth="1.6" />
                <polygon points="225,62 235,62 230,70" fill="#334155" />

                {/* Menu Interface box */}
                <rect x="135" y="70" width="190" height="36" rx="6" fill="#F1F5F9" stroke="#334155" strokeWidth="1.5" />
                <text x="230" y="92" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#0F172A" fontFamily="DM Sans, sans-serif">
                  Menu Interface (main)
                </text>
                <line x1="230" y1="106" x2="230" y2="126" stroke="#334155" strokeWidth="1.6" />
                <polygon points="225,122 235,122 230,130" fill="#334155" />

                {/* ParkingLot Class box */}
                <rect
                  x="112"
                  y="130"
                  width="236"
                  height="46"
                  rx="6"
                  fill={selectedModule === 'class' ? '#DBEAFE' : '#EFF6FF'}
                  stroke="#1D4ED8"
                  strokeWidth={selectedModule === 'class' ? '2.5' : '1.6'}
                />
                <text x="230" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1E3A8A" fontFamily="DM Sans, sans-serif">
                  ParkingLot Class
                </text>
                <text x="230" y="166" textAnchor="middle" fontSize="10.5" fill="#1E40AF" fontFamily="IBM Plex Mono, monospace">
                  (capacity, entry, exit, display)
                </text>

                {/* Branches to Stack & Queue */}
                <line x1="172" y1="176" x2="112" y2="205" stroke="#334155" strokeWidth="1.5" />
                <polygon points="108,200 116,207 105,209" fill="#334155" />
                <line x1="288" y1="176" x2="348" y2="205" stroke="#334155" strokeWidth="1.5" />
                <polygon points="344,207 352,200 355,209" fill="#334155" />

                {/* Stack Box */}
                <rect
                  x="16"
                  y="209"
                  width="172"
                  height="52"
                  rx="6"
                  fill={selectedModule === 'stack' ? '#DBEAFE' : '#EFF6FF'}
                  stroke="#1D4ED8"
                  strokeWidth={selectedModule === 'stack' ? '2.5' : '1.6'}
                />
                <text x="102" y="227" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1E3A8A" fontFamily="IBM Plex Mono, monospace">
                  stack&lt;string&gt; parked
                </text>
                <text x="102" y="242" textAnchor="middle" fontSize="10.5" fill="#334155" fontFamily="DM Sans, sans-serif">
                  Parked vehicles (LIFO)
                </text>

                {/* Queue Box */}
                <rect
                  x="272"
                  y="209"
                  width="172"
                  height="52"
                  rx="6"
                  fill={selectedModule === 'queue' ? '#FEF3C7' : '#FFFBEB'}
                  stroke="#B45309"
                  strokeWidth={selectedModule === 'queue' ? '2.5' : '1.6'}
                />
                <text x="358" y="227" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400E" fontFamily="IBM Plex Mono, monospace">
                  queue&lt;string&gt; waiting
                </text>
                <text x="358" y="242" textAnchor="middle" fontSize="10.5" fill="#334155" fontFamily="DM Sans, sans-serif">
                  Waiting vehicles (FIFO)
                </text>

                {/* Slot freed transfer arrow */}
                <line x1="270" y1="235" x2="194" y2="235" stroke="#047857" strokeWidth="2" />
                <polygon points="198,230 198,240 189,235" fill="#047857" />
                <text x="230" y="228" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#047857" fontFamily="IBM Plex Mono, monospace">
                  slot freed
                </text>

                {/* Branches to Console Output */}
                <line x1="112" y1="261" x2="176" y2="282" stroke="#334155" strokeWidth="1.5" />
                <line x1="348" y1="261" x2="284" y2="282" stroke="#334155" strokeWidth="1.5" />

                {/* Console Output Box */}
                <rect x="115" y="282" width="230" height="32" rx="6" fill="#0F172A" />
                <text x="230" y="302" textAnchor="middle" fontSize="11" fontWeight="500" fill="#F8FAFC" fontFamily="IBM Plex Mono, monospace">
                  Console Output (messages &amp; lists)
                </text>
              </svg>
            </div>
            <figcaption className="mt-3 text-xs text-slate-500">
              Use the filter buttons above to inspect how each architectural layer maps to Table 4.2 members.
            </figcaption>
          </figure>

          {/* Table 4.2: Data Structures and Variables */}
          <div className="lg:col-span-6">
            <h3 className="font-display text-lg font-semibold text-slate-900">
              Table 4.2: Main Variables Used in the Code
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Keeping capacity, parked stack, and waiting queue private inside <code className="font-mono text-slate-900">class ParkingLot</code> prevents accidental state corruption.
            </p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs font-semibold text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Item</th>
                    <th className="px-4 py-3">C++ Type</th>
                    <th className="px-4 py-3">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredVars.map((row) => (
                    <tr key={row.item}>
                      <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">
                        {row.item}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-blue-800 whitespace-nowrap">
                        {row.type}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-slate-500 leading-relaxed">
              Hardware &amp; Software (Section 4.2): Runs on any standard computer with 2 GB RAM or more. Compiled using <code className="font-mono text-slate-800">g++ (C++17)</code> on Windows 10/11, Linux, or macOS with zero warnings.
            </p>
          </div>
        </div>

        {/* Interactive Flowcharts (Figures 5.2 & 5.3) + Section 5.6 Algorithm */}
        <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <h3 className="font-display text-xl font-semibold text-slate-900">
                Interactive Flowcharts &amp; Step-by-Step Algorithms
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Select any algorithm step on the right to highlight its corresponding decision or action node in the flowchart.
              </p>
            </div>

            <div className="inline-flex rounded-lg bg-slate-100 p-1" role="tablist" aria-label="Flowchart selector">
              <button
                type="button"
                role="tab"
                aria-selected={flowTab === 'entry'}
                onClick={() => {
                  setFlowTab('entry');
                  setActiveStepId('dup');
                }}
                className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                  flowTab === 'entry'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Fig. 5.2: Vehicle Entry
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={flowTab === 'exit'}
                onClick={() => {
                  setFlowTab('exit');
                  setActiveStepId('transfer');
                }}
                className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                  flowTab === 'exit'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Fig. 5.3: Vehicle Exit
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Flowchart SVG */}
            <div className="lg:col-span-7 flex justify-center rounded-lg border border-slate-100 bg-slate-50 p-4">
              {flowTab === 'entry' ? (
                <svg
                  viewBox="0 0 460 390"
                  className="h-auto w-full max-w-lg"
                  role="img"
                  aria-label="Figure 5.2 Flowchart of vehicle entry showing duplicate check, capacity check, push to stack, and enqueue to waiting queue"
                >
                  {/* START */}
                  <rect x="130" y="8" width="170" height="30" rx="15" fill="#DCFCE7" stroke="#15803D" strokeWidth="1.5" />
                  <text x="215" y="27" textAnchor="middle" fontSize="11" fontWeight="600" fill="#14532D" fontFamily="DM Sans, sans-serif">START (Vehicle Arrives)</text>
                  <line x1="215" y1="38" x2="215" y2="54" stroke="#334155" strokeWidth="1.5" />

                  {/* Read vehicle number */}
                  <rect
                    x="130"
                    y="54"
                    width="170"
                    height="30"
                    rx="4"
                    fill={activeStepId === 'start' ? '#DBEAFE' : '#EFF6FF'}
                    stroke={activeStepId === 'start' ? '#1D4ED8' : '#3B82F6'}
                    strokeWidth={activeStepId === 'start' ? '2.5' : '1.4'}
                  />
                  <text x="215" y="73" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A" fontFamily="DM Sans, sans-serif">1. Read vehicle number</text>
                  <line x1="215" y1="84" x2="215" y2="100" stroke="#334155" strokeWidth="1.5" />

                  {/* Decision 1: Already in system? */}
                  <polygon
                    points="215,100 305,130 215,160 125,130"
                    fill={activeStepId === 'dup' ? '#FEF3C7' : '#FFFBEB'}
                    stroke={activeStepId === 'dup' ? '#B45309' : '#D97706'}
                    strokeWidth={activeStepId === 'dup' ? '2.5' : '1.4'}
                  />
                  <text x="215" y="127" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#78350F" fontFamily="DM Sans, sans-serif">Already in</text>
                  <text x="215" y="140" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#78350F" fontFamily="DM Sans, sans-serif">the system?</text>

                  {/* Yes branch -> Already present */}
                  <line x1="305" y1="130" x2="342" y2="130" stroke="#334155" strokeWidth="1.5" />
                  <text x="322" y="124" textAnchor="middle" fontSize="9.5" fill="#B91C1C" fontWeight="600">Yes</text>
                  <rect
                    x="342"
                    y="112"
                    width="108"
                    height="36"
                    rx="4"
                    fill={activeStepId === 'dup' ? '#FEE2E2' : '#FEF2F2'}
                    stroke="#DC2626"
                    strokeWidth={activeStepId === 'dup' ? '2.2' : '1.3'}
                  />
                  <text x="396" y="128" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991B1B" fontFamily="DM Sans, sans-serif">Show &apos;already</text>
                  <text x="396" y="140" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991B1B" fontFamily="DM Sans, sans-serif">present&apos;</text>
                  <path d="M 396 148 L 396 368 L 280 368" fill="none" stroke="#94A3B8" strokeWidth="1.4" strokeDasharray="4 3" />

                  {/* No branch -> Parking full? */}
                  <line x1="215" y1="160" x2="215" y2="180" stroke="#334155" strokeWidth="1.5" />
                  <text x="228" y="174" fontSize="9.5" fill="#334155" fontWeight="600">No</text>

                  <polygon
                    points="215,180 305,210 215,240 125,210"
                    fill={activeStepId === 'full' ? '#FEF3C7' : '#FFFBEB'}
                    stroke={activeStepId === 'full' ? '#B45309' : '#D97706'}
                    strokeWidth={activeStepId === 'full' ? '2.5' : '1.4'}
                  />
                  <text x="215" y="207" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#78350F" fontFamily="DM Sans, sans-serif">Parking full?</text>
                  <text x="215" y="220" textAnchor="middle" fontSize="9.5" fill="#78350F" fontFamily="IBM Plex Mono, monospace">(parked = cap)</text>

                  {/* Left: No -> PUSH onto Stack */}
                  <path d="M 125 210 L 95 210 L 95 256" fill="none" stroke="#1D4ED8" strokeWidth="1.6" />
                  <text x="108" y="204" fontSize="9.5" fill="#1D4ED8" fontWeight="600">No</text>
                  <rect
                    x="18"
                    y="256"
                    width="154"
                    height="46"
                    rx="5"
                    fill={activeStepId === 'push' ? '#DBEAFE' : '#EFF6FF'}
                    stroke="#1D4ED8"
                    strokeWidth={activeStepId === 'push' ? '2.5' : '1.4'}
                  />
                  <text x="95" y="276" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#1E3A8A" fontFamily="DM Sans, sans-serif">4. PUSH onto Stack</text>
                  <text x="95" y="291" textAnchor="middle" fontSize="10" fill="#1E40AF" fontFamily="DM Sans, sans-serif">Show slot number</text>
                  <path d="M 95 302 L 95 368 L 150 368" fill="none" stroke="#334155" strokeWidth="1.5" />

                  {/* Right: Yes -> ENQUEUE into Queue */}
                  <path d="M 305 210 L 315 210 L 315 256" fill="none" stroke="#B45309" strokeWidth="1.6" />
                  <text x="310" y="204" fontSize="9.5" fill="#B45309" fontWeight="600">Yes</text>
                  <rect
                    x="230"
                    y="256"
                    width="154"
                    height="46"
                    rx="5"
                    fill={activeStepId === 'enqueue' ? '#FEF3C7' : '#FFFBEB'}
                    stroke="#B45309"
                    strokeWidth={activeStepId === 'enqueue' ? '2.5' : '1.4'}
                  />
                  <text x="307" y="276" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#78350F" fontFamily="DM Sans, sans-serif">5. ENQUEUE into Queue</text>
                  <text x="307" y="291" textAnchor="middle" fontSize="10" fill="#92400E" fontFamily="DM Sans, sans-serif">Show queue position</text>
                  <path d="M 307 302 L 307 338 L 215 338 L 215 352" fill="none" stroke="#334155" strokeWidth="1.5" />

                  {/* END */}
                  <rect x="150" y="352" width="130" height="30" rx="15" fill="#DCFCE7" stroke="#15803D" strokeWidth="1.5" />
                  <text x="215" y="371" textAnchor="middle" fontSize="11" fontWeight="600" fill="#14532D" fontFamily="DM Sans, sans-serif">END</text>
                </svg>
              ) : (
                <svg
                  viewBox="0 0 460 390"
                  className="h-auto w-full max-w-lg"
                  role="img"
                  aria-label="Figure 5.3 Flowchart of vehicle exit showing empty stack guard, stack pop, waiting queue check, and automatic allocation"
                >
                  {/* START */}
                  <rect x="130" y="10" width="170" height="30" rx="15" fill="#DCFCE7" stroke="#15803D" strokeWidth="1.5" />
                  <text x="215" y="29" textAnchor="middle" fontSize="11" fontWeight="600" fill="#14532D" fontFamily="DM Sans, sans-serif">START (Vehicle Exits)</text>
                  <line x1="215" y1="40" x2="215" y2="58" stroke="#334155" strokeWidth="1.5" />

                  {/* Decision 1: Is Stack empty? */}
                  <polygon
                    points="215,58 302,88 215,118 128,88"
                    fill={activeStepId === 'empty' ? '#FEF3C7' : '#FFFBEB'}
                    stroke={activeStepId === 'empty' ? '#B45309' : '#D97706'}
                    strokeWidth={activeStepId === 'empty' ? '2.5' : '1.4'}
                  />
                  <text x="215" y="92" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#78350F" fontFamily="DM Sans, sans-serif">1. Is Stack empty?</text>

                  {/* Yes -> Lot is empty */}
                  <line x1="302" y1="88" x2="338" y2="88" stroke="#334155" strokeWidth="1.5" />
                  <text x="319" y="82" textAnchor="middle" fontSize="9.5" fill="#B91C1C" fontWeight="600">Yes</text>
                  <rect
                    x="338"
                    y="70"
                    width="112"
                    height="36"
                    rx="4"
                    fill={activeStepId === 'empty' ? '#FEE2E2' : '#FEF2F2'}
                    stroke="#DC2626"
                    strokeWidth={activeStepId === 'empty' ? '2.2' : '1.3'}
                  />
                  <text x="394" y="86" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991B1B" fontFamily="DM Sans, sans-serif">Show &apos;lot is</text>
                  <text x="394" y="98" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991B1B" fontFamily="DM Sans, sans-serif">empty&apos; message</text>
                  <path d="M 394 106 L 394 366 L 280 366" fill="none" stroke="#94A3B8" strokeWidth="1.4" strokeDasharray="4 3" />

                  {/* No -> POP top vehicle */}
                  <line x1="215" y1="118" x2="215" y2="140" stroke="#334155" strokeWidth="1.5" />
                  <text x="228" y="133" fontSize="9.5" fill="#334155" fontWeight="600">No</text>

                  <rect
                    x="110"
                    y="140"
                    width="210"
                    height="38"
                    rx="5"
                    fill={activeStepId === 'pop' ? '#DBEAFE' : '#EFF6FF'}
                    stroke="#1D4ED8"
                    strokeWidth={activeStepId === 'pop' ? '2.5' : '1.4'}
                  />
                  <text x="215" y="163" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1E3A8A" fontFamily="DM Sans, sans-serif">2. POP top vehicle from Stack</text>
                  <line x1="215" y1="178" x2="215" y2="198" stroke="#334155" strokeWidth="1.5" />

                  {/* Decision 2: Is Queue empty? */}
                  <polygon
                    points="215,198 302,228 215,258 128,228"
                    fill={activeStepId === 'qempty' ? '#FEF3C7' : '#FFFBEB'}
                    stroke={activeStepId === 'qempty' ? '#B45309' : '#D97706'}
                    strokeWidth={activeStepId === 'qempty' ? '2.5' : '1.4'}
                  />
                  <text x="215" y="232" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#78350F" fontFamily="DM Sans, sans-serif">3. Is Queue empty?</text>

                  {/* Left: Yes -> Leave slot free */}
                  <path d="M 128 228 L 92 228 L 92 276" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <text x="108" y="222" fontSize="9.5" fill="#334155" fontWeight="600">Yes</text>
                  <rect
                    x="24"
                    y="276"
                    width="136"
                    height="42"
                    rx="5"
                    fill={activeStepId === 'qempty' ? '#E2E8F0' : '#F8FAFC'}
                    stroke="#475569"
                    strokeWidth={activeStepId === 'qempty' ? '2.2' : '1.4'}
                  />
                  <text x="92" y="301" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A" fontFamily="DM Sans, sans-serif">Leave slot free</text>
                  <path d="M 92 318 L 92 366 L 150 366" fill="none" stroke="#334155" strokeWidth="1.5" />

                  {/* Right: No -> DEQUEUE front & PUSH */}
                  <path d="M 302 228 L 315 228 L 315 276" fill="none" stroke="#047857" strokeWidth="1.6" />
                  <text x="312" y="222" fontSize="9.5" fill="#047857" fontWeight="600">No</text>
                  <rect
                    x="220"
                    y="276"
                    width="164"
                    height="50"
                    rx="5"
                    fill={activeStepId === 'transfer' ? '#D1FAE5' : '#ECFDF5'}
                    stroke="#047857"
                    strokeWidth={activeStepId === 'transfer' ? '2.5' : '1.4'}
                  />
                  <text x="302" y="297" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#065F46" fontFamily="DM Sans, sans-serif">4. DEQUEUE front vehicle</text>
                  <text x="302" y="313" textAnchor="middle" fontSize="10" fill="#047857" fontFamily="DM Sans, sans-serif">&amp; PUSH onto Stack</text>
                  <path d="M 302 326 L 302 342 L 215 342 L 215 352" fill="none" stroke="#334155" strokeWidth="1.5" />

                  {/* END */}
                  <rect x="150" y="352" width="130" height="30" rx="15" fill="#DCFCE7" stroke="#15803D" strokeWidth="1.5" />
                  <text x="215" y="371" textAnchor="middle" fontSize="11" fontWeight="600" fill="#14532D" fontFamily="DM Sans, sans-serif">END</text>
                </svg>
              )}
            </div>

            {/* Section 5.6 Algorithm Step Buttons */}
            <div className="lg:col-span-5 space-y-2.5">
              <p className="text-xs font-medium text-slate-500">
                Section 5.6 Algorithm · {flowTab === 'entry' ? 'Vehicle Entry' : 'Vehicle Exit'}
              </p>
              {(flowTab === 'entry' ? ENTRY_ALGORITHM_STEPS : EXIT_ALGORITHM_STEPS).map((item) => {
                const isSelected = activeStepId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveStepId(item.id)}
                    className={`w-full rounded-lg border p-3.5 text-left transition-colors ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs font-semibold text-blue-700 tabular-nums">
                        {item.step}.
                      </span>
                      <span className="text-sm font-semibold text-slate-900">{item.title}</span>
                    </div>
                    <p className="mt-1 pl-5 text-xs leading-relaxed text-slate-600">
                      {item.detail}
                    </p>
                  </button>
                );
              })}
              <p className="pt-2 text-xs text-slate-500 leading-relaxed">
                Note: Displaying lists always operates on a temporary copy of the Stack or Queue so inspecting elements never mutates the live data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
