import { z } from "zod";

// Upstream schemas (GitHub API + contributions proxy) — enforce shape
// at the boundary before the handler operates on untrusted JSON.

export const repoSchema = z.object({
  language: z.string().nullable(),
  stargazers_count: z.number(),
});
export const reposSchema = z.array(repoSchema);

export const contributionsSchema = z.object({
  total: z
    .object({
      lastYear: z.number().optional(),
    })
    .optional(),
});

// Client-facing schema — the shape /api/github returns to CodeStats.tsx.
// totalContributions is nullable on purpose: upstream proxy can fail, and
// rendering a fabricated number would misrepresent the real data.
// The refine locks the F-10 invariant at the schema level: if topLanguages
// is non-empty, totalLangRepos must be at least 1.
export const githubResponseSchema = z
  .object({
    publicRepos: z.number(),
    totalStars: z.number(),
    totalContributions: z.number().nullable(),
    topLanguages: z.array(
      z.object({
        name: z.string(),
        count: z.number(),
      }),
    ),
    totalLangRepos: z.number(),
    fetchedAt: z.string(),
  })
  .refine((d) => d.topLanguages.length === 0 || d.totalLangRepos > 0, {
    message: "topLanguages non-empty ⇒ totalLangRepos ≥ 1",
  });

export type GitHubResponse = z.infer<typeof githubResponseSchema>;
