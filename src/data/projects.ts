export type ProjectVisualKind = 'crm' | 'payments' | 'frames' | 'ml' | 'pages';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
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

export const projects: Project[] = [
  {
    id: 'crm',
    title: 'CRM Management System',
    subtitle: 'Full-stack customer relationship management app',
    summary:
      'A CRM for leads, contacts, companies, deals and tasks, built on a FastAPI and PostgreSQL backend with JWT-protected REST APIs and a layered architecture.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'JavaScript', 'Tailwind CSS', 'Vite', 'Docker Compose'],
    github: 'https://github.com/bhavanaconnects/CRM',
    liveDemo: '',
    featured: true,
    visual: 'crm',
    details: {
      overview:
        'A full-stack CRM with a FastAPI backend, SQLAlchemy and PostgreSQL, and an HTML, Tailwind CSS and vanilla JavaScript frontend.',
      useCase:
        'Sales work spreads across leads, contacts, companies, deals and follow-ups. The CRM keeps them in one place, with a dashboard, search and a My Work view for day-to-day tasks.',
      built: [
        'Modules for leads, contacts, companies, deals, pipelines, tasks and activities.',
        'A dashboard, search, notifications, reminders, a calendar and a My Work view.',
        'RESTful APIs for CRUD operations and database-driven workflows.',
      ],
      implementation: [
        'FastAPI with SQLAlchemy and PostgreSQL for the API and data layer.',
        'JWT-based authentication with protected endpoints.',
        'Backend organised into routers, services, repositories and schemas for a maintainable layered architecture.',
        'API documented with Swagger/OpenAPI, with CORS configured for frontend–backend communication.',
        'Docker Compose setup, a Vite-based frontend workflow, and PostgreSQL initialisation with health checks.',
      ],
      features: ['Leads', 'Contacts', 'Companies', 'Deals', 'Pipelines', 'Tasks', 'Activities', 'Dashboard', 'Search', 'Notifications', 'Reminders', 'Calendar', 'My Work'],
    },
  },
  {
    id: 'mopuri',
    title: 'Mopuri Business Solutions',
    subtitle: 'Full-stack Django web application',
    summary:
      'Service-application forms, authentication, a profile dashboard and Razorpay payments for a legal compliance services company.',
    tech: ['Python', 'Django', 'JavaScript', 'SQL', 'Razorpay'],
    github: '',
    liveDemo: '',
    featured: true,
    visual: 'payments',
    details: {
      overview:
        'Built during my software development internship at Mopuri Business Solutions (Mindcreadz Pvt. Ltd.), a legal compliance services company.',
      useCase:
        'Customers need to apply for compliance services, manage their profile and pay for services online securely.',
      built: [
        'Dynamic service-application forms driven by JavaScript.',
        'Secure user authentication and a profile management dashboard.',
        'End-to-end Razorpay payment flow.',
      ],
      implementation: [
        'Razorpay orders created on the server, with payment signature verification.',
        'Structured error logging around the payment flow.',
        'Data moved from client-side storage to a relational database (SQLite/SQL), improving integrity across user profiles.',
        'Front-end issues debugged across dynamically rendered forms; work tracked in Git under SDLC practices.',
      ],
      features: ['Service forms', 'Authentication', 'Profile dashboard', 'Order creation', 'Signature verification', 'Error logging', 'Relational database'],
    },
  },
  {
    id: 'breakdown',
    title: 'Break Down',
    subtitle: 'Interactive roadside assistance website',
    summary:
      'A scroll-driven site whose hero plays a 150-frame image sequence on a canvas, synced to scroll with GSAP ScrollTrigger, and whose UI is generated from structured data.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'ScrollTrigger', 'Canvas API'],
    github: '',
    liveDemo: '',
    featured: true,
    visual: 'frames',
    details: {
      overview:
        'A roadside assistance website built around a scroll-driven hero animation and data-driven interface components.',
      useCase:
        'Someone whose vehicle has broken down needs to see the available services quickly, pick their vehicle brand and understand how booking works, on whatever device they have.',
      built: [
        'A scroll-driven hero animation: a 150-frame image sequence drawn to an HTML canvas and synced to scroll position.',
        'Service grids, brand pickers, a review carousel and a booking timeline.',
        'A responsive, mobile-first layout with animated counters and scroll-reveal effects.',
      ],
      implementation: [
        'Canvas API renders the current frame; GSAP ScrollTrigger maps scroll progress to a frame index.',
        'UI components are rendered as DOM elements from structured JavaScript data rather than hand-written markup.',
        'Device-aware asset loading keeps the frame sequence practical on smaller screens.',
      ],
      features: ['150-frame sequence', 'Canvas rendering', 'ScrollTrigger', 'Service grid', 'Brand picker', 'Review carousel', 'Booking timeline', 'Mobile-first'],
    },
  },
  {
    id: 'health',
    title: 'Emergency Health Alert System',
    subtitle: 'ML clinical decision-support tool',
    summary:
      'A supervised machine learning model that predicts high-risk emergency conditions from patient data, paired with a rule-based alert that flags high-risk cases.',
    tech: ['Python', 'Scikit-learn'],
    github: '',
    liveDemo: '',
    featured: true,
    visual: 'ml',
    details: {
      overview:
        'A clinical decision-support prototype combining a supervised classifier with a rule-based alert mechanism.',
      useCase:
        'In emergencies, high-risk patients need to be noticed early. The model estimates risk from patient data and the alert layer flags cases that need attention.',
      built: [
        'Data preprocessing and exploratory data analysis on healthcare data.',
        'A supervised classification model to predict high-risk emergency conditions.',
        'A rule-based alert mechanism that flags high-risk cases.',
      ],
      implementation: [
        'Python and Scikit-learn for preprocessing, training and evaluation.',
        'Model evaluated with classification metrics: accuracy, precision and recall.',
      ],
      features: ['Preprocessing', 'EDA', 'Supervised classification', 'Accuracy · precision · recall', 'Rule-based alerts'],
    },
  },
  {
    id: 'melty',
    title: 'Melty Ice Cream',
    subtitle: 'Responsive multi-page website',
    summary:
      'A four-page responsive site (Home, Services, Gallery, Contact) with interactive UI components and navigation.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    github: '',
    liveDemo: '',
    featured: false,
    visual: 'pages',
    details: {
      overview: 'A responsive website for an ice cream brand, built with plain HTML, CSS and JavaScript.',
      useCase: 'Visitors browse the offer, look through the gallery and get in touch, on any screen size.',
      built: ['Four pages: Home, Services, Gallery and Contact.', 'Interactive UI components and site navigation.'],
      implementation: ['CSS best practices for layouts that render consistently across devices and screen sizes.'],
      features: ['Home', 'Services', 'Gallery', 'Contact', 'Responsive layout'],
    },
  },
];
