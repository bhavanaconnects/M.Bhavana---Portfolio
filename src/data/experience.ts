export type ExperienceKind = 'Internship' | 'Training program' | 'Virtual internship';

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyNote?: string;
  location: string;
  /** Shown as-is. Left empty where the resumes give no dates. */
  period: string;
  current?: boolean;
  kind: ExperienceKind;
  points: string[];
  tech: string[];
}

export const experience: Experience[] = [
  {
    id: 'mopuri',
    role: 'Software Development Intern',
    company: 'Mopuri Business Solutions',
    companyNote: 'Mindcreadz Pvt. Ltd. · Legal compliance & software services',
    location: 'Bengaluru, India',
    period: 'Jul 2026 – Sep 2026',
    kind: 'Internship',
    points: [
      'Built a full-stack Django application for a legal compliance services company, with dynamic service-application forms, secure authentication and a profile management dashboard.',
      'Integrated the Razorpay payment gateway end to end: server-side order creation, signature verification and structured error logging.',
      'Migrated data storage from client-side storage to a relational database, improving data integrity and reliability across user profiles.',
      'Debugged front-end issues across dynamically rendered forms and worked with the team in Git under SDLC practices, turning business requirements into working features.',
    ],
    tech: ['Python', 'Django', 'JavaScript', 'SQL', 'Razorpay', 'Git'],
  },
  {
    id: 'kodnest',
    role: 'Trainee, Full-Stack Developer (Python)',
    company: 'KodNest',
    location: 'Bengaluru, India',
    period: 'Jan 2026 – Present',
    current: true,
    kind: 'Training program',
    points: [
      'Building full-stack skills across Python, HTML5, CSS, JavaScript and Java through structured, mentor-guided assignments and mini-projects.',
      'Regular practice in object-oriented programming, debugging and problem solving.',
    ],
    tech: ['Python', 'Java', 'HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'smartbridge',
    role: 'Generative AI Intern',
    company: 'SmartBridge Educational Services (SmartInternz)',
    companyNote: 'Google Cloud Generative AI program with APSCHE · 6 months, 240 hours',
    location: 'Virtual',
    period: 'Completed Mar 2026',
    kind: 'Virtual internship',
    points: [
      'Completed a long-term Generative AI internship built on Google Cloud’s curriculum, in collaboration with the Andhra Pradesh State Council of Higher Education.',
      'Worked on an internship project applying the Generative AI concepts and tools covered in the program.',
    ],
    tech: ['Generative AI', 'Google Cloud'],
  },
  {
    id: 'motioncut',
    role: 'Python Intern',
    company: 'MotionCut',
    location: 'Remote',
    period: '',
    kind: 'Internship',
    points: [
      'Wrote and debugged Python programs, including number-operation utilities and pattern-generation logic, using loops, conditionals and functions.',
      'Wrote reusable, modular functions and used systematic testing to find and fix logic errors.',
    ],
    tech: ['Python'],
  },
];
