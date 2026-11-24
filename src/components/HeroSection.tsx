import { ArrowDown, FileText } from 'lucide-react';
import { ABSTRACT_TEXT, PROJECT_METADATA, REPORT_PDF_URL } from '../data/reportData';

export function HeroSection() {
  return (
    <section id="top" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <p className="text-xs font-medium text-slate-500">
          <span>{PROJECT_METADATA.institute}</span>
          <span className="mx-2 text-slate-300" aria-hidden="true">·</span>
          <span>{PROJECT_METADATA.department}</span>
          <span className="mx-2 text-slate-300" aria-hidden="true">·</span>
          <span>{PROJECT_METADATA.subject}</span>
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-stretch">
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl text-balance leading-[1.1]">
                {PROJECT_METADATA.title}
              </h1>
              <p className="mt-3 text-lg font-medium text-blue-700">
                {PROJECT_METADATA.subtitle}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
                {ABSTRACT_TEXT}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#simulator"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <span>Open Live Simulator</span>
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={REPORT_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <FileText className="h-4 w-4 text-slate-600" aria-hidden="true" />
                <span>View Report PDF</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between gap-4 border-b border-slate-200 pb-3">
                  <h2 className="font-display text-base font-semibold text-slate-900">
                    Submission Details
                  </h2>
                  <span className="font-mono text-xs text-slate-500 tabular-nums">
                    Session {PROJECT_METADATA.academicSession}
                  </span>
                </div>

                <dl className="mt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between gap-4 border-b border-slate-200/70 pb-2.5">
                    <dt className="text-slate-500">Programme</dt>
                    <dd className="text-right font-medium text-slate-900">
                      {PROJECT_METADATA.programme} ({PROJECT_METADATA.section})
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-slate-200/70 pb-2.5">
                    <dt className="text-slate-500">Submitted to</dt>
                    <dd className="text-right font-medium text-slate-900">
                      {PROJECT_METADATA.submittedTo}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-slate-200/70 pb-2.5">
                    <dt className="text-slate-500">Submission Date</dt>
                    <dd className="text-right font-mono font-medium text-slate-900 tabular-nums">
                      {PROJECT_METADATA.submissionDate}
                    </dd>
                  </div>
                  <div className="pt-1">
                    <dt className="text-xs font-medium text-slate-500 mb-1.5">
                      Team Members &amp; Enrollment Numbers
                    </dt>
                    <dd>
                      <ul className="divide-y divide-slate-200/70">
                        {PROJECT_METADATA.team.map((member) => (
                          <li
                            key={member.enrollment}
                            className="flex items-center justify-between py-1.5 text-sm"
                          >
                            <span className="font-medium text-slate-900">{member.name}</span>
                            <span className="font-mono text-xs text-slate-600 tabular-nums">
                              {member.enrollment}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>

              <p className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500">
                {PROJECT_METADATA.affiliation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
