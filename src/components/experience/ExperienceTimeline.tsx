import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { MapPin } from 'lucide-react';
import { useRef } from 'react';
import type { Experience } from '../../data/experience';
import { cn } from '../../utils/cn';
import { Reveal } from '../ui/Reveal';
import { TechBadge } from '../ui/TechBadge';

export function ExperienceTimeline({ items }: { items: Experience[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <ol ref={ref} className="relative">
      {/* rail */}
      <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-line-strong md:left-[207px]" />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-cobalt md:left-[207px]"
        style={{ scaleY: reduce ? 1 : progress }}
      />

      {items.map((e, i) => (
        <li key={e.id} id={`exp-${e.id}`} className={cn('relative grid scroll-mt-28 md:grid-cols-[200px_1fr] md:gap-10', i < items.length - 1 && 'pb-8 md:pb-10')}>
          {/* date column (desktop) */}
          <div className="hidden pr-9 pt-6 text-right md:block">
            {e.period ? (
              <p className="text-[14.5px] font-semibold leading-snug text-ink">{e.period}</p>
            ) : (
              <p className="text-[14.5px] font-medium text-slate">Dates not listed</p>
            )}
            <p className="mt-1 text-[13.5px] text-slate">{e.kind}</p>
          </div>

          {/* node */}
          <span
            aria-hidden="true"
            className={cn(
              'absolute left-0 top-7 grid size-[15px] place-items-center rounded-full border-2 bg-paper md:left-[200px]',
              e.current ? 'border-cobalt' : 'border-ink/60',
            )}
          >
            {e.current && <span className="size-[5px] rounded-full bg-cobalt" />}
          </span>

          <Reveal className="pl-8 md:pl-0">
            <article className="rounded-[18px] border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-[var(--shadow-lift)] sm:p-7">
              <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h3 className="text-[20px] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[22px]">{e.role}</h3>
                  <p className="mt-1.5 text-[16px] font-semibold text-cobalt-deep">{e.company}</p>
                  {e.companyNote && <p className="mt-0.5 text-[14px] text-slate">{e.companyNote}</p>}
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                  {e.current && (
                    <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-cobalt-soft px-2.5 text-[12.5px] font-semibold text-cobalt-deep">
                      <span className="size-1.5 rounded-full bg-cobalt" aria-hidden="true" />
                      Ongoing
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-[13.5px] text-slate">
                    <MapPin size={14} aria-hidden="true" />
                    {e.location}
                  </span>
                </div>
              </header>

              {/* dates (mobile) */}
              <p className="mt-3 text-[14px] font-medium text-ink/80 md:hidden">
                {e.period || 'Dates not listed'} <span className="text-slate">· {e.kind}</span>
              </p>

              <ul className="mt-5 space-y-2.5">
                {e.points.map((p) => (
                  <li key={p} className="relative pl-5 text-[15.5px] leading-relaxed text-ink/80">
                    <span aria-hidden="true" className="absolute left-0 top-[11px] h-px w-2.5 bg-cobalt" />
                    {p}
                  </li>
                ))}
              </ul>

              <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-1.5">
                {e.tech.map((t) => (
                  <li key={t}>
                    <TechBadge name={t} />
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
