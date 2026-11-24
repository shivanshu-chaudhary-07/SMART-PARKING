import { useMemo, useRef, useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import {
  CODE_EXPLANATIONS,
  MAIN_CPP_SOURCE,
  PROJECT_METADATA,
} from '../data/reportData';

export function SourceCodeSection() {
  const [activeSectionId, setActiveSectionId] = useState<string>('entry');
  const [copied, setCopied] = useState(false);
  const codeContainerRef = useRef<HTMLDivElement | null>(null);

  const lines = useMemo(() => MAIN_CPP_SOURCE.split('\n'), []);
  const activeSection =
    CODE_EXPLANATIONS.find((s) => s.id === activeSectionId) ?? CODE_EXPLANATIONS[0];

  function handleSelectSection(id: string, startLine: number) {
    setActiveSectionId(id);
    const lineEl = codeContainerRef.current?.querySelector(`[data-line="${startLine}"]`);
    if (lineEl instanceof HTMLElement && codeContainerRef.current) {
      const container = codeContainerRef.current;
      const offsetTop = lineEl.offsetTop - container.offsetTop - 32;
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
    <section id="source-code" className="scroll-mt-16 border-t border-slate-200 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-xs font-medium text-blue-700">
              04. Complete C++17 Implementation (Chapter 6)
            </p>
            <h2 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">
              Source Code &amp; Line-by-Line Walkthrough
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              The complete 177-line <code className="font-mono text-sm text-slate-900">main.cpp</code> program compiled cleanly with <code className="font-mono text-xs text-slate-800">{PROJECT_METADATA.compilerCommand}</code>. Select any section on the left to highlight its exact lines.
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
                  <span>Copied main.cpp</span>
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

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-start">
          {/* Interactive Section 6.2 Explanation Rail */}
          <div className="lg:col-span-4 space-y-2">
            <p className="text-xs font-medium text-slate-500 mb-2">
              Section 6.2 Code Walkthrough
            </p>
            {CODE_EXPLANATIONS.map((sec) => {
              const active = sec.id === activeSection.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleSelectSection(sec.id, sec.lineRange[0])}
                  className={`w-full rounded-lg border p-3.5 text-left transition-colors ${
                    active
                      ? 'border-blue-600 bg-blue-50/70'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-900">{sec.title}</span>
                    <span className="font-mono text-[11px] text-blue-700 tabular-nums whitespace-nowrap shrink-0">
                      L{sec.lineRange[0]}–{sec.lineRange[1]}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {sec.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Code Viewer */}
          <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5 text-xs font-mono">
              <span className="text-slate-200 font-medium">main.cpp</span>
              <span className="text-sky-300 tabular-nums">
                Highlighting lines {activeSection.lineRange[0]}–{activeSection.lineRange[1]} ({activeSection.title})
              </span>
            </div>
            <div
              ref={codeContainerRef}
              data-testid="cpp-code-viewer"
              className="max-h-[600px] overflow-auto py-3 font-mono text-xs leading-6"
            >
              {lines.map((line, index) => {
                const lineNum = index + 1;
                const isHighlighted =
                  lineNum >= activeSection.lineRange[0] &&
                  lineNum <= activeSection.lineRange[1];
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
      </div>
    </section>
  );
}
