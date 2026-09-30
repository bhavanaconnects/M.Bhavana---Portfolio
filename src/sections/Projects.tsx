import { ProjectActions } from '../components/projects/ProjectActions';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectVisual } from '../components/projects/ProjectVisual';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { TechBadge } from '../components/ui/TechBadge';
import { projects } from '../data/projects';

const byId = (id: string) => projects.find((p) => p.id === id)!;

export function Projects({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const more = projects.filter((p) => !p.featured);

  return (
    <section id="projects" aria-labelledby="projects-title" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading
          id="projects"
          title="Selected projects"
          lead="Backend-heavy applications, a scroll-driven frontend and an applied ML tool. Open any project for the full breakdown."
        />

        <div className="grid gap-5 lg:gap-6">
          <Reveal>
            <ProjectCard project={byId('crm')} layout="wide" onOpen={onOpenProject} />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
            <Reveal className="h-full">
              <ProjectCard project={byId('mopuri')} onOpen={onOpenProject} />
            </Reveal>
            <Reveal className="h-full" delay={0.08}>
              <ProjectCard project={byId('health')} onOpen={onOpenProject} />
            </Reveal>
          </div>
          <Reveal>
            <ProjectCard project={byId('breakdown')} layout="wide-reverse" onOpen={onOpenProject} />
          </Reveal>
        </div>

        {more.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <h3 className="text-[22px] font-bold tracking-[-0.02em] text-ink">More projects</h3>
            </Reveal>
            <ul className="mt-5 grid gap-4">
              {more.map((p) => (
                <li key={p.id}>
                  <Reveal>
                    <article className="grid overflow-hidden rounded-[18px] border border-line bg-surface shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-[var(--shadow-lift)] sm:grid-cols-[220px_1fr]">
                      <div className="h-[150px] border-b border-line sm:h-auto sm:border-b-0 sm:border-r">
                        <ProjectVisual kind={p.visual} compact />
                      </div>
                      <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                        <div className="min-w-0">
                          <h4 className="text-[19px] font-bold tracking-[-0.02em] text-ink">{p.title}</h4>
                          <p className="mt-1.5 max-w-[60ch] text-[15px] leading-relaxed text-ink/75">{p.summary}</p>
                          <ul aria-label="Technologies" className="mt-3 flex flex-wrap gap-1.5">
                            {p.tech.map((t) => (
                              <li key={t}>
                                <TechBadge name={t} />
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="shrink-0">
                          <ProjectActions project={p} onDetails={() => onOpenProject(p.id)} />
                        </div>
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
