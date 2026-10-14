import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, MousePointerClick } from 'lucide-react';
import { useMemo, useState } from 'react';
import { SkillCategory } from '../components/skills/SkillCategory';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/Reveal';
import { skillCategories, type Skill } from '../data/skills';
import { resolveUsage } from '../utils/lookup';
import { cn } from '../utils/cn';

export function Skills({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const [filter, setFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Skill | null>(null);

  const visible = useMemo(() => (filter === 'all' ? skillCategories : skillCategories.filter((c) => c.id === filter)), [filter]);
  const usage = (selected?.usedIn ?? []).map((id) => ({ id, ...resolveUsage(id)! })).filter((u) => u.label);

  const onSelect = (s: Skill) => setSelected((cur) => (cur?.name === s.name ? null : s));

  const goTo = (u: { id: string; kind: string; target: string }) => {
    if (u.kind === 'project') onOpenProject(u.id);
    else document.getElementById(`exp-${u.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="skills" aria-labelledby="skills-title" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading
          id="skills"
          title="Tools I build with"
          lead="Grouped by where they sit in the stack. Select a skill to see the project or role where I used it."
        />

        <Reveal>
          <div role="group" aria-label="Filter skills by category" className="console-scroll -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {[{ id: 'all', label: 'All' }, ...skillCategories].map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={filter === c.id}
                onClick={() => setFilter(c.id)}
                className={cn(
                  'relative h-10 shrink-0 rounded-full px-4 text-[14.5px] font-semibold transition-colors',
                  filter === c.id ? 'text-white' : 'text-slate hover:bg-ink/[0.05] hover:text-ink',
                )}
              >
                {filter === c.id && <motion.span layoutId="skill-filter" className="absolute inset-0 rounded-full bg-cobalt" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className="relative">{c.label}</span>
              </button>
            ))}
          </div>

          {/* Evidence bar */}
          <div className="mt-5 min-h-[64px] rounded-[14px] border border-dashed border-line-strong bg-surface/60 px-4 py-3 sm:px-5" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              {selected ? (
                <motion.div
                  key={selected.name}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3"
                >
                  <p className="text-[15px] text-slate">
                    <span className="font-bold text-ink">{selected.name}</span>
                    {usage.length ? ' — used in' : ' — listed on my resume; not tied to a project on this page yet.'}
                  </p>
                  {usage.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
                      {usage.map((u) => (
                        <li key={u.id}>
                          <button
                            type="button"
                            onClick={() => goTo(u)}
                            className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-cobalt-soft px-3 text-[13.5px] font-semibold text-cobalt-deep transition-colors hover:bg-cobalt hover:text-white"
                          >
                            {u.label}
                            <span className="text-[12px] font-medium opacity-70">{u.kind === 'project' ? 'project' : 'role'}</span>
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[38px] items-center gap-2.5 text-[15px] text-slate"
                >
                  <MousePointerClick size={17} aria-hidden="true" className="shrink-0 text-cobalt" />
                  <span>
                    Skills marked with <span aria-hidden="true" className="mx-0.5 inline-block size-1.5 translate-y-[-2px] rounded-full bg-cobalt" />
                    <span className="sr-only">a dot</span> link to a project or role on this page.
                  </span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 divide-y divide-line overflow-hidden rounded-[20px] border border-line bg-surface shadow-[var(--shadow-card)]"
          >
            {visible.map((c) => (
              <SkillCategory key={c.id} category={c} selected={selected?.name ?? null} onSelect={onSelect} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
