import experienceJson from '../content/experience.json';

export type ExperienceKind = 'Internship' | 'Training program' | 'Virtual internship';

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyNote?: string;
  location: string;
  /** Shown as-is. Leave "" to show "Dates not listed". */
  period: string;
  current?: boolean;
  kind: ExperienceKind;
  points: string[];
  tech: string[];
}

/** Content lives in `src/content/experience.json`. */
export const experience = experienceJson as Experience[];
