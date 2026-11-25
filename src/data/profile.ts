import profileJson from '../content/profile.json';

/**
 * Personal details and links. The values live in `src/content/profile.json`: edit that file,
 * not this one. Leave a URL as "" to hide the button/link that uses it.
 */
export interface Profile {
  name: string;
  role: string;
  location: string;
  stack: string[];
  intro: string;
  email: string;
  phone: string;
  /** Set to true to display the phone number in Contact. */
  showPhone: boolean;
  linkedin: string;
  github: string;
  /** Path of the resume PDF inside /public. "" hides every resume button. */
  resume: string;
  resumeFileName: string;
}

export const profile: Profile = profileJson;

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;
