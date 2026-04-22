import { z } from "zod";

// Upstream schemas (GitHub API + contributions proxy) — enforce shape
// at the boundary before the handler operates on untrusted JSON.

export const repoSchema = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  html_url: z.string().url(),
  pushed_at: z.string(),
});
export const reposSchema = z.array(repoSchema);

export const contributionDaySchema = z.object({
  date: z.string(),
  count: z.number(),
  level: z.number().min(0).max(4),
});
export type ContributionDay = z.infer<typeof contributionDaySchema>;

export const contributionsSchema = z.object({
  total: z
    .object({
      lastYear: z.number().optional(),
    })
    .optional(),
  contributions: z.array(contributionDaySchema).optional(),
});

// Client-facing schema — the shape /api/github returns to Stats.tsx.
// `contributions` is nullable on purpose: upstream proxy can fail, and
// rendering a fabricated number would misrepresent the real data.
// The refine locks the F-10 invariant at the schema level: if topLanguages
// is non-empty, totalLangRepos must be at least 1.
export const githubResponseSchema = z
  .object({
    publicRepos: z.number(),
    totalStars: z.number(),
    totalForks: z.number(),
    contributions: z
      .object({
        total: z.number().nullable(),
        days: z.array(contributionDaySchema),
      })
      .nullable(),
    topLanguages: z.array(
      z.object({
        name: z.string(),
        count: z.number(),
      }),
    ),
    totalLangRepos: z.number(),
    topRepos: z.array(
      z.object({
        name: z.string(),
        description: z.string().nullable(),
        stars: z.number(),
        forks: z.number(),
        language: z.string().nullable(),
        url: z.string().url(),
        pushedAt: z.string(),
      }),
    ),
    fetchedAt: z.string(),
  })
  .refine((d) => d.topLanguages.length === 0 || d.totalLangRepos > 0, {
    message: "topLanguages non-empty ⇒ totalLangRepos ≥ 1",
  });

export type GitHubResponse = z.infer<typeof githubResponseSchema>;
