# M Bhavana — Developer Portfolio

A single-page portfolio built with **React 18, Vite, TypeScript, Tailwind CSS v4 and Motion** (the successor to Framer Motion). Icons come from **Lucide**; fonts (Schibsted Grotesk and JetBrains Mono) are self-hosted through Fontsource, so the site makes no third-party requests.

All content comes from the uploaded resumes and lives in `src/data/`. You change the site by editing data files, not JSX.

---

## Requirements

- Node.js **20.19+** or **22.12+** (required by Vite 8)
- npm 10+

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build      # type-checks, then builds to /dist
npm run preview    # serves /dist locally to check the production build
```

Deploy the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

- **Vercel / Netlify:** framework "Vite", build command `npm run build`, output directory `dist`.
- **GitHub Pages under a sub-path** (e.g. `username.github.io/portfolio/`): add `base: '/portfolio/'` to `vite.config.ts`.

Optional: `npm run build:single` produces one self-contained HTML file in `dist-single/`, handy for sharing a quick preview.

---

## Editing your content

| What | File |
| --- | --- |
| Name, intro, email, phone, LinkedIn, GitHub, resume path | `src/data/profile.ts` |
| Projects, links, detail-modal text | `src/data/projects.ts` |
| Internships and training | `src/data/experience.ts` |
| Skills and the "used in" links | `src/data/skills.ts` |
| Degree, schooling, certifications | `src/data/education.ts` |
| Hero console flows | `flows` array at the top of `src/components/hero/FlowConsole.tsx` |

### Profile photo

Your photo appears in the About section (`src/components/ui/ProfilePhoto.tsx`) and as a small avatar in the navbar and footer. The files are:

- `src/assets/bhavana.jpg`: the About photo
- `src/assets/bhavana-avatar.jpg`: the small avatar

To change the photo, replace both files, keeping the same names. A square image works best; 800×800 or larger looks sharpest on high-resolution screens.

### Resume

The **Download resume** buttons point to:

```
public/resume/M_Bhavana_Resume.pdf
```

This PDF was generated from `M_Bhavana_.docx`, the most complete of your uploaded resumes. To use a different version, export it as a PDF and save it at that exact path, replacing the current file.

To use a different file name, update `resume` and `resumeFileName` in `src/data/profile.ts`. Set `resume: ''` to hide every resume button.

### GitHub project links

In `src/data/projects.ts`, each project has:

```ts
github: '',
liveDemo: '',
```

- An empty string hides that button, so the site never shows a broken link.
- Paste a full URL (starting with `https://`) and the button appears on the card and in the details modal.
- Only the CRM repository (`https://github.com/bhavanaconnects/CRM`) appeared in your resumes, so it's the only one filled in.

### Live demo links

These use the same `liveDemo` field shown above. None of the resumes list a live demo, so every one starts empty.

### Contact and social links

Edit `src/data/profile.ts`:

```ts
email: 'bhavana.m.connect@gmail.com',
linkedin: 'https://www.linkedin.com/in/bhavana-manku',
github: 'https://github.com/bhavanaconnects', // taken from the CRM repo URL — confirm this is your profile
phone: '+91 6300647921',
showPhone: false, // set to true to show the phone number in the Contact section
```

Clearing `linkedin` or `github` removes those links from the navbar, hero, contact section and footer.

### Screenshots

No project screenshots were provided, so each project shows an illustration of its architecture instead, labelled as such in the modal. To add real screenshots:

1. Put the images in `public/projects/`, for example `public/projects/crm-dashboard.png`.
2. Add them to the matching project in `src/data/projects.ts`:

```ts
screenshots: [{ src: '/projects/crm-dashboard.png', alt: 'CRM dashboard with leads and deals' }],
```

They'll appear in that project's details modal.

### Skills "used in" links

Each skill in `src/data/skills.ts` can have `usedIn: ['crm', 'mopuri']`. The values are project or experience ids. Skills with `usedIn` show a small dot, and selecting one lists where it was used. When you add a project that uses a skill (React, for example), add its id to that skill's `usedIn`.

---

## Project structure

```
src/
  components/
    experience/  ExperienceTimeline
    hero/        FlowConsole (animated request trace)
    layout/      Navbar, Footer
    projects/    ProjectCard, ProjectModal, ProjectActions, ProjectVisual, FrameScrubber
    skills/      SkillCategory, SkillChip
    ui/          Button, TechBadge, SectionHeading, Reveal, Toast, Magnetic, BrandIcons, ProfilePhoto
  assets/        bhavana.jpg, bhavana-avatar.jpg
  data/          profile, projects, experience, skills, education
  hooks/         useActiveSection, useScrolled, useCopy, useLockBody, useInView
  sections/      Hero, About, Skills, Experience, Projects, Education, Contact
  utils/         cn, lookup
public/
  resume/        M_Bhavana_Resume.pdf
  favicon.svg
```

## Accessibility and motion

- **Semantic structure:** landmarks, one `h1`, ordered headings, and a skip link.
- **Keyboard support:** visible focus rings everywhere. The console tabs use arrow keys. The project modal traps focus, closes on Escape and returns focus to where you were.
- **Reduced motion:** with "reduce motion" enabled in the OS, the site turns off entrance motion, the magnetic button, the drifting background and the console animation (the console shows its finished state instead).
- **Performance:** animations pause when off-screen, and the canvas frame strip only redraws when its frame changes.

## Content notes

The resumes disagreed in a few places. These choices were made:

- **Mopuri dates:** Jul 2026 – Sep 2026, used by most versions (one said Dec 2025).
- **MotionCut:** no dates are given in the resumes, so the timeline says "Dates not listed". Add `period` in `experience.ts` if you want dates shown.
- **Deloitte resume:** its unique items were left out because it looks like an older draft. That includes the Novitech internship, the Student Management System and URL Shortener projects, and a CGPA of 8.22 (the others say 8.3). Add them to the data files if you want them included.
