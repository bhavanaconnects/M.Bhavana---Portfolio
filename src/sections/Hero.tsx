import { motion, type Variants } from 'motion/react';
import { ArrowDown, MapPin, Send } from 'lucide-react';
import { profile } from '../data/profile';
import { FlowConsole } from '../components/hero/FlowConsole';
import { Button } from '../components/ui/Button';
import { GitHubIcon, LinkedInIcon } from '../components/ui/BrandIcons';
import { Magnetic } from '../components/ui/Magnetic';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-20 pt-[calc(68px+48px+env(safe-area-inset-top,0px))] lg:pb-28 lg:pt-[calc(68px+88px)]">
      <div aria-hidden="true" className="grid-backdrop absolute inset-0 -z-10" />
      <div aria-hidden="true" className="animate-drift absolute -right-[10%] -top-[18%] -z-10 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle_at_center,rgb(47_75_255/0.16),transparent_62%)] blur-2xl" />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] xl:gap-16">
        <motion.div variants={container} initial="hidden" animate="show" className="min-w-0">
          <motion.p variants={item} className="inline-flex items-center gap-2 text-[14px] font-medium text-slate">
            <MapPin size={15} aria-hidden="true" className="text-cobalt" />
            {profile.location}
          </motion.p>

          <motion.h1
            variants={item}
            id="hero-title"
            className="mt-5 whitespace-nowrap text-[clamp(52px,7.2vw,96px)] font-extrabold leading-[0.95] tracking-[-0.05em] text-ink"
          >
            {profile.name}
          </motion.h1>

          <motion.p variants={item} className="mt-5 text-[clamp(22px,2.6vw,30px)] font-semibold leading-tight tracking-[-0.02em] text-ink/85">
            {profile.role}
          </motion.p>

          <motion.ul variants={item} aria-label="Core stack" className="mt-4 flex flex-wrap gap-x-1 gap-y-2">
            {profile.stack.map((s, i) => (
              <li key={s} className="flex items-center text-[15px] font-medium text-slate">
                {s}
                {i < profile.stack.length - 1 && <span aria-hidden="true" className="mx-2.5 h-3.5 w-px rotate-12 bg-line-strong" />}
              </li>
            ))}
          </motion.ul>

          <motion.p variants={item} className="mt-7 max-w-[54ch] text-[17px] leading-[1.65] text-slate">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-9 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
            <Magnetic className="w-full sm:w-auto">
              <Button href="#projects" variant="primary" size="lg" className="w-full sm:w-auto" iconRight={<ArrowDown size={17} aria-hidden="true" />}>
                View projects
              </Button>
            </Magnetic>
            <Button href="#contact" size="lg" icon={<Send size={16} aria-hidden="true" />}>
              Contact me
            </Button>
            {profile.github && (
              <Button href={profile.github} target="_blank" size="lg" aria-label="GitHub profile" title="GitHub" className="sm:w-12 sm:px-0" icon={<GitHubIcon />}>
                <span className="sm:sr-only">GitHub</span>
              </Button>
            )}
            {profile.linkedin && (
              <Button href={profile.linkedin} target="_blank" size="lg" aria-label="LinkedIn profile" title="LinkedIn" className="sm:w-12 sm:px-0" icon={<LinkedInIcon />}>
                <span className="sm:sr-only">LinkedIn</span>
              </Button>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0"
        >
          <FlowConsole onOpenProject={onOpenProject} />
        </motion.div>
      </div>
    </section>
  );
}
