import educationJson from '../content/education.json';

export interface SchoolRecord {
  level: string;
  school: string;
  year: string;
  score: string;
}

export interface EducationRecord {
  degree: string;
  school: string;
  period: string;
  score: string;
  schooling: SchoolRecord[];
}

export interface Certification {
  title: string;
  issuer: string;
}

/** Content lives in `src/content/education.json`. */
const { certifications: certs, ...edu } = educationJson;

export const education: EducationRecord = edu;
export const certifications: Certification[] = certs;
