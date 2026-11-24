import { CheckCircle2, Code2, Download, ExternalLink, FileText, Play } from 'lucide-react';
import {
  COMPLEXITY_ROWS,
  FUTURE_SCOPE,
  LIMITATIONS,
  MAIN_C_SOURCE,
  PROJECT_METADATA,
  REFERENCES,
  REPORT_PDF_URL,
  TEST_CASES,
  type TestCaseItem,
} from '../data/reportData';

interface VerificationAndReportSectionProps {
  onRunTestCase: (action: NonNullable<TestCaseItem['demoAction']>) => void;
}

export function VerificationAndReportSection({
  onRunTestCase,
}: VerificationAndReportSectionProps) {
  function handleDownloadCSource() {
    const blob = new Blob([MAIN_C_SOURCE], { type: 'text/x-c;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'main.c';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <section id="report" className="scroll-mt-16 border-t border-slate-200 bg-slate-50 py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-blue-700">03. Testing, Complexity &amp; Report</p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance">
            Test Results, Complexity &amp; Documentation
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            All 9 documented test cases pass without warnings or crashes. Click any <strong>Run</strong> button to test that scenario live in the simulator.
          </p>
        </div>

        {/* Table 6.1 & Table 6.2 */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Table 6.1: Test Cases
              </h3>
              <span className="font-mono text-xs font-semibold text-emerald-700 tabular-nums">
                9 / 9 Passed
              </span>
            </div>
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs font-semibold text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="px-3.5 py-2.5 w-10">#</th>
                    <th className="px-3.5 py-2.5">Test Case</th>
                    <th className="px-3.5 py-2.5">Expected</th>
                    <th className="px-3.5 py-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {TEST_CASES.map((tc) => (
                    <tr key={tc.no}>
                      <td className="px-3.5 py-2.5 font-mono text-xs text-slate-500 tabular-nums">
                        {tc.no}
                      </td>
                      <td className="px-3.5 py-2.5 font-medium text-slate-900">{tc.title}</td>
                      <td className="px-3.5 py-2.5 text-slate-600">{tc.expected}</td>
                      <td className="px-3.5 py-2.5 text-right whitespace-nowrap">
                        {tc.demoAction ? (
                          <button
                            type="button"
                            onClick={() => onRunTestCase(tc.demoAction!)}
                            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                          >
                            <Play className="h-3 w-3" aria-hidden="true" />
                            <span>Run</span>
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-mono text-xs font-medium text-emerald-700">
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Pass</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h3 className="font-display text-lg font-semibold text-slate-900">
              Table 6.2: Complexity Analysis
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              <span className="font-mono text-slate-900">n</span> = parked vehicles, <span className="font-mono text-slate-900">m</span> = waiting vehicles. Total memory: <span className="font-mono font-semibold text-slate-900">O(n + m)</span>.
            </p>
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs font-semibold text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="px-3.5 py-2.5">Function</th>
                    <th className="px-3 py-2.5">Time</th>
                    <th className="px-3 py-2.5">Space</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {COMPLEXITY_ROWS.map((row) => (
                    <tr key={row.fn}>
                      <td className="px-3.5 py-2.5">
                        <div className="font-mono text-xs font-semibold text-slate-900">{row.fn}</div>
                        <div className="mt-0.5 text-xs text-slate-500">{row.reason}</div>
                      </td>
                      <td className="px-3 py-2.5 font-mono text-xs font-semibold text-blue-700 whitespace-nowrap tabular-nums">
                        {row.time}
                      </td>
                      <td className="px-3 py-2.5 font-mono text-xs text-slate-700 whitespace-nowrap tabular-nums">
                        {row.space}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Limitations & Future Scope */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-display text-lg font-semibold text-slate-900">
              Limitations (Section 7.1)
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700 leading-relaxed">
              {LIMITATIONS.map((item, idx) => (
                <li key={idx} className="flex gap-2.5">
                  <span className="font-mono text-xs text-slate-400 tabular-nums pt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-display text-lg font-semibold text-slate-900">
              Future Scope (Section 7.2)
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700 leading-relaxed">
              {FUTURE_SCOPE.map((item, idx) => (
                <li key={idx} className="flex gap-2.5">
                  <span className="font-mono text-xs text-blue-700 tabular-nums pt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* References + Submitted PDF Card */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-display text-base font-semibold text-slate-900">
              References
            </h3>
            <ol className="mt-3 space-y-2 text-xs leading-relaxed text-slate-600">
              {REFERENCES.map((ref) => (
                <li key={ref.id} className="flex gap-2">
                  <span className="font-mono font-semibold text-slate-500 tabular-nums">
                    [{ref.id}]
                  </span>
                  <span>
                    {ref.text}
                    {ref.url && (
                      <>
                        {' '}
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 text-blue-700 hover:underline"
                        >
                          <span>Reference</span>
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Complete Project Report · 16 Pages · PDF + C Source
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-slate-900">
                {PROJECT_METADATA.title}
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Full B.Tech IT-E DSA submission report with cover page, diagrams, sample run, and test results — plus the standalone C11 <code className="font-mono text-slate-900">main.c</code> source file.
              </p>
              <p className="mt-3 font-mono text-[11px] text-slate-500">
                $ {PROJECT_METADATA.compilerCommand}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a
                href={REPORT_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors whitespace-nowrap"
              >
                <FileText className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
                <span>View PDF</span>
              </a>
              <a
                href={REPORT_PDF_URL}
                download="Smart-Parking-Lot-Project-Report.pdf"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors whitespace-nowrap"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Download PDF</span>
              </a>
              <button
                type="button"
                onClick={handleDownloadCSource}
                data-testid="download-main-c"
                className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-semibold text-blue-800 hover:bg-blue-100 transition-colors whitespace-nowrap"
              >
                <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Download main.c</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
