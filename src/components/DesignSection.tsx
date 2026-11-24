import { useState } from 'react';
import {
  ENTRY_ALGORITHM_STEPS,
  EXIT_ALGORITHM_STEPS,
  STACK_VS_QUEUE_ROWS,
} from '../data/reportData';

export function DesignSection() {
  const [flowTab, setFlowTab] = useState<'entry' | 'exit'>('entry');
  const [activeStepId, setActiveStepId] = useState<string>('dup');

  return (
    <section id="design" className="scroll-mt-16 border-t border-slate-200 bg-white py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-blue-700">02. Data Structures &amp; System Design</p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance">
            How Stack (LIFO) &amp; Queue (FIFO) Work Together
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            The parking lot is modeled as a narrow single-lane lot with one gate: the last car parked blocks the rest (<strong>Stack</strong>), while waiting cars outside are served fairly in arrival order (<strong>Queue</strong>).
          </p>
        </div>

        {/* Diagrams: Figure 2.1 (Stack) & Figure 3.1 (Queue) */}
        <div className="grid gap-6 lg:grid-cols-2">
          <figure className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-slate-900">
                Figure 2.1: Stack (LIFO) — Parked Vehicles
              </h3>
              <span className="font-mono text-xs text-blue-700">O(1) push / pop</span>
            </div>
            <div className="mt-4 flex justify-center rounded-lg border border-slate-200 bg-white p-4">
              <svg
                viewBox="0 0 380 215"
                className="h-auto w-full max-w-sm"
                role="img"
                aria-label="Figure 2.1: LIFO in a stack of vehicles from Vehicle A at bottom to Vehicle D at top"
              >
                <text x="152" y="16" fontSize="11" fontWeight="600" fill="#1D4ED8" fontFamily="IBM Plex Mono, monospace">PUSH</text>
                <line x1="168" y1="22" x2="168" y2="58" stroke="#1D4ED8" strokeWidth="2" />
                <polygon points="163,54 173,54 168,62" fill="#1D4ED8" />

                <text x="235" y="16" fontSize="11" fontWeight="600" fill="#0F172A" fontFamily="IBM Plex Mono, monospace">POP</text>
                <line x1="245" y1="58" x2="245" y2="22" stroke="#0F172A" strokeWidth="2" />
                <polygon points="240,26 250,26 245,18" fill="#0F172A" />

                <path d="M 122 46 L 122 192 L 258 192 L 258 46" fill="none" stroke="#0F172A" strokeWidth="2.5" />

                <rect x="130" y="66" width="120" height="26" rx="4" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="1.5" />
                <text x="190" y="83" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1E3A8A" fontFamily="DM Sans, sans-serif">Vehicle D (last in)</text>

                <rect x="130" y="97" width="120" height="26" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.2" />
                <text x="190" y="114" textAnchor="middle" fontSize="11" fill="#1E293B" fontFamily="DM Sans, sans-serif">Vehicle C</text>

                <rect x="130" y="128" width="120" height="26" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.2" />
                <text x="190" y="145" textAnchor="middle" fontSize="11" fill="#1E293B" fontFamily="DM Sans, sans-serif">Vehicle B</text>

                <rect x="130" y="159" width="120" height="26" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.2" />
                <text x="190" y="176" textAnchor="middle" fontSize="11" fill="#1E293B" fontFamily="DM Sans, sans-serif">Vehicle A (first in)</text>

                <text x="274" y="82" fontSize="11" fontWeight="700" fill="#1D4ED8" fontFamily="IBM Plex Mono, monospace">← TOP</text>
                <text x="190" y="209" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569" fontFamily="IBM Plex Mono, monospace">BOTTOM</text>
                <text x="20" y="118" fontSize="11" fontWeight="600" fill="#1D4ED8" fontFamily="DM Sans, sans-serif">Last In,</text>
                <text x="20" y="134" fontSize="11" fontWeight="600" fill="#1D4ED8" fontFamily="DM Sans, sans-serif">First Out</text>
                <text x="20" y="150" fontSize="11" fontWeight="600" fill="#1D4ED8" fontFamily="IBM Plex Mono, monospace">(LIFO)</text>
              </svg>
            </div>
          </figure>

          <figure className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-slate-900">
                Figure 3.1: Queue (FIFO) — Waiting Vehicles
              </h3>
              <span className="font-mono text-xs text-amber-700">O(1) enqueue / dequeue</span>
            </div>
            <div className="mt-4 flex justify-center rounded-lg border border-slate-200 bg-white p-4">
              <svg
                viewBox="0 0 420 215"
                className="h-auto w-full"
                role="img"
                aria-label="Figure 3.1: FIFO in a queue of waiting vehicles from Vehicle A at front to Vehicle D at rear"
              >
                <text x="72" y="54" fontSize="11" fontWeight="600" fill="#B45309" fontFamily="IBM Plex Mono, monospace">FRONT (leaves first)</text>
                <text x="260" y="54" fontSize="11" fontWeight="600" fill="#0F172A" fontFamily="IBM Plex Mono, monospace">REAR (joins)</text>

                <line x1="70" y1="68" x2="350" y2="68" stroke="#0F172A" strokeWidth="2.5" />
                <line x1="70" y1="138" x2="350" y2="138" stroke="#0F172A" strokeWidth="2.5" />

                <text x="8" y="96" fontSize="10" fontWeight="600" fill="#047857" fontFamily="IBM Plex Mono, monospace">DEQUEUE</text>
                <line x1="62" y1="104" x2="16" y2="104" stroke="#047857" strokeWidth="2" />
                <polygon points="20,99 20,109 11,104" fill="#047857" />

                <text x="360" y="96" fontSize="10" fontWeight="600" fill="#B45309" fontFamily="IBM Plex Mono, monospace">ENQUEUE</text>
                <line x1="408" y1="104" x2="362" y2="104" stroke="#B45309" strokeWidth="2" />
                <polygon points="366,99 366,109 357,104" fill="#B45309" />

                <rect x="78" y="78" width="62" height="50" rx="5" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
                <text x="109" y="107" textAnchor="middle" fontSize="11" fontWeight="600" fill="#78350F" fontFamily="DM Sans, sans-serif">Vehicle A</text>

                <rect x="146" y="78" width="62" height="50" rx="5" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.2" />
                <text x="177" y="107" textAnchor="middle" fontSize="11" fill="#1E293B" fontFamily="DM Sans, sans-serif">Vehicle B</text>

                <rect x="214" y="78" width="62" height="50" rx="5" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.2" />
                <text x="245" y="107" textAnchor="middle" fontSize="11" fill="#1E293B" fontFamily="DM Sans, sans-serif">Vehicle C</text>

                <rect x="282" y="78" width="62" height="50" rx="5" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.2" />
                <text x="313" y="107" textAnchor="middle" fontSize="11" fill="#1E293B" fontFamily="DM Sans, sans-serif">Vehicle D</text>

                <text x="210" y="176" textAnchor="middle" fontSize="12" fontWeight="700" fill="#B45309" fontFamily="DM Sans, sans-serif">
                  First In, First Out (FIFO)
                </text>
              </svg>
            </div>
          </figure>
        </div>

        {/* Table 3.1 Stack vs Queue */}
        <div>
          <h3 className="font-display text-lg font-semibold text-slate-900">
            Table 3.1: Stack vs. Queue Comparison
          </h3>
          <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-xs font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Property</th>
                  <th className="px-4 py-3">Stack</th>
                  <th className="px-4 py-3">Queue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {STACK_VS_QUEUE_ROWS.map((row) => (
                  <tr key={row.point}>
                    <td className="px-4 py-2.5 font-medium text-slate-900">{row.point}</td>
                    <td className="px-4 py-2.5 font-mono text-xs sm:text-sm text-slate-700">{row.stack}</td>
                    <td className="px-4 py-2.5 font-mono text-xs sm:text-sm text-slate-700">{row.queue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Flowcharts (Figures 5.2 & 5.3) + Algorithm */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Flowcharts &amp; Algorithm (Chapter 5)
              </h3>
              <p className="mt-0.5 text-xs text-slate-600">
                Click any algorithm step to highlight the matching block in the flowchart.
              </p>
            </div>

            <div className="inline-flex rounded-lg bg-slate-200/70 p-1" role="tablist" aria-label="Flowchart selector">
              <button
                type="button"
                role="tab"
                aria-selected={flowTab === 'entry'}
                onClick={() => {
                  setFlowTab('entry');
                  setActiveStepId('dup');
                }}
                className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
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
                className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                  flowTab === 'exit'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Fig. 5.3: Vehicle Exit
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 flex justify-center rounded-lg border border-slate-200 bg-white p-4">
              {flowTab === 'entry' ? (
                <svg
                  viewBox="0 0 460 440"
                  className="h-auto w-full max-w-md"
                  role="img"
                  aria-label="Figure 5.2 Flowchart of vehicle entry"
                >
                  <rect x="130" y="6" width="170" height="28" rx="14" fill="#DCFCE7" stroke="#15803D" strokeWidth="1.5" />
                  <text x="215" y="24" textAnchor="middle" fontSize="11" fontWeight="600" fill="#14532D" fontFamily="DM Sans, sans-serif">START: Vehicle arrives</text>
                  <line x1="215" y1="34" x2="215" y2="48" stroke="#334155" strokeWidth="1.5" />

                  <rect
                    x="130"
                    y="48"
                    width="170"
                    height="28"
                    rx="4"
                    fill={activeStepId === 'start' ? '#DBEAFE' : '#EFF6FF'}
                    stroke={activeStepId === 'start' ? '#1D4ED8' : '#3B82F6'}
                    strokeWidth={activeStepId === 'start' ? '2.5' : '1.4'}
                  />
                  <text x="215" y="66" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A" fontFamily="DM Sans, sans-serif">1. Read vehicle number</text>
                  <line x1="215" y1="76" x2="215" y2="90" stroke="#334155" strokeWidth="1.5" />

                  <polygon
                    points="215,90 300,118 215,146 130,118"
                    fill={activeStepId === 'dup' ? '#FEF3C7' : '#FFFBEB'}
                    stroke={activeStepId === 'dup' ? '#B45309' : '#D97706'}
                    strokeWidth={activeStepId === 'dup' ? '2.5' : '1.4'}
                  />
                  <text x="215" y="115" textAnchor="middle" fontSize="10" fontWeight="600" fill="#78350F" fontFamily="DM Sans, sans-serif">Vehicle already</text>
                  <text x="215" y="128" textAnchor="middle" fontSize="10" fontWeight="600" fill="#78350F" fontFamily="DM Sans, sans-serif">in system?</text>

                  <line x1="300" y1="118" x2="338" y2="118" stroke="#334155" strokeWidth="1.5" />
                  <text x="319" y="112" textAnchor="middle" fontSize="9.5" fill="#B91C1C" fontWeight="600">Yes</text>
                  <rect
                    x="338"
                    y="100"
                    width="112"
                    height="36"
                    rx="4"
                    fill={activeStepId === 'dup' ? '#FEE2E2' : '#FEF2F2'}
                    stroke="#DC2626"
                    strokeWidth={activeStepId === 'dup' ? '2.2' : '1.3'}
                  />
                  <text x="394" y="116" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991B1B" fontFamily="DM Sans, sans-serif">Reject duplicate</text>
                  <text x="394" y="128" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991B1B" fontFamily="DM Sans, sans-serif">vehicle</text>
                  <path d="M 394 136 L 394 416 L 280 416" fill="none" stroke="#94A3B8" strokeWidth="1.4" strokeDasharray="4 3" />

                  <line x1="215" y1="146" x2="215" y2="164" stroke="#334155" strokeWidth="1.5" />
                  <text x="228" y="159" fontSize="9.5" fill="#334155" fontWeight="600">No</text>

                  <polygon
                    points="215,164 295,192 215,220 135,192"
                    fill={activeStepId === 'full' ? '#FEF3C7' : '#FFFBEB'}
                    stroke={activeStepId === 'full' ? '#B45309' : '#D97706'}
                    strokeWidth={activeStepId === 'full' ? '2.5' : '1.4'}
                  />
                  <text x="215" y="189" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#78350F" fontFamily="DM Sans, sans-serif">Parking</text>
                  <text x="215" y="202" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#78350F" fontFamily="DM Sans, sans-serif">full?</text>

                  <line x1="135" y1="192" x2="112" y2="192" stroke="#1D4ED8" strokeWidth="1.6" />
                  <text x="123" y="186" textAnchor="middle" fontSize="9.5" fill="#1D4ED8" fontWeight="600">No</text>
                  <rect
                    x="6"
                    y="170"
                    width="106"
                    height="44"
                    rx="5"
                    fill={activeStepId === 'full' ? '#DBEAFE' : '#EFF6FF'}
                    stroke="#1D4ED8"
                    strokeWidth={activeStepId === 'full' ? '2.5' : '1.4'}
                  />
                  <text x="59" y="189" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1E3A8A" fontFamily="DM Sans, sans-serif">Push onto stack</text>
                  <text x="59" y="203" textAnchor="middle" fontSize="9.5" fill="#1E40AF" fontFamily="DM Sans, sans-serif">Show slot number</text>
                  <path d="M 59 214 L 59 416 L 150 416" fill="none" stroke="#334155" strokeWidth="1.5" />

                  <line x1="215" y1="220" x2="215" y2="242" stroke="#B45309" strokeWidth="1.6" />
                  <text x="229" y="235" fontSize="9.5" fill="#B45309" fontWeight="600">Yes</text>

                  <polygon
                    points="215,242 300,270 215,298 130,270"
                    fill={activeStepId === 'qfull' ? '#FEF3C7' : '#FFFBEB'}
                    stroke={activeStepId === 'qfull' ? '#B45309' : '#D97706'}
                    strokeWidth={activeStepId === 'qfull' ? '2.5' : '1.4'}
                  />
                  <text x="215" y="267" textAnchor="middle" fontSize="10" fontWeight="600" fill="#78350F" fontFamily="DM Sans, sans-serif">Waiting queue</text>
                  <text x="215" y="280" textAnchor="middle" fontSize="10" fontWeight="600" fill="#78350F" fontFamily="DM Sans, sans-serif">full?</text>

                  <line x1="300" y1="270" x2="338" y2="270" stroke="#334155" strokeWidth="1.5" />
                  <text x="319" y="264" textAnchor="middle" fontSize="9.5" fill="#B91C1C" fontWeight="600">Yes</text>
                  <rect
                    x="338"
                    y="252"
                    width="112"
                    height="36"
                    rx="4"
                    fill={activeStepId === 'qfull' ? '#FEE2E2' : '#FEF2F2'}
                    stroke="#DC2626"
                    strokeWidth={activeStepId === 'qfull' ? '2.2' : '1.3'}
                  />
                  <text x="394" y="268" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991B1B" fontFamily="DM Sans, sans-serif">Reject entry:</text>
                  <text x="394" y="280" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991B1B" fontFamily="DM Sans, sans-serif">queue full</text>
                  <line x1="394" y1="288" x2="394" y2="416" stroke="#94A3B8" strokeWidth="1.4" strokeDasharray="4 3" />

                  <line x1="215" y1="298" x2="215" y2="322" stroke="#334155" strokeWidth="1.5" />
                  <text x="228" y="314" fontSize="9.5" fill="#334155" fontWeight="600">No</text>

                  <rect
                    x="130"
                    y="322"
                    width="170"
                    height="46"
                    rx="5"
                    fill={activeStepId === 'enqueue' ? '#FEF3C7' : '#FFFBEB'}
                    stroke="#B45309"
                    strokeWidth={activeStepId === 'enqueue' ? '2.5' : '1.4'}
                  />
                  <text x="215" y="342" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#78350F" fontFamily="DM Sans, sans-serif">5. Enqueue vehicle</text>
                  <text x="215" y="357" textAnchor="middle" fontSize="10" fill="#92400E" fontFamily="DM Sans, sans-serif">Show queue position</text>
                  <line x1="215" y1="368" x2="215" y2="400" stroke="#334155" strokeWidth="1.5" />

                  <rect x="150" y="400" width="130" height="30" rx="15" fill="#DCFCE7" stroke="#15803D" strokeWidth="1.5" />
                  <text x="215" y="419" textAnchor="middle" fontSize="11" fontWeight="600" fill="#14532D" fontFamily="DM Sans, sans-serif">END</text>
                </svg>
              ) : (
                <svg
                  viewBox="0 0 460 390"
                  className="h-auto w-full max-w-md"
                  role="img"
                  aria-label="Figure 5.3 Flowchart of vehicle exit"
                >
                  <rect x="130" y="10" width="170" height="30" rx="15" fill="#DCFCE7" stroke="#15803D" strokeWidth="1.5" />
                  <text x="215" y="29" textAnchor="middle" fontSize="11" fontWeight="600" fill="#14532D" fontFamily="DM Sans, sans-serif">START (Vehicle Exits)</text>
                  <line x1="215" y1="40" x2="215" y2="58" stroke="#334155" strokeWidth="1.5" />

                  <polygon
                    points="215,58 302,88 215,118 128,88"
                    fill={activeStepId === 'empty' ? '#FEF3C7' : '#FFFBEB'}
                    stroke={activeStepId === 'empty' ? '#B45309' : '#D97706'}
                    strokeWidth={activeStepId === 'empty' ? '2.5' : '1.4'}
                  />
                  <text x="215" y="92" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#78350F" fontFamily="DM Sans, sans-serif">1. Is Stack empty?</text>

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

                  <polygon
                    points="215,198 302,228 215,258 128,228"
                    fill={activeStepId === 'qempty' ? '#FEF3C7' : '#FFFBEB'}
                    stroke={activeStepId === 'qempty' ? '#B45309' : '#D97706'}
                    strokeWidth={activeStepId === 'qempty' ? '2.5' : '1.4'}
                  />
                  <text x="215" y="232" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#78350F" fontFamily="DM Sans, sans-serif">3. Is Queue empty?</text>

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

                  <rect x="150" y="352" width="130" height="30" rx="15" fill="#DCFCE7" stroke="#15803D" strokeWidth="1.5" />
                  <text x="215" y="371" textAnchor="middle" fontSize="11" fontWeight="600" fill="#14532D" fontFamily="DM Sans, sans-serif">END</text>
                </svg>
              )}
            </div>

            <div className="lg:col-span-5 space-y-2">
              {(flowTab === 'entry' ? ENTRY_ALGORITHM_STEPS : EXIT_ALGORITHM_STEPS).map((item) => {
                const isSelected = activeStepId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveStepId(item.id)}
                    className={`w-full rounded-lg border p-3 text-left transition-colors ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-baseline gap-2">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
