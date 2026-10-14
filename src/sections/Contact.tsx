import { Check, Copy, Download, Mail, Phone } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GitHubIcon, LinkedInIcon } from '../components/ui/BrandIcons';
import { Reveal } from '../components/ui/Reveal';
import { Toast } from '../components/ui/Toast';
import { profile } from '../data/profile';
import { useCopy } from '../hooks/useCopy';

export function Contact() {
  const { copied, copy } = useCopy();
  const handle = (url: string) => url.replace(/\/+$/, '').split('/').pop() ?? url;

  const links = [
    profile.linkedin && { label: 'LinkedIn', value: handle(profile.linkedin), href: profile.linkedin, icon: <LinkedInIcon size={19} /> },
    profile.github && { label: 'GitHub', value: handle(profile.github), href: profile.github, icon: <GitHubIcon size={19} /> },
    profile.showPhone && profile.phone && { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, icon: <Phone size={18} aria-hidden="true" /> },
  ].filter(Boolean) as { label: string; value: string; href: string; icon: React.ReactNode }[];

  return (
    <section id="contact" aria-labelledby="contact-title" className="section border-t border-line">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-console px-6 py-12 text-white shadow-[var(--shadow-console)] sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            <div aria-hidden="true" className="absolute -right-24 -top-24 size-[420px] rounded-full bg-[radial-gradient(circle,rgb(47_75_255/0.45),transparent_65%)] blur-2xl" />
            <div aria-hidden="true" className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_80%_at_80%_20%,#000,transparent_75%)]" />

            <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end">
              <div className="min-w-0">
                <h2 id="contact-title" className="text-[clamp(38px,6vw,68px)] font-extrabold leading-[0.98] tracking-[-0.045em]">
                  Let’s build something useful.
                </h2>
                <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-white/70">
                  I’m looking for software developer roles across frontend, backend and full-stack work. Email is the quickest way to reach me.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button href={`mailto:${profile.email}`} variant="primary" size="lg" icon={<Mail size={17} aria-hidden="true" />}>
                    Email me
                  </Button>
                  <button
                    type="button"
                    onClick={() => copy(profile.email)}
                    className="group inline-flex h-12 min-w-0 items-center justify-between gap-3 rounded-[12px] border border-white/15 bg-white/[0.05] pl-4 pr-2 text-left transition-colors hover:border-white/30 hover:bg-white/[0.08]"
                    aria-label={`Copy email address ${profile.email}`}
                  >
                    <span className="truncate text-[15px] font-medium text-white/90">{profile.email}</span>
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/10 text-white transition-colors group-hover:bg-white/15">
                      {copied ? <Check size={15} strokeWidth={3} className="text-signal" aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                    </span>
                  </button>
                </div>
              </div>

              <ul className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith('http') ? '_blank' : undefined}
                      rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex h-16 items-center gap-4 rounded-[14px] border border-white/10 bg-white/[0.03] px-4 transition-colors hover:border-white/25 hover:bg-white/[0.07]"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-white/10 text-white">{l.icon}</span>
                      <span className="min-w-0">
                        <span className="block text-[13px] text-white/55">{l.label}</span>
                        <span className="block truncate text-[15px] font-semibold text-white">{l.value}</span>
                      </span>
                    </a>
                  </li>
                ))}
                {profile.resume && (
                  <li>
                    <a
                      href={profile.resume}
                      download={profile.resumeFileName}
                      className="group flex h-16 items-center gap-4 rounded-[14px] bg-white px-4 text-ink transition-colors hover:bg-white/90"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-ink text-white">
                        <Download size={18} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13px] text-slate">Resume</span>
                        <span className="block truncate text-[15px] font-semibold">Download PDF</span>
                      </span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
      <Toast show={copied} message="Email copied!" />
    </section>
  );
}
