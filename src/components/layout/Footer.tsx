import avatar from '../../assets/bhavana-avatar.jpg';
import { navItems, profile } from '../../data/profile';
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons';
import { Mail } from 'lucide-react';

export function Footer() {
  const socials = [
    profile.github && { label: 'GitHub', href: profile.github, icon: <GitHubIcon size={17} /> },
    profile.linkedin && { label: 'LinkedIn', href: profile.linkedin, icon: <LinkedInIcon size={17} /> },
    { label: 'Email', href: `mailto:${profile.email}`, icon: <Mail size={17} aria-hidden="true" /> },
  ].filter(Boolean) as { label: string; href: string; icon: React.ReactNode }[];

  return (
    <footer className="border-t border-line pb-[max(32px,env(safe-area-inset-bottom))] pt-12">
      <div className="container-page">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[340px]">
            <a href="#top" className="group inline-flex items-center gap-2.5 rounded-lg">
              <img src={avatar} alt="" width={36} height={36} className="size-9 rounded-full object-cover ring-2 ring-surface shadow-[0_0_0_1px_rgb(19_23_34/0.12)] transition-transform duration-300 group-hover:scale-105" />
              <span className="text-[17px] font-bold tracking-[-0.02em]">{profile.name}</span>
            </a>
            <p className="mt-3 text-[15px] leading-relaxed text-slate">Full-stack developer in {profile.location.split(',')[0]}, building with Python, Django, FastAPI, React and SQL.</p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3">
              {[...navItems, { id: 'education', label: 'Education' }].map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-[15px] font-medium text-ink/75 transition-colors hover:text-cobalt-deep">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-[11px] border border-line bg-surface text-ink/75 transition-colors hover:border-ink/30 hover:text-ink"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[14px] text-slate sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <a href="#top" className="font-medium text-ink/75 transition-colors hover:text-cobalt-deep">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
