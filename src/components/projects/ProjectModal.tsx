import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { Project } from '../../data/projects';
import { useLockBody } from '../../hooks/useLockBody';
import { TechBadge } from '../ui/TechBadge';
import { ProjectActions } from './ProjectActions';
import { ProjectVisual } from './ProjectVisual';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  useLockBody(Boolean(project));

  useEffect(() => {
    if (!project) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => closeRef.current?.focus(), 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const nodes = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((n) => n.offsetParent !== null);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      returnFocus.current?.focus?.({ preventScroll: true });
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-ink/45 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[92dvh] w-full max-w-[860px] flex-col overflow-hidden rounded-t-[24px] bg-surface shadow-2xl sm:max-h-[88vh] sm:rounded-[24px]"
          >
            <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-8 sm:py-5">
              <div className="min-w-0">
                <p className="text-[13.5px] font-medium text-slate">{project.subtitle}</p>
                <h2 id="project-modal-title" className="mt-0.5 text-[24px] font-bold leading-tight tracking-[-0.025em] text-ink sm:text-[28px]">
                  {project.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-line text-ink transition-colors hover:bg-ink/[0.05]"
              >
                <X size={19} aria-hidden="true" />
              </button>
            </header>

            <div className="overflow-y-auto overscroll-contain px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-5 sm:px-8 sm:pb-8 sm:pt-6">
              <figure className="overflow-hidden rounded-[16px] border border-line">
                <div className="h-[220px] sm:h-[260px]">
                  <ProjectVisual kind={project.visual} />
                </div>
              </figure>
              <p className="mt-2 text-[12.5px] text-slate">Illustration of the project’s structure, not a screenshot.</p>

              {project.screenshots?.length ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {project.screenshots.map((s) => (
                    <img key={s.src} src={s.src} alt={s.alt} loading="lazy" className="w-full rounded-xl border border-line" />
                  ))}
                </div>
              ) : null}

              {(project.github || project.liveDemo) && (
                <div className="mt-6">
                  <ProjectActions project={project} size="md" />
                </div>
              )}

              {project.role && (
                <p className="mt-6 text-[14.5px] text-ink/75">
                  <span className="font-bold text-ink">Role:</span> {project.role}
                </p>
              )}

              <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1fr] md:gap-10">
                <DetailBlock title="Overview">
                  <p>{project.details.overview}</p>
                </DetailBlock>
                <DetailBlock title="Problem & use case">
                  <p>{project.details.useCase}</p>
                </DetailBlock>
                <DetailBlock title="What I built">
                  <BulletList items={project.details.built} />
                </DetailBlock>
                <DetailBlock title="Technical implementation">
                  <BulletList items={project.details.implementation} />
                </DetailBlock>
              </div>

              <div className="mt-8 border-t border-line pt-6">
                <h3 className="text-[15px] font-bold text-ink">Key features</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.details.features.map((f) => (
                    <li key={f} className="inline-flex h-8 items-center rounded-lg border border-line px-3 text-[13.5px] font-medium text-ink/80">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="text-[15px] font-bold text-ink">Technologies</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <li key={t}>
                      <TechBadge name={t} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-[15px] font-bold text-ink">{title}</h3>
      <div className="mt-2.5 text-[15.5px] leading-relaxed text-ink/75">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="relative pl-4">
          <span aria-hidden="true" className="absolute left-0 top-[11px] size-1.5 rounded-full bg-cobalt" />
          {i}
        </li>
      ))}
    </ul>
  );
}
