import { useEffect, useState } from 'react';

/** Tracks which section is currently in the reading band of the viewport. */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState('');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        });
        if (visible.size === 0) {
          setActive('');
          return;
        }
        // Pick the section whose top is closest to the reading line.
        const next = [...visible.entries()].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]))[0][0];
        setActive(next);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
