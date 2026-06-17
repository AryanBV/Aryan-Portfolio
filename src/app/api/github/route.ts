import { NextResponse } from "next/server";
import { safeFetch } from "@/lib/safe-fetch";
import {
  reposSchema,
  contributionsSchema,
  type ContributionDay,
} from "@/lib/github-schema";

const USERNAME = "AryanBV";
const GITHUB_API = "https://api.github.com";

type LangMap = Record<string, number>;

// Opt into ISR at the segment level. Route handlers are dynamic by default
// in Next 15+, which means explicit s-maxage / stale-while-revalidate in
// NextResponse.json headers get stripped (Next drops caching directives
// from dynamic routes). This export tells Next the response is cacheable
// for 1 hour, and Next auto-generates the correct Cache-Control header.
// The literal 3600 must match `next: { revalidate: 3600 }` on the fetch
// below — the lower of the two values wins per Next's fetch docs.
export const revalidate = 3600;

export async function GET() {
  // Repos (required) and contributions (optional, third-party proxy) have no
  // data dependency, so fetch them concurrently — route latency becomes
  // max(repos, contributions) instead of the sum.
  const [reposResult, contribResult] = await Promise.all([
    safeFetch(
      `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&type=public&sort=updated`,
      reposSchema,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      },
    ),
    safeFetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
      contributionsSchema,
      { next: { revalidate: 3600 } },
    ),
  ]);

  // Repos are required — if this fails, return 503 (no useful data to show).
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
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

  // Top repos — sort by stars then most-recent push, take 3.
  const topRepos = [...repos]
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count ||
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    )
    .slice(0, 3)
    .map((r) => ({
      name: r.name,
      description: r.description ?? null,
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language,
      url: r.html_url,
      pushedAt: r.pushed_at,
    }));

  // Contributions are optional — return null when the third-party proxy is
  // unavailable. Never fabricate a number: the client renders '—' for null.
  let contributions: {
    total: number | null;
    days: ContributionDay[];
  } | null = null;
  if (contribResult.ok) {
    contributions = {
      total: contribResult.data.total?.lastYear ?? null,
      days: contribResult.data.contributions ?? [],
    };
  }

  return NextResponse.json({
    publicRepos: repos.length,
    totalStars,
    totalForks,
    contributions,
    topLanguages,
    totalLangRepos,
    topRepos,
    fetchedAt: new Date().toISOString(),
  });
}
