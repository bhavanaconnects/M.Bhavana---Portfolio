import avatar from '../../assets/bhavana-avatar.jpg';
import { AnimatePresence, motion } from 'motion/react';
import { Download, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { navItems, profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useLockBody } from '../../hooks/useLockBody';
import { useScrolled } from '../../hooks/useScrolled';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons';

const sectionIds = navItems.map((n) => n.id);

export function Navbar() {
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useLockBody(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)]">
      <div
        className={cn(
          'absolute inset-0 -z-10 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
          scrolled || open ? 'border-line/80 bg-paper/80 backdrop-blur-xl backdrop-saturate-150' : 'border-transparent bg-transparent',
        )}
      />
      <nav aria-label="Primary" className="container-page flex h-[68px] items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-2.5 rounded-lg" onClick={() => setOpen(false)}>
<img src={avatar} alt="" width={36} height={36} className="size-9 rounded-full object-cover ring-2 ring-surface shadow-[0_0_0_1px_rgb(19_23_34/0.12)] transition-transform duration-300 group-hover:scale-105" />
          <span className="text-[16px] font-bold tracking-[-0.02em]">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-line/70 bg-surface/60 p-1 backdrop-blur lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative z-10 block rounded-full px-4 py-2 text-[14px] font-medium transition-colors',
                    isActive ? 'text-white' : 'text-slate hover:text-ink',
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-1.5 lg:flex">
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="grid size-10 place-items-center rounded-[10px] text-ink/70 transition-colors hover:bg-ink/[0.06] hover:text-ink">
              <GitHubIcon />
            </a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="grid size-10 place-items-center rounded-[10px] text-ink/70 transition-colors hover:bg-ink/[0.06] hover:text-ink">
              <LinkedInIcon />
            </a>
          )}
          {profile.resume && (
            <Button href={profile.resume} download={profile.resumeFileName} variant="dark" size="sm" className="ml-1.5" icon={<Download size={15} aria-hidden="true" />}>
              Resume
            </Button>
          )}
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="grid size-11 place-items-center rounded-[11px] border border-line-strong bg-surface text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="h-[calc(100dvh-68px-env(safe-area-inset-top,0px))] overflow-y-auto border-b border-line bg-paper/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-page flex min-h-full flex-col pb-[max(24px,env(safe-area-inset-bottom))] pt-4">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.25 }}
                    className="border-b border-line"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === item.id ? 'true' : undefined}
                      className="flex items-center justify-between py-4 text-[26px] font-bold tracking-[-0.025em]"
                    >
                      {item.label}
                      <span className={cn('size-2 rounded-full transition-colors', active === item.id ? 'bg-cobalt' : 'bg-transparent')} aria-hidden="true" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto grid grid-cols-2 gap-3 pt-8">
                {profile.github && (
                  <Button href={profile.github} target="_blank" size="lg" icon={<GitHubIcon />}>
                    GitHub
                  </Button>
                )}
                {profile.linkedin && (
                  <Button href={profile.linkedin} target="_blank" size="lg" icon={<LinkedInIcon />}>
                    LinkedIn
                  </Button>
                )}
                {profile.resume && (
                  <Button href={profile.resume} download={profile.resumeFileName} variant="dark" size="lg" className="col-span-2" icon={<Download size={17} aria-hidden="true" />}>
                    Download resume
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
