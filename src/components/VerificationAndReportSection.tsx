import { CheckCircle2, Download, ExternalLink, FileText, Play } from 'lucide-react';
import {
  COMPLEXITY_ROWS,
  FUTURE_SCOPE,
  LIMITATIONS,
  PROJECT_METADATA,
  REAL_WORLD_USES,
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
  return (
    <section id="report" className="scroll-mt-16 border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-blue-700">
            05. Testing, Complexity &amp; Report Archive
          </p>
          <h2 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">
            Verification Results, Big-O Analysis &amp; Future Scope
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Every documented test case from Chapter 6 passed without warnings or crashes. Click any live test button below to execute that exact case directly in the interactive simulator above.
          </p>
        </div>

        {/* Table 6.1 Test Cases + Table 6.2 Complexity */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Table 6.1 */}
          <div className="lg:col-span-7">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-xl font-semibold text-slate-900">
                Table 6.1: Test Cases &amp; Results
              </h3>
              <span className="font-mono text-xs font-semibold text-emerald-700 tabular-nums">
                9 / 9 Passed
              </span>
            </div>
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs font-semibold text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 w-12">No.</th>
                    <th className="px-4 py-3">Test Case</th>
                    <th className="px-4 py-3">Expected Result</th>
                    <th className="px-4 py-3 text-right">Verify</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {TEST_CASES.map((tc) => (
                    <tr key={tc.no}>
                      <td className="px-4 py-3 font-mono text-xs text-slate-500 tabular-nums">
                        {tc.no}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900">{tc.title}</td>
                      <td className="px-4 py-3 text-slate-600">{tc.expected}</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
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

          {/* Table 6.2 Complexity */}
          <div className="lg:col-span-5">
            <h3 className="font-display text-xl font-semibold text-slate-900">
              Table 6.2: Time &amp; Space Complexity
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Let <span className="font-mono text-slate-900">n</span> be parked vehicles and <span className="font-mono text-slate-900">m</span> be waiting vehicles. Total memory is <span className="font-mono font-semibold text-slate-900">O(n + m)</span>.
            </p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs font-semibold text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Function</th>
                    <th className="px-3 py-3">Time</th>
                    <th className="px-3 py-3">Space</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {COMPLEXITY_ROWS.map((row) => (
                    <tr key={row.fn}>
                      <td className="px-4 py-3">
                        <div className="font-mono text-xs font-semibold text-slate-900">{row.fn}</div>
                        <div className="mt-0.5 text-xs text-slate-500">{row.reason}</div>
                      </td>
                      <td className="px-3 py-3 font-mono text-xs font-semibold text-blue-700 whitespace-nowrap tabular-nums">
                        {row.time}
                      </td>
                      <td className="px-3 py-3 font-mono text-xs text-slate-700 whitespace-nowrap tabular-nums">
                        {row.space}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Chapter 7: Limitations & Future Scope */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-display text-xl font-semibold text-slate-900">
              7.1 Current Limitations
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700 leading-relaxed">
              {LIMITATIONS.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="font-mono text-xs text-slate-400 tabular-nums pt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-display text-xl font-semibold text-slate-900">
              7.2 Future Scope &amp; Enhancements
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700 leading-relaxed">
              {FUTURE_SCOPE.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="font-mono text-xs text-blue-700 tabular-nums pt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Real-World Applications, Conclusion & References */}
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="font-display text-xl font-semibold text-slate-900">
                7.3 Real-World Applicability
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Any bounded-capacity system paired with a fair waiting line follows the exact same architectural pattern:
              </p>
              <p className="mt-3 text-sm font-medium text-slate-800 leading-relaxed">
                {REAL_WORLD_USES.join(' · ')}
              </p>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h3 className="font-display text-xl font-semibold text-slate-900">
                7.4 Conclusion
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                In this project we built a Smart Parking Lot Management System using a Stack (LIFO) for parked vehicles and a Queue (FIFO) for waiting vehicles. Together they cover the complete lifecycle of a vehicle: arrival, parking or queueing, exit, and automatic slot reallocation. Compiled cleanly without warnings and verified across full, empty, duplicate, and invalid input cases, the system demonstrates how foundational linear data structures solve real urban bottlenecks.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-display text-lg font-semibold text-slate-900">
              Academic References
            </h3>
            <ol className="mt-4 space-y-2.5 text-xs leading-relaxed text-slate-600">
              {REFERENCES.map((ref) => (
                <li key={ref.id} className="flex gap-2.5">
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
                          <span>cppreference.com</span>
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Original Submitted PDF Document Archive Banner */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Original Submitted Document · 16 Pages · PDF
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
              {PROJECT_METADATA.title} — Complete B.Tech Report
            </h3>
            <p className="mt-1.5 text-sm text-slate-600">
              Includes cover page, MSIT departmental header, figures 2.1–5.3, complete C++17 listing, sample console transcript, and evaluation tables.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={REPORT_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors whitespace-nowrap"
            >
              <FileText className="h-4 w-4 text-slate-600" aria-hidden="true" />
              <span>View PDF in Browser</span>
            </a>
            <a
              href={REPORT_PDF_URL}
              download="Smart-Parking-Lot-Project-Report.pdf"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
