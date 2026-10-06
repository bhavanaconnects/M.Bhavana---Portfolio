/**
 * Skills grouped by category. `usedIn` points to project / experience ids so the
 * Skills section can show where each one was actually used. No proficiency levels.
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

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React' },
      { name: 'HTML5', usedIn: ['breakdown', 'melty', 'crm', 'newstart'] },
      { name: 'CSS3', usedIn: ['breakdown', 'melty', 'newstart'] },
      { name: 'Tailwind CSS', usedIn: ['crm'] },
      { name: 'Responsive web design', usedIn: ['breakdown', 'melty', 'newstart'] },
      { name: 'GSAP & ScrollTrigger', usedIn: ['breakdown'] },
      { name: 'Canvas API', usedIn: ['breakdown'] },
      { name: 'Vite', usedIn: ['crm'] },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    skills: [
      { name: 'Django', usedIn: ['mopuri'] },
      { name: 'FastAPI', usedIn: ['crm'] },
      { name: 'REST APIs', usedIn: ['crm', 'mopuri'] },
      { name: 'JWT authentication', usedIn: ['crm'] },
      { name: 'Swagger / OpenAPI', usedIn: ['crm'] },
      { name: 'Razorpay integration', usedIn: ['mopuri'] },
      { name: 'Error logging', usedIn: ['mopuri'] },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    skills: [
      { name: 'Python', usedIn: ['crm', 'mopuri', 'health', 'motioncut'] },
      { name: 'JavaScript (ES6+)', usedIn: ['crm', 'mopuri', 'breakdown', 'melty', 'newstart'] },
      { name: 'SQL', usedIn: ['mopuri', 'crm'] },
      { name: 'Java (foundational)', usedIn: ['kodnest'] },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    skills: [
      { name: 'PostgreSQL', usedIn: ['crm'] },
      { name: 'SQLite', usedIn: ['mopuri'] },
      { name: 'SQLAlchemy', usedIn: ['crm'] },
      { name: 'Relational database design', usedIn: ['mopuri', 'crm'] },
      { name: 'DBMS' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Data',
    skills: [
      { name: 'Scikit-learn', usedIn: ['health'] },
      { name: 'Preprocessing & EDA', usedIn: ['health'] },
      { name: 'Generative AI (Google Cloud)', usedIn: ['smartbridge'] },
      { name: 'Statistical analysis' },
      { name: 'Power BI' },
      { name: 'Excel' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    skills: [
      { name: 'Git', usedIn: ['mopuri'] },
      { name: 'GitHub', usedIn: ['crm'] },
      { name: 'VS Code' },
      { name: 'Docker Compose', usedIn: ['crm'] },
    ],
  },
  {
    id: 'practices',
    label: 'Engineering practices',
    skills: [
      { name: 'OOP', usedIn: ['kodnest'] },
      { name: 'Debugging & testing', usedIn: ['mopuri', 'motioncut'] },
      { name: 'SDLC', usedIn: ['mopuri'] },
      { name: 'Agile collaboration' },
      { name: 'Layered architecture', usedIn: ['crm'] },
    ],
  },
];
