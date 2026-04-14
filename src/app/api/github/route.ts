import { NextResponse } from "next/server";
import { z } from "zod";

const USERNAME = "AryanBV";
const GITHUB_API = "https://api.github.com";

type LangMap = Record<string, number>;

// ─── Runtime schemas for upstream responses ──────────────────────────────────
// GitHub and the contributions proxy are external systems — validate shape at
// the boundary so the handler never operates on an untrusted cast.

const repoSchema = z.object({
  language: z.string().nullable(),
  stargazers_count: z.number(),
});
const reposSchema = z.array(repoSchema);

const contributionsSchema = z.object({
  total: z
    .object({
      lastYear: z.number().optional(),
    })
    .optional(),
});

export async function GET() {
  // Repos are required — if this fails, return 503 (no useful data to show)
  const reposRes = await fetch(
    `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&type=public`,
    {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    },
  );

  if (!reposRes.ok) {
    return NextResponse.json(
      { error: "GitHub API unavailable" },
      { status: 503 },
    );
  }

  const rawRepos: unknown = await reposRes.json();
  const reposParsed = reposSchema.safeParse(rawRepos);
  if (!reposParsed.success) {
    return NextResponse.json(
      { error: "GitHub API response shape unexpected" },
      { status: 502 },
    );
  }
  const repos = reposParsed.data;

  const langMap: LangMap = {};
  for (const repo of repos) {
    if (repo.language) {
      langMap[repo.language] = (langMap[repo.language] ?? 0) + 1;
    }
  }
  const totalLangRepos = Object.values(langMap).reduce((a, b) => a + b, 0);
  const topLanguages = Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

  // Contributions are optional — degrade gracefully if this third-party API is down
  let totalContributions = 544;
  try {
    const contribRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
      { next: { revalidate: 3600 } },
    );
    if (contribRes.ok) {
      const rawContrib: unknown = await contribRes.json();
      const contribParsed = contributionsSchema.safeParse(rawContrib);
      if (contribParsed.success) {
        totalContributions = contribParsed.data.total?.lastYear ?? 544;
      }
      // schema mismatch is non-fatal — keep default
    }
  } catch {
    // non-fatal: keep default
  }

  return NextResponse.json({
    publicRepos: repos.length,
    totalStars,
    totalContributions,
    topLanguages,
    totalLangRepos,
  });
}
