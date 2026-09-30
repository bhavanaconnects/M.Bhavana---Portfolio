import { forwardRef, type ReactNode, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark';
type Size = 'sm' | 'md' | 'lg';

const base =
  'relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-[-0.005em] ' +
  'transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out ' +
  'active:translate-y-px disabled:pointer-events-none disabled:opacity-50 select-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-cobalt text-white shadow-[0_1px_0_rgb(255_255_255/0.2)_inset,0_8px_20px_-8px_rgb(47_75_255/0.7)] hover:bg-cobalt-deep',
  secondary: 'bg-surface text-ink border border-line-strong hover:border-ink/40 hover:bg-white',
  ghost: 'text-ink hover:bg-ink/[0.06]',
  dark: 'bg-ink text-white hover:bg-[#232a3a]',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 rounded-[9px] px-3.5 text-[14px]',
  md: 'h-11 rounded-[11px] px-4.5 text-[15px]',
  lg: 'h-12 rounded-[12px] px-5.5 text-[15.5px]',
};

interface Common {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
  className?: string;
}

type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, AsLink | AsButton>(function Button(
  { variant = 'secondary', size = 'md', icon, iconRight, children, className, ...rest },
  ref,
) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {icon}
      {children}
      {iconRight}
    </>
  );

  if ('href' in rest && rest.href !== undefined) {
    const { href, target, ...anchorRest } = rest as AsLink;
    const external = target === '_blank';
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={external ? 'noopener noreferrer' : anchorRest.rel}
        className={classes}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  const { type = 'button', ...buttonRest } = rest as AsButton;
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
});
