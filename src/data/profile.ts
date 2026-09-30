/**
 * Personal details and links.
 * Everything here comes from the uploaded resumes.
 * Leave a URL as "" to hide the button/link that uses it — nothing renders a broken link.
 */
export const profile = {
  name: 'M Bhavana',
  role: 'Full-stack developer',
  location: 'Bengaluru, India',
  stack: ['Python', 'Django', 'FastAPI', 'React', 'JavaScript', 'SQL'],
  intro:
    'I build web applications end to end: the forms people fill in, the APIs and payment logic behind them, and the relational databases they write to. Most recently I shipped a Django application with Razorpay payments for a legal compliance services company.',

  email: 'bhavana.m.connect@gmail.com',
  /** Kept off the page by default. Set `showPhone` to true to display it in Contact. */
  phone: '+91 6300647921',
  showPhone: false,

  linkedin: 'https://www.linkedin.com/in/bhavana-manku',
  /**
   * GitHub profile. The username comes from the CRM repository link in the resume
   * (github.com/bhavanaconnects/CRM). Change or clear it if that is not your profile.
   */
  github: 'https://github.com/bhavanaconnects',

  /** File lives in /public/resume. Replace the PDF there to update the download. Set to "" to hide. */
  resume: '/resume/M_Bhavana_Resume.pdf',
  resumeFileName: 'M_Bhavana_Resume.pdf',
};

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;
