# CLAUDE.md

## Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **UI:** React 19.2.3, Tailwind CSS 4, Framer Motion 12.35
- **Language:** TypeScript 5
- **Package manager:** npm
- **Deployment:** Vercel → aryanbv.com

## Commands

```bash
npm run dev        # Start dev server (Turbopack)
npm run build      # Production build
npm run start      # Serve production build locally
npm run lint       # ESLint
npm run test       # Vitest — projects schema + derived accessor tests
```

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — Geist fonts, metadata, MainLayout wrapper
│   ├── page.tsx                # Home — renders all sections in order
│   ├── globals.css             # CSS custom properties (dark theme tokens), Tailwind import
│   ├── api/github/route.ts     # GitHub stats API (repos, stars, contributions, languages)
│   ├── robots.ts               # robots.txt generation
│   ├── sitemap.ts              # sitemap.xml generation
│   └── opengraph-image.tsx     # Dynamic OG image
├── components/
│   ├── layout/
│   │   ├── MainLayout.tsx      # Navbar + main + Footer wrapper
│   │   ├── Navbar.tsx          # Fixed nav, scroll spy, mobile hamburger menu
│   │   └── Footer.tsx          # Copyright + social links
│   └── sections/
│       ├── Hero.tsx            # Headline, TypeAnimation, CTAs, stat counters
│       ├── About.tsx           # Bio, strengths, education card
│       ├── Projects.tsx        # Featured + regular project cards
│       ├── Skills.tsx          # Categorized tech stack chips
│       ├── CodeStats.tsx       # GitHub activity — animated counters, language bars
│       ├── Certificates.tsx    # Certification cards with verify links
│       └── Contact.tsx         # EmailJS contact form + social links
└── lib/                        # (empty — reserved for utilities)
tests/
└── projects.test.ts            # Zod schema + derived accessor tests
.github/
└── workflows/
    └── ci.yml                  # Lint + tsc + test + build on push/PR
```

## Key Patterns

- **Single-page scroll:** All navigation is hash-based (`#about`, `#projects`, etc.). No multi-page routing.
- **Section order:** Hero → About → Projects → Skills/CodeStats/Certificates → Contact
- **Dark theme only:** Custom properties in globals.css. Accent: `--accent`.
- **Animations:** Framer Motion `useInView` triggers, consistent `[0.22, 1, 0.36, 1]` easing.
- **GitHub data:** Client fetches `/api/github` (same-origin). Server calls GitHub API + contributions API.
- **Fonts:** Geist Sans + Geist Mono via `next/font/google` (self-hosted at build time).
- **Contact form:** EmailJS (`@emailjs/browser`), client-side validation, env vars for keys.
- **Tests:** Vitest, node env, `tests/**/*.test.ts`. Import `describe`/`it`/`expect` explicitly (no globals).

## Config Files

- `next.config.ts` — security headers (CSP, HSTS, Permissions-Policy, frame/object/form lockdown), devIndicators
- `tsconfig.json` — `@/` path alias → `src/`
- `globals.css` — Tailwind v4 (`@import "tailwindcss"`), CSS custom properties
- `.gitattributes` — enforce LF line endings repo-wide (prevents Windows autocrlf phantoms)
- `.editorconfig` — editor-level LF + UTF-8 + 2-space policy, complement to `.gitattributes`
- `vitest.config.ts` — Vitest runner config (node env, `@/` alias matching tsconfig)

## External Services

- **GitHub API** (`api.github.com`) — repo stats, called server-side only
- **EmailJS** (`api.emailjs.com`) — contact form, called client-side
- **Vercel** — hosting, analytics

---

## Portfolio 2.0 Rebuild

Portfolio 2.0 was merged into `main` at commit 8fb1cea. The warm amber `#F5A623` accent replaced the original cyan `#00d4ff`. Milestone tracking continues in Linear (M1–M7).

## Responsive Design

Every component must render correctly at 375px, 768px, and 1440px:

- Section padding: py-12 md:py-20 lg:py-28 (never flat values)
- Container padding: px-4 sm:px-6 md:px-8 lg:px-16
- Headings: responsive text sizes (text-2xl sm:text-3xl lg:text-4xl)
- No fixed widths without max-width fallback
- No horizontal overflow at any breakpoint
- Test at all three breakpoints before committing
