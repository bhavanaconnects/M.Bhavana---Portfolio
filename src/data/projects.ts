import projectsJson from '../content/projects.json';

export type ProjectVisualKind = 'crm' | 'payments' | 'frames' | 'ml' | 'pages' | 'services';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  /** Optional. Shown on the card and in the details modal when set. */
  role?: string;
  /** One or two sentences for the card. */
  summary: string;
  tech: string[];
  /**
   * Links. Paste a URL to show the matching button; leave "" to hide it.
   * No URL here is guessed — only the CRM repository appears in the resumes.
   */
  github: string;
  liveDemo: string;
  featured: boolean;
  visual: ProjectVisualKind;
  /** Optional brand logo shown on the project card and in its details modal. */
  logo?: { src: string; alt: string };
  /** Optional real screenshots: put images in /public/projects and list them here. */
  screenshots?: { src: string; alt: string }[];
  details: {
    overview: string;
    useCase: string;
    built: string[];
    implementation: string[];
    features: string[];
  };
}

/** Content lives in `src/content/projects.json`. */
export const projects = projectsJson as Project[];
