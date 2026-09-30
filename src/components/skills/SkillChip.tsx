import { cn } from '../../utils/cn';
import type { Skill } from '../../data/skills';

export function SkillChip({ skill, selected, onSelect }: { skill: Skill; selected: boolean; onSelect: (s: Skill) => void }) {
  const hasEvidence = Boolean(skill.usedIn?.length);
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(skill)}
      className={cn(
        'group inline-flex h-10 items-center gap-2 rounded-[10px] border px-3.5 text-[14.5px] font-medium transition-[background-color,border-color,color,transform,box-shadow] duration-200',
        selected
          ? 'border-ink bg-ink text-white shadow-[0_8px_18px_-10px_rgb(19_23_34/0.6)]'
          : 'border-line bg-surface text-ink hover:-translate-y-0.5 hover:border-ink/35 hover:shadow-[var(--shadow-card)]',
      )}
    >
      {skill.name}
      {hasEvidence && (
        <span
          aria-hidden="true"
          className={cn('size-1.5 rounded-full transition-colors', selected ? 'bg-signal' : 'bg-cobalt/70 group-hover:bg-cobalt')}
        />
      )}
      {hasEvidence && <span className="sr-only">(used in a project or role)</span>}
    </button>
  );
}
