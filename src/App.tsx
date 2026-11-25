import { MotionConfig } from 'motion/react';
import { useCallback, useState } from 'react';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { ProjectModal } from './components/projects/ProjectModal';
import { projects } from './data/projects';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Education } from './sections/Education';
import { Experience } from './sections/Experience';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';

export default function App() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openProject = useCallback((id: string) => setOpenId(id), []);
  const closeProject = useCallback(() => setOpenId(null), []);
  const project = projects.find((p) => p.id === openId) ?? null;

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-lg bg-ink px-4 py-2.5 text-[14px] font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero onOpenProject={openProject} />
        <About />
        <Skills onOpenProject={openProject} />
        <Experience />
        <Projects onOpenProject={openProject} />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ProjectModal project={project} onClose={closeProject} />
    </MotionConfig>
  );
}
