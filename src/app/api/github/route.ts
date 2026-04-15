import { NextResponse } from "next/server";
import { safeFetch } from "@/lib/safe-fetch";
import { reposSchema, contributionsSchema } from "@/lib/github-schema";

const USERNAME = "AryanBV";
const GITHUB_API = "https://api.github.com";

type LangMap = Record<string, number>;

export async function GET() {
  // Repos are required — if this fails, return 503 (no useful data to show)
  const reposResult = await safeFetch(
    `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&type=public`,
    reposSchema,
    {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    },
  );

  if (!reposResult.ok) {
    const status = reposResult.error === "schema" ? 502 : 503;
    const error =
      reposResult.error === "schema"
        ? "GitHub API response shape unexpected"
        : "GitHub API unavailable";
    return NextResponse.json({ error }, { status });
  }
  const repos = reposResult.data;

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

  // Contributions are optional — return null when the third-party proxy is
  // unavailable. Never fabricate a number: the client renders '—' for null.
  let totalContributions: number | null = null;
  const contribResult = await safeFetch(
    `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
    contributionsSchema,
    { next: { revalidate: 3600 } },
  );
  if (contribResult.ok) {
    totalContributions = contribResult.data.total?.lastYear ?? null;
  }

  return NextResponse.json(
    {
      publicRepos: repos.length,
      totalStars,
      totalContributions,
      topLanguages,
      totalLangRepos,
      fetchedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
      },
    },
  );
}
