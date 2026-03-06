import { NextResponse } from "next/server";

const USERNAME = "AryanBV";
const GITHUB_API = "https://api.github.com";

type LangMap = Record<string, number>;

export async function GET() {
  try {
    const reposRes = await fetch(
      `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&type=public`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      },
    );

    if (!reposRes.ok)
      throw new Error(`GitHub repos fetch failed: ${reposRes.status}`);
    const repos: Array<{ language: string | null; stargazers_count: number }> =
      await reposRes.json();

    const langMap: LangMap = {};
    for (const repo of repos) {
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] ?? 0) + 1;
      }
    }
    const topLanguages = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    const contribRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
      { next: { revalidate: 3600 } },
    );
    const contribData = contribRes.ok ? await contribRes.json() : null;
    const totalContributions: number = contribData?.total?.lastYear ?? 544;

    return NextResponse.json({
      publicRepos: repos.length,
      totalContributions,
      topLanguages,
    });
  } catch (err) {
    console.error("[/api/github]", err);
    return NextResponse.json({
      publicRepos: 20,
      totalContributions: 544,
      topLanguages: [
        { name: "TypeScript", count: 8 },
        { name: "JavaScript", count: 5 },
        { name: "Python", count: 3 },
        { name: "CSS", count: 2 },
        { name: "HTML", count: 1 },
      ],
    });
  }
}
