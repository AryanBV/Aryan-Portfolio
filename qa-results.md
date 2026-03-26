# QA Audit Results — Portfolio v2

**Issue:** ARY-140
**Date:** 2026-03-26
**Branch:** `portfolio-v2`

---

## Lighthouse

**Status:** Skipped — Chrome launcher failed in headless mode on Windows CLI.
**Action required:** Run Lighthouse manually in Chrome DevTools on the Vercel preview deployment.

---

## Accessibility Audit

| Check                | Result                                                                            |
| -------------------- | --------------------------------------------------------------------------------- |
| Heading hierarchy    | PASS — 1 `<h1>`, `<h2>` for sections, `<h3>` for cards                            |
| Image alt text       | PASS — all `<Image>` components have `alt` props                                  |
| Image sizes prop     | PASS — all `<Image>` components have `sizes` props                                |
| Hero image priority  | PASS — both mobile and desktop hero images have `priority`                        |
| Form labels          | PASS — all inputs have `<label>` + `aria-required` + `aria-describedby`           |
| Landmark roles       | PASS — `<main>`, `<nav>`, `<footer>` present                                      |
| Skip-to-content link | PASS — sr-only skip link in layout.tsx                                            |
| Focus management     | PASS — focus trap in mobile menu, focus-visible rings on all interactive elements |
| Reduced motion       | PASS — all animations respect `prefers-reduced-motion`                            |
| External links       | PASS — all `target="_blank"` have `rel="noopener noreferrer"`                     |
| Icon-only links      | PASS — footer social links and certificate verify links have `aria-label`         |

**Violations found:** 0

---

## Link Validation

### Internal Routes

| Route                     | Status        |
| ------------------------- | ------------- |
| `/`                       | 200           |
| `/projects/ajsp-manager`  | 200           |
| `/projects/lumina-crafts` | 200           |
| `/nonexistent`            | 404 (correct) |

### Hash Targets

| Target            | Result |
| ----------------- | ------ |
| `#projects`       | PASS   |
| `#about`          | PASS   |
| `#skills`         | PASS   |
| `#certifications` | PASS   |
| `#contact`        | PASS   |

### External Links

| URL                                          | Status | Notes                          |
| -------------------------------------------- | ------ | ------------------------------ |
| github.com/AryanBV                           | 200    | OK                             |
| github.com/AryanBV/ajsp-manager              | 404    | Private repo — expected        |
| github.com/AryanBV/lumina-crafts             | 200    | OK                             |
| github.com/AryanBV/SMART_MED_2.0             | 200    | OK                             |
| learn.microsoft.com/... (Azure cert)         | 200    | OK                             |
| lumina-crafts.vercel.app                     | 200    | OK                             |
| apnacollege.in/course/alpha-placement-course | 302    | Redirect — OK                  |
| apnacollege.in/course/delta                  | 200    | OK                             |
| linkedin.com/in/aryan-b-v-78aa63246          | 999    | LinkedIn anti-bot — not broken |

### Known Issues

- **ajsp-manager GitHub link (404):** The repository is private. The link is correct but returns 404 for unauthenticated users. Consider removing the GitHub link for this project or making the repo public.
- **LinkedIn (999):** LinkedIn blocks automated requests. Link is valid — verified manually.

---

## Content Verification

| Check                                           | Result            |
| ----------------------------------------------- | ----------------- |
| Debug content (lorem, TODO, FIXME, console.log) | PASS — none found |
| Cyan color references (#00d4ff)                 | PASS — none found |
| Old Vercel subdomain                            | PASS — none found |
| metadataBase → aryanbv.com                      | PASS              |

---

## OG Image Verification

| Check                                        | Result                                       |
| -------------------------------------------- | -------------------------------------------- |
| Homepage og:title                            | PASS                                         |
| Homepage og:description                      | PASS                                         |
| Homepage og:image                            | PASS — `https://aryanbv.com/opengraph-image` |
| Homepage og:url                              | PASS — `https://aryanbv.com`                 |
| OG image endpoint (/)                        | 200, `image/png`                             |
| Case study OG image (/projects/ajsp-manager) | 200, `image/png`                             |

---

## Sitemap & Robots

### sitemap.xml

| URL                                          | Present      | Priority |
| -------------------------------------------- | ------------ | -------- |
| `https://aryanbv.com`                        | Yes          | 1        |
| `https://aryanbv.com/projects/ajsp-manager`  | Yes          | 0.8      |
| `https://aryanbv.com/projects/lumina-crafts` | Yes          | 0.8      |
| `https://aryanbv.com/projects/smart-med`     | No (correct) | —        |

### robots.txt

```
User-Agent: *
Allow: /
Sitemap: https://aryanbv.com/sitemap.xml
```

PASS — allows all crawling, correct sitemap reference.

---

## Changes Made

1. **Resume download link** — Added "Download Resume ↗" text link in Hero section below CTAs
2. **`.gitignore`** — Added `lighthouse-*.json` pattern

---

## Build & Lint

| Command         | Result                                 |
| --------------- | -------------------------------------- |
| `npm run build` | PASS — zero errors, 14 pages generated |
| `npm run lint`  | PASS — zero errors                     |

---

## Summary

**Status: Ready to merge** (pending manual Lighthouse check on Vercel preview)

The codebase passes all automated QA checks. The only item requiring manual follow-up is running Lighthouse in a real browser to get performance/a11y/SEO scores (target: 90+). The private ajsp-manager GitHub repo link is a known issue — the link itself is correct but returns 404 for unauthenticated access.
