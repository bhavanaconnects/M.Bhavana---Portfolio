import { Award, GraduationCap } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { certifications, education } from '../data/education';

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading id="education" title="Education & certifications" />
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-6">
          <Reveal className="h-full">
            <article className="flex h-full flex-col rounded-[20px] border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8">
              <span className="grid size-11 place-items-center rounded-xl bg-cobalt-soft text-cobalt-deep">
                <GraduationCap size={21} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[22px] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[24px]">{education.degree}</h3>
              <p className="mt-2 text-[16px] font-medium text-ink/80">{education.school}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex h-8 items-center rounded-lg bg-ink px-3 text-[13.5px] font-semibold text-white">{education.period}</span>
                <span className="inline-flex h-8 items-center rounded-lg bg-cobalt-soft px-3 text-[13.5px] font-semibold text-cobalt-deep">{education.score}</span>
              </div>
              <dl className="mt-auto grid gap-3 border-t border-line pt-5 sm:grid-cols-2">
                {education.schooling.map((s) => (
                  <div key={s.level} className="mt-4 sm:mt-2">
                    <dt className="text-[14px] font-semibold text-ink">
                      {s.level} · {s.year}
                    </dt>
                    <dd className="mt-0.5 text-[14px] text-slate">
                      {s.school} — {s.score}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>

          <Reveal className="h-full" delay={0.08}>
            <article className="flex h-full flex-col rounded-[20px] border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8">
              <span className="grid size-11 place-items-center rounded-xl bg-ink text-white">
                <Award size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[22px] font-bold tracking-[-0.02em] text-ink sm:text-[24px]">Certifications</h3>
              <ul className="mt-4 divide-y divide-line">
                {certifications.map((c) => (
                  <li key={c.title} className="py-3.5 first:pt-1 last:pb-0">
                    <p className="text-[15.5px] font-semibold leading-snug text-ink">{c.title}</p>
                    <p className="mt-0.5 text-[14px] text-slate">{c.issuer}</p>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
