import { cn } from '../../utils/cn';

export function TechBadge({ name, tone = 'light', className }: { name: string; tone?: 'light' | 'dark'; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center rounded-md px-2.5 text-[13px] font-medium leading-none',
        tone === 'light' ? 'bg-ink/[0.05] text-ink/80 ring-1 ring-inset ring-ink/[0.06]' : 'bg-white/[0.07] text-white/80 ring-1 ring-inset ring-white/10',
        className,
      )}
    >
      {name}
    </span>
  );
}
