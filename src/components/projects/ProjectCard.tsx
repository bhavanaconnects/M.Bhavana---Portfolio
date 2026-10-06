import type { Project } from '../../data/projects';
import { cn } from '../../utils/cn';
import { TechBadge } from '../ui/TechBadge';
import { ProjectActions } from './ProjectActions';
import { ProjectVisual } from './ProjectVisual';

type Layout = 'wide' | 'wide-reverse' | 'regular';

export function ProjectCard({ project, layout = 'regular', onOpen }: { project: Project; layout?: Layout; onOpen: (id: string) => void }) {
  const wide = layout !== 'regular';
  const maxTech = wide ? 8 : 5;
  const shown = project.tech.slice(0, maxTech);
  const extra = project.tech.length - shown.length;

  return (
    <article
      aria-labelledby={`project-${project.id}-title`}
      className={cn(
        'group relative flex h-full overflow-hidden rounded-[22px] border border-line bg-surface shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow-lift)]',
        wide ? 'flex-col md:grid md:grid-cols-2' : 'flex-col',
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden border-line',
          wide ? 'h-[240px] border-b md:h-auto md:min-h-[340px] md:border-b-0' : 'h-[230px] border-b',
          layout === 'wide' && 'md:order-2 md:border-l',
          layout === 'wide-reverse' && 'md:border-r',
        )}
      >
        <div className="h-full w-full transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.02]">
          <ProjectVisual kind={project.visual} compact={!wide} />
        </div>
      </div>

      <div className={cn('flex flex-1 flex-col p-6 sm:p-7', wide && 'md:justify-center md:p-9 lg:p-10')}>
        <p className="text-[13.5px] font-medium text-slate">{project.subtitle}</p>
        <h3 id={`project-${project.id}-title`} className={cn('mt-1.5 font-bold tracking-[-0.025em] text-ink', wide ? 'text-[26px] leading-[1.1] lg:text-[30px]' : 'text-[22px] leading-tight')}>
          <button type="button" onClick={() => onOpen(project.id)} className="text-left transition-colors hover:text-cobalt-deep">
            {project.title}
          </button>
        </h3>
        <p className="mt-3 text-[15.5px] leading-relaxed text-ink/75">{project.summary}</p>
        {project.role && (
          <p className="mt-3 text-[13.5px] text-slate">
            <span className="font-semibold text-ink/80">Role:</span> {project.role}
          </p>
        )}

        <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-1.5">
          {shown.map((t) => (
            <li key={t}>
              <TechBadge name={t} />
            </li>
          ))}
          {extra > 0 && (
            <li>
              <TechBadge name={`+${extra}`} className="text-slate" />
            </li>
          )}
        </ul>

        <div className="mt-auto pt-7">
          <ProjectActions project={project} onDetails={() => onOpen(project.id)} />
        </div>
      </div>
    </article>
  );
}
