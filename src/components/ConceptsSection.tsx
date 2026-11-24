import { useState } from 'react';
import {
  MANUAL_VS_SYSTEM_ROWS,
  OBJECTIVES,
  STACK_VS_QUEUE_ROWS,
} from '../data/reportData';

const STACK_SNIPPET = `#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> s;
    s.push(10);
    s.push(20);
    cout << s.top() << endl;  // prints 20
    s.pop();
    cout << s.top() << endl;  // prints 10
    return 0;
}`;

const QUEUE_SNIPPET = `#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    q.push(10);
    q.push(20);
    cout << q.front() << endl; // prints 10
    q.pop();
    cout << q.front() << endl; // prints 20
    return 0;
}`;

export function ConceptsSection() {
  const [stlTab, setStlTab] = useState<'stack' | 'queue'>('stack');

  return (
    <section id="concepts" className="scroll-mt-16 border-t border-slate-200 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-blue-700">
            02. Problem Context &amp; Data Structure Foundations
          </p>
          <h2 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">
            Why a Stack and a Queue Work Together
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            LIFO and FIFO are structural opposites. In a narrow single-lane lot with one gate, the last vehicle parked blocks the vehicles behind it—requiring a <strong>Stack</strong>. Outside the gate, waiting drivers must be served fairly in arrival order—requiring a <strong>Queue</strong>.
          </p>
        </div>

        {/* Objectives & Modeling Assumption */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className="font-display text-xl font-semibold text-slate-900">
              Project Objectives (Section 1.3)
            </h3>
            <ol className="mt-4 divide-y divide-slate-200 border-t border-b border-slate-200">
              {OBJECTIVES.map((obj, idx) => (
                <li key={idx} className="flex gap-4 py-3.5 text-sm text-slate-700 leading-relaxed">
                  <span className="font-mono text-xs font-semibold text-blue-700 tabular-nums pt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{obj}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-6">
            <div>
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Single-Lane Modeling Assumption
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                We model the parking lot as one narrow lane with a single entry/exit gate. Cars park one behind another, so only the car nearest the gate (the one parked last) can exit at any moment.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                While a multi-lane commercial garage is more complex, this crisp boundary isolates the exact interplay between <code className="font-mono text-slate-900">std::stack</code> and <code className="font-mono text-slate-900">std::queue</code> without database or hardware overhead.
              </p>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500">
              Scope (Section 1.4): In-memory C++17 console application · Entry, exit, capacity check, waiting queue &amp; auto-allocation.
            </div>
          </div>
        </div>

        {/* Technical Diagrams: Figure 2.1 (Stack) & Figure 3.1 (Queue) */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Figure 2.1: Stack LIFO Diagram */}
          <figure className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                The Stack — LIFO Structure
              </h3>
              <span className="font-mono text-xs text-blue-700">O(1) push / pop / top</span>
            </div>
            <p className="mt-1.5 text-sm text-slate-600">
              Insertion and deletion occur solely at the top end. Slot number equals stack position counted from the bottom.
            </p>
            <div className="mt-5 flex justify-center rounded-lg border border-slate-200 bg-white p-4">
              <svg
                viewBox="0 0 380 225"
                className="h-auto w-full max-w-sm"
                role="img"
                aria-label="Figure 2.1: LIFO in a stack of vehicles from Vehicle A at bottom to Vehicle D at top"
              >
                {/* Push arrow */}
                <text x="152" y="18" fontSize="11" fontWeight="600" fill="#1D4ED8" fontFamily="IBM Plex Mono, monospace">PUSH</text>
                <line x1="168" y1="24" x2="168" y2="62" stroke="#1D4ED8" strokeWidth="2" />
                <polygon points="163,58 173,58 168,66" fill="#1D4ED8" />

                {/* Pop arrow */}
                <text x="235" y="18" fontSize="11" fontWeight="600" fill="#0F172A" fontFamily="IBM Plex Mono, monospace">POP</text>
                <line x1="245" y1="62" x2="245" y2="24" stroke="#0F172A" strokeWidth="2" />
                <polygon points="240,28 250,28 245,20" fill="#0F172A" />

                {/* Stack Walls */}
                <path d="M 122 50 L 122 198 L 258 198 L 258 50" fill="none" stroke="#0F172A" strokeWidth="2.5" />

                {/* Vehicles */}
                <rect x="130" y="70" width="120" height="27" rx="4" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="1.5" />
                <text x="190" y="88" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1E3A8A" fontFamily="DM Sans, sans-serif">Vehicle D (last in)</text>

                <rect x="130" y="102" width="120" height="27" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.2" />
                <text x="190" y="120" textAnchor="middle" fontSize="11" fill="#1E293B" fontFamily="DM Sans, sans-serif">Vehicle C</text>

                <rect x="130" y="134" width="120" height="27" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.2" />
                <text x="190" y="152" textAnchor="middle" fontSize="11" fill="#1E293B" fontFamily="DM Sans, sans-serif">Vehicle B</text>

                <rect x="130" y="166" width="120" height="27" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.2" />
                <text x="190" y="184" textAnchor="middle" fontSize="11" fill="#1E293B" fontFamily="DM Sans, sans-serif">Vehicle A (first in)</text>

                {/* Labels */}
                <text x="275" y="86" fontSize="11" fontWeight="700" fill="#1D4ED8" fontFamily="IBM Plex Mono, monospace">← TOP</text>
                <text x="190" y="216" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569" fontFamily="IBM Plex Mono, monospace">BOTTOM</text>
                <text x="20" y="120" fontSize="11" fontWeight="600" fill="#1D4ED8" fontFamily="DM Sans, sans-serif">Last In,</text>
                <text x="20" y="136" fontSize="11" fontWeight="600" fill="#1D4ED8" fontFamily="DM Sans, sans-serif">First Out</text>
                <text x="20" y="152" fontSize="11" fontWeight="600" fill="#1D4ED8" fontFamily="IBM Plex Mono, monospace">(LIFO)</text>
              </svg>
            </div>
            <figcaption className="mt-3 text-xs text-slate-500">
              Figure 2.1 — LIFO in a stack of parked vehicles. Used in practice for undo/redo, browser history, and call stacks.
            </figcaption>
          </figure>

          {/* Figure 3.1: Queue FIFO Diagram */}
          <figure className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                The Queue — FIFO Structure
              </h3>
              <span className="font-mono text-xs text-amber-700">O(1) enqueue / dequeue / front</span>
            </div>
            <p className="mt-1.5 text-sm text-slate-600">
              Vehicles arrive at the rear and depart from the front, guaranteeing fair service order while waiting outside.
            </p>
            <div className="mt-5 flex flex-col justify-center rounded-lg border border-slate-200 bg-white p-4">
              <svg
                viewBox="0 0 420 225"
                className="h-auto w-full"
                role="img"
                aria-label="Figure 3.1: FIFO in a queue of waiting vehicles from Vehicle A at front to Vehicle D at rear"
              >
                {/* Header labels */}
                <text x="72" y="52" fontSize="11" fontWeight="600" fill="#B45309" fontFamily="IBM Plex Mono, monospace">FRONT (leaves first)</text>
                <text x="260" y="52" fontSize="11" fontWeight="600" fill="#0F172A" fontFamily="IBM Plex Mono, monospace">REAR (joins)</text>

                {/* Channel walls */}
                <line x1="70" y1="68" x2="350" y2="68" stroke="#0F172A" strokeWidth="2.5" />
                <line x1="70" y1="138" x2="350" y2="138" stroke="#0F172A" strokeWidth="2.5" />

                {/* Dequeue arrow */}
                <text x="8" y="96" fontSize="10" fontWeight="600" fill="#047857" fontFamily="IBM Plex Mono, monospace">DEQUEUE</text>
                <line x1="62" y1="104" x2="16" y2="104" stroke="#047857" strokeWidth="2" />
                <polygon points="20,99 20,109 11,104" fill="#047857" />

                {/* Enqueue arrow */}
                <text x="360" y="96" fontSize="10" fontWeight="600" fill="#B45309" fontFamily="IBM Plex Mono, monospace">ENQUEUE</text>
                <line x1="408" y1="104" x2="362" y2="104" stroke="#B45309" strokeWidth="2" />
                <polygon points="366,99 366,109 357,104" fill="#B45309" />

                {/* Vehicles */}
                <rect x="78" y="78" width="62" height="50" rx="5" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
                <text x="109" y="107" textAnchor="middle" fontSize="11" fontWeight="600" fill="#78350F" fontFamily="DM Sans, sans-serif">Vehicle A</text>

                <rect x="146" y="78" width="62" height="50" rx="5" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.2" />
                <text x="177" y="107" textAnchor="middle" fontSize="11" fill="#1E293B" fontFamily="DM Sans, sans-serif">Vehicle B</text>

                <rect x="214" y="78" width="62" height="50" rx="5" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.2" />
                <text x="245" y="107" textAnchor="middle" fontSize="11" fill="#1E293B" fontFamily="DM Sans, sans-serif">Vehicle C</text>

                <rect x="282" y="78" width="62" height="50" rx="5" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.2" />
                <text x="313" y="107" textAnchor="middle" fontSize="11" fill="#1E293B" fontFamily="DM Sans, sans-serif">Vehicle D</text>

                {/* Footer caption inside SVG */}
                <text x="210" y="172" textAnchor="middle" fontSize="12" fontWeight="700" fill="#B45309" fontFamily="DM Sans, sans-serif">
                  First In, First Out (FIFO)
                </text>
                <text x="210" y="194" textAnchor="middle" fontSize="11" fill="#64748B" fontFamily="DM Sans, sans-serif">
                  Queue Variants (Fig. 3.2): Simple · Circular · Priority · Deque
                </text>
              </svg>
            </div>
            <figcaption className="mt-3 text-xs text-slate-500">
              Figure 3.1 &amp; 3.2 — Simple FIFO queue used in our project. A Priority Queue can later extend this for ambulances.
            </figcaption>
          </figure>
        </div>

        {/* Comparison Tables: Table 3.1 & Table 4.1 */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-lg font-semibold text-slate-900">
              Table 3.1: Stack Compared with Queue
            </h3>
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs font-semibold text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Point</th>
                    <th className="px-4 py-3">Stack</th>
                    <th className="px-4 py-3">Queue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {STACK_VS_QUEUE_ROWS.map((row) => (
                    <tr key={row.point}>
                      <td className="px-4 py-3 font-medium text-slate-900">{row.point}</td>
                      <td className="px-4 py-3 text-slate-700 font-mono text-xs sm:text-sm">{row.stack}</td>
                      <td className="px-4 py-3 text-slate-700 font-mono text-xs sm:text-sm">{row.queue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-slate-900">
              Table 4.1: Manual Parking vs. Our Program
            </h3>
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs font-semibold text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Point</th>
                    <th className="px-4 py-3">Manual Parking</th>
                    <th className="px-4 py-3">Our Program</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {MANUAL_VS_SYSTEM_ROWS.map((row) => (
                    <tr key={row.point}>
                      <td className="px-4 py-3 font-medium text-slate-900">{row.point}</td>
                      <td className="px-4 py-3 text-slate-500">{row.manual}</td>
                      <td className="px-4 py-3 font-medium text-slate-900">{row.system}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Minimal C++ STL Primer */}
        <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-semibold text-slate-900">
                C++ STL Minimal Reference (Chapters 2 &amp; 3)
              </h3>
              <p className="mt-0.5 text-sm text-slate-600">
                Standard library containers used instead of manual pointer arrays to keep code concise and bug-free.
              </p>
            </div>
            <div className="inline-flex rounded-lg bg-slate-200/80 p-1" role="tablist" aria-label="STL container snippet selector">
              <button
                type="button"
                role="tab"
                aria-selected={stlTab === 'stack'}
                onClick={() => setStlTab('stack')}
                className={`rounded-md px-3.5 py-1.5 font-mono text-xs font-medium transition-colors whitespace-nowrap ${
                  stlTab === 'stack'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                &lt;stack&gt; Example
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={stlTab === 'queue'}
                onClick={() => setStlTab('queue')}
                className={`rounded-md px-3.5 py-1.5 font-mono text-xs font-medium transition-colors whitespace-nowrap ${
                  stlTab === 'queue'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                &lt;queue&gt; Example
              </button>
            </div>
          </div>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-100">
            <code>{stlTab === 'stack' ? STACK_SNIPPET : QUEUE_SNIPPET}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
