# M Bhavana — Developer Portfolio

A single-page portfolio built with **React 18, Vite, TypeScript, Tailwind CSS v4 and Motion** (the successor to Framer Motion). Icons come from **Lucide**; fonts (Schibsted Grotesk and JetBrains Mono) are self-hosted through Fontsource, so the site makes no third-party requests.

All content lives in plain **JSON files in `src/content/`**. You change the site by editing those files, not the React code. Save the file and the page updates (or rebuild and redeploy).

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
| Name, role, intro, email, phone, LinkedIn, GitHub, resume path | `src/content/profile.json` |
| About section paragraphs and the facts box | `src/content/about.json` |
| Internships and training (dates, bullets, tech) | `src/content/experience.json` |
| Projects, links, logo, screenshots, detail-modal text | `src/content/projects.json` |
| Skills and the "used in" links | `src/content/skills.json` |
| Degree, schooling, certifications | `src/content/education.json` |
| Hero console flows (animated request trace) | `src/content/flows.json` |

**JSON rules (the only way to break it):** keep every `"` and `,` in place, no comma after the last item in a list, and use `\"` for a quote inside text. If the page goes blank after an edit, paste the file into any JSON validator, or run `npm run typecheck`.

`src/data/*.ts` only holds the TypeScript types and loads these JSON files; you shouldn't need to edit them.

### Example: change a date

In `src/content/experience.json`:

```json
{ "id": "mopuri", "period": "Jan 2026 – Present", "current": true }
```

`"current": true` shows the "Ongoing" badge and the highlighted timeline dot.

### Project logo

`src/content/projects.json` supports an optional `logo` per project (shown on the card and in the modal). New Start uses `public/brand/newstarts-logo.png`. To change it, replace that file or point `logo.src` at another image in `public/`.

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

To use a different file name, update `resume` and `resumeFileName` in `src/content/profile.json`. Set `"resume": ""` to hide every resume button.

### GitHub project links

In `src/content/projects.json`, each project has:

```json
"github": "",
"liveDemo": ""
```

- An empty string hides that button, so the site never shows a broken link.
- Paste a full URL (starting with `https://`) and the button appears on the card and in the details modal.
- Only the CRM repository (`https://github.com/bhavanaconnects/CRM`) appeared in your resumes, so it's the only one filled in.

### Live demo links

These use the same `liveDemo` field shown above. None of the resumes list a live demo, so the others start empty.

**New Start:** its `liveDemo` is `https://newstarts.in/`, so its Live demo button shows on the card and in the details modal and opens in a new tab.

### Contact and social links

Edit `src/content/profile.json`:

```json
"email": "bhavana.m.connect@gmail.com",
"linkedin": "https://www.linkedin.com/in/bhavana-manku",
"github": "https://github.com/bhavanaconnects",
"phone": "+91 6300647921",
"showPhone": false
```

Set `showPhone` to `true` to show the phone number in the Contact section.

Clearing `linkedin` or `github` removes those links from the navbar, hero, contact section and footer.

### Screenshots

Only New Start has real screenshots (`public/projects/new-start-*.jpg`, shown in its details modal). Every project card shows an illustration of its architecture, labelled as such in the modal. To add real screenshots:

1. Put the images in `public/projects/`, for example `public/projects/crm-dashboard.png`.
2. Add them to the matching project in `src/content/projects.json`:

```json
"screenshots": [{ "src": "/projects/crm-dashboard.png", "alt": "CRM dashboard with leads and deals" }]
```

They'll appear in that project's details modal.

### Skills "used in" links

Each skill in `src/content/skills.json` can have `"usedIn": ["crm", "mopuri"]`. The values are project or experience ids. Skills with `usedIn` show a small dot, and selecting one lists where it was used. When you add a project that uses a skill (React, for example), add its id to that skill's `usedIn`.

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
  content/       JSON files you edit: profile, about, experience, projects, skills, education, flows
  data/          TypeScript types that load the JSON (no need to edit)
  hooks/         useActiveSection, useScrolled, useCopy, useLockBody, useInView
  sections/      Hero, About, Skills, Experience, Projects, Education, Contact
  utils/         cn, lookup
public/
  resume/        M_Bhavana_Resume.pdf
  brand/         newstarts-logo.png
  projects/      New Start screenshots (header shows the new logo)
  favicon.svg
```

## Accessibility and motion

- **Semantic structure:** landmarks, one `h1`, ordered headings, and a skip link.
- **Keyboard support:** visible focus rings everywhere. The console tabs use arrow keys. The project modal traps focus, closes on Escape and returns focus to where you were.
- **Reduced motion:** with "reduce motion" enabled in the OS, the site turns off entrance motion, the magnetic button, the drifting background and the console animation (the console shows its finished state instead).
- **Performance:** animations pause when off-screen, and the canvas frame strip only redraws when its frame changes.

## Content notes

The resumes disagreed in a few places. These choices were made:

- **Mopuri dates:** Jan 2026 – Present (updated; shown as ongoing).
- **MotionCut:** no dates are given in the resumes, so the timeline says "Dates not listed". Add `period` in `experience.json` if you want dates shown.
- **Deloitte resume:** its unique items were left out because it looks like an older draft. That includes the Novitech internship, the Student Management System and URL Shortener projects, and a CGPA of 8.22 (the others say 8.3). Add them to the content files if you want them included.
