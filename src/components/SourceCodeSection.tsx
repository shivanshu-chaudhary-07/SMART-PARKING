import { useMemo, useRef, useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import { MAIN_CPP_SOURCE, PROJECT_METADATA } from '../data/reportData';

const CODE_JUMPS = [
  { id: 'class', label: 'ParkingLot Class', range: [11, 38] as [number, number] },
  { id: 'entry', label: 'vehicleEntry()', range: [40, 55] as [number, number] },
  { id: 'exit', label: 'vehicleExit()', range: [57, 73] as [number, number] },
  { id: 'display', label: 'Display & Status', range: [75, 115] as [number, number] },
  { id: 'main', label: 'main() Menu', range: [117, 177] as [number, number] },
];

export function SourceCodeSection() {
  const [activeId, setActiveId] = useState<string>('entry');
  const [copied, setCopied] = useState(false);
  const codeContainerRef = useRef<HTMLDivElement | null>(null);

  const lines = useMemo(() => MAIN_CPP_SOURCE.split('\n'), []);
  const activeJump = CODE_JUMPS.find((j) => j.id === activeId) ?? CODE_JUMPS[1];

  function handleJump(id: string, startLine: number) {
    setActiveId(id);
    const lineEl = codeContainerRef.current?.querySelector(`[data-line="${startLine}"]`);
    if (lineEl instanceof HTMLElement && codeContainerRef.current) {
      const container = codeContainerRef.current;
      const offsetTop = lineEl.offsetTop - container.offsetTop - 28;
      container.scrollTo({ top: Math.max(0, offsetTop), behavior: 'smooth' });
    }
  }

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(MAIN_CPP_SOURCE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function handleDownloadCpp() {
    const blob = new Blob([MAIN_CPP_SOURCE], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'main.cpp';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section id="source-code" className="scroll-mt-16 border-t border-slate-200 bg-slate-50 py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-blue-700">03. Implementation</p>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance">
              C++17 Source Code (main.cpp)
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Compiled cleanly using <code className="font-mono text-xs text-slate-800">{PROJECT_METADATA.compilerCommand}</code>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleDownloadCpp}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download main.cpp</span>
            </button>
          </div>
        </div>

        {/* Compact horizontal jump tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5" role="group" aria-label="Jump to function in main.cpp">
          {CODE_JUMPS.map((jump) => {
            const active = jump.id === activeJump.id;
            return (
              <button
                key={jump.id}
                type="button"
                onClick={() => handleJump(jump.id, jump.range[0])}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-blue-700 text-white'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {jump.label}
              </button>
            );
          })}
        </div>

        {/* Full-width clean code viewer */}
        <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2 text-xs font-mono">
            <span className="text-slate-200 font-medium">main.cpp (177 lines)</span>
            <span className="text-sky-300 tabular-nums">
              Lines {activeJump.range[0]}–{activeJump.range[1]} · {activeJump.label}
            </span>
          </div>
          <div
            ref={codeContainerRef}
            data-testid="cpp-code-viewer"
            className="max-h-[480px] overflow-auto py-3 font-mono text-xs leading-6"
          >
            {lines.map((line, index) => {
              const lineNum = index + 1;
              const isHighlighted =
                lineNum >= activeJump.range[0] && lineNum <= activeJump.range[1];
              return (
                <div
                  key={lineNum}
                  data-line={lineNum}
                  className={`flex px-4 ${
                    isHighlighted ? 'bg-blue-900/35 text-slate-50' : 'text-slate-300'
                  }`}
                >
                  <span className="w-10 shrink-0 select-none pr-4 text-right text-slate-500 tabular-nums">
                    {lineNum}
                  </span>
                  <span className="whitespace-pre">{line || ' '}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
