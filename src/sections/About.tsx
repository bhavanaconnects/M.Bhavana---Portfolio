import { SectionHeading } from '../components/ui/SectionHeading';
import { ProfilePhoto } from '../components/ui/ProfilePhoto';
import { Reveal } from '../components/ui/Reveal';
import { education } from '../data/education';
import { profile } from '../data/profile';

const facts = [
  { term: 'Based in', detail: profile.location },
  { term: 'Degree', detail: `B.Tech, Computer Science (AI & Data Science), ${education.period} · ${education.score}` },
  { term: 'Currently', detail: 'Full-stack developer trainee (Python) at KodNest' },
  { term: 'Most recent role', detail: 'Software Development Intern, Mopuri Business Solutions' },
  { term: 'Works across', detail: 'Frontend, backend & APIs, relational databases, applied ML' },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading id="about" title="From the form to the database" />
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal className="space-y-5 text-[18px] leading-[1.7] text-ink/80">
            <p>
              I’m a Computer Science (AI &amp; Data Science) graduate who builds complete web applications. At Mopuri Business Solutions I
              worked on a Django product for a legal compliance services company end to end: dynamic service-application forms, authentication,
              a profile dashboard, and a Razorpay payment flow that creates orders on the server and verifies every payment signature.
            </p>
            <p>
              On my own projects I built a CRM on FastAPI and PostgreSQL with JWT-protected APIs and a layered backend, a scroll-driven
              canvas animation for a roadside assistance site, and a classifier that flags high-risk emergency cases.
            </p>
            <p>
              Debugging across the frontend and backend is a regular part of how I work, and I’m continuing to grow as a full-stack
              developer through training at KodNest after completing a 240-hour Google Cloud Generative AI internship.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-8">
            <ProfilePhoto />
            <dl className="divide-y divide-line rounded-[18px] border border-line bg-surface px-6 shadow-[var(--shadow-card)]">
              {facts.map((f) => (
                <div key={f.term} className="grid gap-1 py-4 sm:grid-cols-[140px_1fr] sm:gap-4">
                  <dt className="text-[14px] font-medium text-slate">{f.term}</dt>
                  <dd className="text-[15.5px] font-medium leading-snug text-ink">{f.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
