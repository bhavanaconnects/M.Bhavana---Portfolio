import skillsJson from '../content/skills.json';

/**
 * Skills grouped by category. `usedIn` points to project / experience ids so the
 * Skills section can show where each one was actually used. No proficiency levels.
 * Content lives in `src/content/skills.json`.
 */
export interface Skill {
  name: string;
  usedIn?: string[];
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export const skillCategories = skillsJson as SkillCategory[];
