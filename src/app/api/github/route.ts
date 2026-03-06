import { NextResponse } from "next/server";

const USERNAME = "AryanBV";
const GITHUB_API = "https://api.github.com";

type LangMap = Record<string, number>;

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

  const repos: Array<{ language: string | null; stargazers_count: number }> =
    await reposRes.json();

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
      const contribData = await contribRes.json();
      totalContributions = contribData?.total?.lastYear ?? 544;
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
