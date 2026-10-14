import { projects } from '../data/projects';
import { experience } from '../data/experience';

/** Resolves a project or experience id to a readable label + where it lives on the page. */
export function resolveUsage(id: string): { label: string; kind: 'project' | 'role'; target: string } | null {
  const p = projects.find((x) => x.id === id);
  if (p) return { label: p.title, kind: 'project', target: 'projects' };
  const e = experience.find((x) => x.id === id);
  if (e) return { label: `${e.company}`, kind: 'role', target: 'experience' };
  return null;
}
