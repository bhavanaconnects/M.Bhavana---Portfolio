import { ExternalLink, PanelRightOpen } from 'lucide-react';
import type { Project } from '../../data/projects';
import { Button } from '../ui/Button';
import { GitHubIcon } from '../ui/BrandIcons';

/** GitHub / Live demo / Details — links only render when a real URL exists. */
export function ProjectActions({ project, onDetails, size = 'sm' }: { project: Project; onDetails?: () => void; size?: 'sm' | 'md' }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.github && (
        <Button
          href={project.github}
          target="_blank"
          size={size}
          variant="dark"
          icon={<GitHubIcon size={16} />}
          aria-label={`${project.title} source code on GitHub`}
        >
          GitHub
        </Button>
      )}
      {project.liveDemo && (
        <Button
          href={project.liveDemo}
          target="_blank"
          size={size}
          variant="primary"
          icon={<ExternalLink size={15} aria-hidden="true" />}
          aria-label={`${project.title} live demo`}
        >
          Live demo
        </Button>
      )}
      {onDetails && (
        <Button size={size} onClick={onDetails} icon={<PanelRightOpen size={15} aria-hidden="true" />} aria-label={`View details: ${project.title}`}>
          Details
        </Button>
      )}
    </div>
  );
}
