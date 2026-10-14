import { ExperienceTimeline } from '../components/experience/ExperienceTimeline';
import { SectionHeading } from '../components/ui/SectionHeading';
import { experience } from '../data/experience';

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading id="experience" title="Experience" lead="Internships and training, most recent first." />
        <ExperienceTimeline items={experience} />
      </div>
    </section>
  );
}
