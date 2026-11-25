import { SectionHeading } from '../components/ui/SectionHeading';
import { ProfilePhoto } from '../components/ui/ProfilePhoto';
import { Reveal } from '../components/ui/Reveal';
import aboutJson from '../content/about.json';

/** Text lives in `src/content/about.json`. */
const about = aboutJson as { title: string; paragraphs: string[]; facts: { term: string; detail: string }[] };

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading id="about" title={about.title} />
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal className="space-y-5 text-[18px] leading-[1.7] text-ink/80">
            {about.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-8">
            <ProfilePhoto />
            <dl className="divide-y divide-line rounded-[18px] border border-line bg-surface px-6 shadow-[var(--shadow-card)]">
              {about.facts.map((f) => (
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
