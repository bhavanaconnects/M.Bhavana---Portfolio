import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

export function SectionHeading({ id, title, lead, aside }: { id: string; title: string; lead?: ReactNode; aside?: ReactNode }) {
  return (
    <Reveal className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div className="max-w-[640px]">
        <h2 id={`${id}-title`} className="text-[34px] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[44px] lg:text-[52px]">
          {title}
        </h2>
        {lead && <p className="mt-4 max-w-[58ch] text-[17px] leading-relaxed text-slate">{lead}</p>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </Reveal>
  );
}
