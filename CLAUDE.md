# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start local dev server (Vite, hot reload)
npm run build      # Production build → dist/
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
npm run deploy     # Build + deploy to GitHub Pages (gh-pages)
```

## Architecture

Single-page React app (Vite + React 19) deployed to GitHub Pages at `https://aryanbv.github.io/Aryan-Portfolio/`.

**Entry point:** `src/main.jsx` → `src/App.jsx` → `src/pages/Home.jsx`

`App.jsx` wraps everything in `HashRouter` (required for GitHub Pages static hosting) and mounts global UI (`LoadingScreen`, `CustomCursor`, `ScrollProgress`, `BackToTop`). All navigation is hash-based smooth-scroll to section IDs — there is no multi-page routing.

**Section order in `Home.jsx`:** `Hero → About → TechStack → Projects → Timeline → CodeStats → Certificates → Contact`

Each section has a matching `id` attribute (`hero`, `about`, `techstack`, `projects`, `timeline`, `codestats`, `certificates`, `contact`) that `Navbar.jsx` targets for scroll navigation via `document.getElementById()`.

## Component Structure

```
src/components/
  common/    # App-wide UI: BackToTop, CustomCursor, LoadingScreen, ScrollProgress
  layout/    # Navbar, Footer, MainLayout (wraps Navbar + Footer around content)
  sections/  # One component per portfolio section (Hero, About, TechStack, etc.)
  UI/        # Reusable primitives: GlassCard
```

## Data Sources

**Static (hard-coded in components):**
- Certificates array → `Certificates.jsx`
- Tech stack categories → `TechStack.jsx`
- Featured projects → `Projects.jsx`
- About/bio content → `About.jsx`

**Dynamic (GitHub public API — no auth):**
- `src/services/githubService.js` fetches repos, language stats, and contributions
- `Projects.jsx` merges featured projects with GitHub API results; falls back to featured-only if API fails
- `TechStack.jsx` uses GitHub language data to calculate proficiency percentages
- Top 10 repos only are used for language aggregation (API rate limit consideration)

## Key Patterns

**Image paths:** Always use `getImagePath(filename)` from `src/utils/pathUtils.js`. This handles the base path difference: `/` in dev, `/Aryan-Portfolio/` in production.

**Styling:** Tailwind CSS with dark theme only (no light mode). Custom tokens defined in `tailwind.config.js`: colors `primary` (#0284c7), `secondary` (#7c3aed), `dark` (#111827); animations `blob`, `float`, `pulse-slow`, `bounce-slow`.

**Animations:** Framer Motion for all transitions/enter animations. `React Intersection Observer` triggers animations when sections scroll into view.

**Custom hooks:** All in `src/hooks/useScrollSpy.js` — includes `useScrollSpy`, `useIntersectionObserver`, `useDebounce`, `useThrottle`, `useLocalStorage`, `useMediaQuery`, `useWindowSize`, `useAnimation`, `useOnClickOutside`.

**Notifications:** `react-hot-toast` for user feedback (e.g., form submission).

## Deployment Notes

- `vite.config.js` sets `base: '/Aryan-Portfolio/'` in production, `'/'` in dev — this affects all asset URLs
- Deploy with `npm run deploy` (runs `predeploy` build first, then `gh-pages -d dist`)
- EmailJS contact form integration is present in `Contact.jsx` but currently commented out
