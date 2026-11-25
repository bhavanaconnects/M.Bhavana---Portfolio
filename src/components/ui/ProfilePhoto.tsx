import photo from '../../assets/bhavana.jpg';
import { profile } from '../../data/profile';

/** Calm, framed portrait for the About section. */
export function ProfilePhoto() {
  return (
    <figure className="relative mx-auto w-full max-w-[400px] pb-4 pr-4 lg:mx-0">
      <div aria-hidden="true" className="absolute bottom-0 right-0 left-4 top-4 rounded-[24px] bg-cobalt">
        <div className="h-full w-full rounded-[24px] opacity-40 [background-image:radial-gradient(rgb(255_255_255/0.5)_1px,transparent_1px)] [background-size:14px_14px]" />
      </div>
      <img
        src={photo}
        alt={`Portrait of ${profile.name}`}
        width={400}
        height={400}
        loading="lazy"
        decoding="async"
        className="relative aspect-square w-full rounded-[24px] bg-[#cfcfd1] object-cover shadow-[0_24px_50px_-28px_rgb(19_23_34/0.55)] ring-1 ring-ink/10"
      />
    </figure>
  );
}
