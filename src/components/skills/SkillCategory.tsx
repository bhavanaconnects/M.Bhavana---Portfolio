import type { Skill, SkillCategory as Category } from '../../data/skills';
import { SkillChip } from './SkillChip';

/** One row of the skills sheet: category name on the left, skills on the right. */
export function SkillCategory({ category, selected, onSelect }: { category: Category; selected: string | null; onSelect: (s: Skill) => void }) {
  return (
    <div className="grid gap-4 px-5 py-6 sm:px-7 md:grid-cols-[220px_1fr] md:gap-8 md:py-7">
      <div className="flex items-baseline justify-between gap-3 md:block">
        <h3 className="text-[17px] font-bold tracking-[-0.015em] text-ink">{category.label}</h3>
        <p className="text-[13.5px] text-slate md:mt-1">
          {category.skills.length} {category.skills.length === 1 ? 'skill' : 'skills'}
        </p>
      </div>
      <ul className="flex flex-wrap gap-2">
        {category.skills.map((s) => (
          <li key={s.name}>
            <SkillChip skill={s} selected={selected === s.name} onSelect={onSelect} />
          </li>
        ))}
      </ul>
    </div>
  );
}
