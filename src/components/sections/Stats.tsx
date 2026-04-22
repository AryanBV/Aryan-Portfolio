"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SpotCard from "@/components/ui/SpotCard";
import CountUp from "@/components/ui/CountUp";
import Heatmap from "@/components/ui/Heatmap";
import MagneticLink from "@/components/ui/MagneticLink";
import {
  Code,
  Zap,
  Star,
  GitFork,
  Github,
  ArrowUpRight,
} from "@/components/ui/Icons";
import { safeFetch } from "@/lib/safe-fetch";
import { githubResponseSchema, type GitHubResponse } from "@/lib/github-schema";

// Language color map (GitHub's canonical palette for the top 5 languages we
// tend to hit). Fall back to muted-gray if a language shows up that we don't
// have a color for.
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "Jupyter Notebook": "#f37626",
  Shell: "#89e051",
  Java: "#b07219",
  Go: "#00add8",
  Rust: "#dea584",
};

function timeAgo(iso: string): string {
  const d = new Date(iso),
    now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 86400 * 30) return `${Math.floor(diff / 86400 / 7)}w ago`;
  return `${Math.floor(diff / 86400 / 30)}mo ago`;
}

interface StatTileProps {
  value: number | null | undefined;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  loading: boolean;
  noRightBorder?: boolean;
}

function StatTile({
  value,
  label,
  icon: Icon,
  loading,
  noRightBorder,
}: StatTileProps) {
  return (
    <div
      className="stat-tile"
      style={{
        padding: "20px 16px",
        borderRight: noRightBorder ? "none" : "1px solid var(--divider)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <Icon size={13} color="var(--accent)" />
        <span
          style={{
            fontSize: 10,
            color: "var(--text-muted)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
          }}
        >
          {label}
        </span>
      </div>
      <div
        style={{
          fontSize: "clamp(1.75rem, 4vw, 3rem)",
          fontWeight: 500,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "var(--text-primary)",
          fontFamily: "var(--font-mono)",
          minHeight: "1em",
        }}
      >
        {loading ? (
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: 64,
              height: "0.8em",
              borderRadius: 4,
              background:
                "linear-gradient(90deg, var(--bg-elevated) 0%, rgba(245,166,35,0.12) 50%, var(--bg-elevated) 100%)",
              backgroundSize: "200% 100%",
              animation: "statShimmer 1.4s ease-in-out infinite",
            }}
          />
        ) : value === null || value === undefined ? (
          <span style={{ color: "var(--text-muted)" }}>—</span>
        ) : (
          <CountUp end={value} />
        )}
      </div>
    </div>
  );
}

export default function Stats() {
  const [data, setData] = useState<GitHubResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await safeFetch("/api/github", githubResponseSchema);
      if (cancelled) return;
      if (res.ok) setData(res.data);
      else setError(true);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const langs = data?.topLanguages ?? [];
  const totalLangRepos = data?.totalLangRepos ?? 0;
  const topRepos = data?.topRepos ?? [];
  const contribDays = data?.contributions?.days ?? null;
  const contribTotal = data?.contributions?.total ?? null;

  return (
    <section
      id="stats"
      className="py-16 md:py-24 lg:py-32 relative z-[2] overflow-hidden"
    >
      {/* Ambient amber wash — ties visual language to Hero */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          right: "-15%",
          width: "50%",
          aspectRatio: "1",
          background:
            "radial-gradient(circle at center, rgba(245,166,35,0.07), transparent 55%)",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(40px)",
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-[1]">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 flex-wrap mb-12">
            <div>
              <div className="eyebrow-line">
                <span className="section-number">04</span>
                <span>Proof of work</span>
              </div>
              <h2
                style={{
                  fontSize: "var(--fluid-h2)",
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                  margin: "20px 0 0",
                }}
              >
                Shipping,{" "}
                <span style={{ color: "var(--text-muted)" }}>every week.</span>
              </h2>
            </div>
            <MagneticLink
              external
              href="https://github.com/AryanBV"
              style={{ fontSize: 13 }}
            >
              <Github size={14} /> @AryanBV{" "}
              <span className="arrow">
                <ArrowUpRight size={12} />
              </span>
            </MagneticLink>
          </div>
        </Reveal>

        {/* Top 4-tile strip */}
        <Reveal>
          <SpotCard
            className="stats-top-strip"
            style={{ padding: 0, overflow: "hidden", marginBottom: 16 }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 stats-tile-grid">
              <StatTile
                value={data?.publicRepos}
                label="Public repos"
                icon={Code}
                loading={loading}
              />
              <StatTile
                value={data?.totalStars}
                label="Total stars"
                icon={Star}
                loading={loading}
              />
              <StatTile
                value={data?.totalForks}
                label="Forks"
                icon={GitFork}
                loading={loading}
              />
              <StatTile
                value={contribTotal}
                label="Contrib · 1y"
                icon={Zap}
                loading={loading}
                noRightBorder
              />
            </div>
          </SpotCard>
        </Reveal>

        {/* Heatmap */}
        <Reveal>
          <SpotCard style={{ padding: "24px 24px", marginBottom: 16 }}>
            <div>
              <p
                style={{
                  fontSize: 10,
                  color: "var(--accent)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  margin: 0,
                  fontFamily: "var(--font-mono)",
                }}
              >
                Contribution graph
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  margin: "6px 0 0",
                }}
              >
                {loading ? (
                  "Fetching contributions…"
                ) : contribTotal !== null && contribTotal !== undefined ? (
                  <>
                    An average of{" "}
                    <strong
                      style={{
                        color: "var(--text-primary)",
                        fontWeight: 500,
                      }}
                    >
                      {Math.round(contribTotal / 52)}
                    </strong>{" "}
                    contributions per week over the last year.
                  </>
                ) : (
                  "Contribution data unavailable."
                )}
              </p>
            </div>
            <Heatmap days={contribDays} />
          </SpotCard>
        </Reveal>

        {/* Bottom row: languages + top repos */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-4">
          <Reveal>
            <SpotCard style={{ padding: "24px 24px", height: "100%" }}>
              <p
                style={{
                  fontSize: 10,
                  color: "var(--accent)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  margin: "0 0 20px",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Language breakdown
              </p>
              {loading && (
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    margin: 0,
                  }}
                >
                  Fetching…
                </p>
              )}
              {!loading && langs.length > 0 && totalLangRepos > 0 && (
                <>
                  <div
                    style={{
                      display: "flex",
                      height: 8,
                      borderRadius: 4,
                      overflow: "hidden",
                      marginBottom: 20,
                      background: "var(--divider)",
                    }}
                  >
                    {langs.map((l) => {
                      const pct = Math.round((l.count / totalLangRepos) * 100);
                      return (
                        <div
                          key={l.name}
                          style={{
                            width: `${pct}%`,
                            background:
                              LANG_COLORS[l.name] ?? "var(--text-muted)",
                            transition: "width 600ms",
                          }}
                          aria-label={`${l.name} ${pct}%`}
                        />
                      );
                    })}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px 24px",
                    }}
                  >
                    {langs.map((l) => {
                      const pct = Math.round((l.count / totalLangRepos) * 100);
                      return (
                        <div
                          key={l.name}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            fontSize: 13,
                          }}
                        >
                          <span
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              background:
                                LANG_COLORS[l.name] ?? "var(--text-muted)",
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{ flex: 1, color: "var(--text-primary)" }}
                          >
                            {l.name}
                          </span>
                          <span
                            style={{
                              color: "var(--text-muted)",
                              fontSize: 11,
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            {pct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              {!loading && langs.length === 0 && (
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    margin: 0,
                  }}
                >
                  Unavailable
                </p>
              )}
            </SpotCard>
          </Reveal>

          <Reveal>
            <SpotCard style={{ padding: "24px 24px", height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginBottom: 16,
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    color: "var(--accent)",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    margin: 0,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Top repositories
                </p>
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--text-muted)",
                    letterSpacing: "0.15em",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  BY STARS + ACTIVITY
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {loading && (
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--text-muted)",
                      margin: 0,
                    }}
                  >
                    Fetching…
                  </p>
                )}
                {topRepos.map((r) => (
                  <MagneticLink
                    key={r.name}
                    external
                    href={r.url}
                    className="repo-row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "14px 0",
                      borderBottom: "1px solid var(--divider)",
                      color: "inherit",
                      transition: "padding 200ms",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: 4,
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 14,
                            color: "var(--text-primary)",
                            fontWeight: 500,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {r.name}
                        </span>
                        {r.language && (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 5,
                              fontSize: 11,
                              color: "var(--text-muted)",
                            }}
                          >
                            <span
                              style={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                background:
                                  LANG_COLORS[r.language] ??
                                  "var(--text-muted)",
                              }}
                            />
                            {r.language}
                          </span>
                        )}
                      </div>
                      {r.description && (
                        <p
                          style={{
                            fontSize: 12,
                            color: "var(--text-muted)",
                            margin: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.description}
                        </p>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        flexShrink: 0,
                        fontSize: 11,
                        color: "var(--text-secondary)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Star size={11} /> {r.stars}
                      </span>
                      <span
                        style={{
                          color: "var(--text-muted)",
                          minWidth: 52,
                          textAlign: "right",
                        }}
                      >
                        {timeAgo(r.pushedAt)}
                      </span>
                      <ArrowUpRight size={12} color="var(--text-muted)" />
                    </div>
                  </MagneticLink>
                ))}
              </div>
            </SpotCard>
          </Reveal>
        </div>

        <p
          style={{
            fontSize: 10,
            color: "var(--text-muted)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginTop: 16,
            textAlign: "right",
            opacity: 0.6,
            fontFamily: "var(--font-mono)",
          }}
        >
          {error
            ? "GitHub API unavailable"
            : loading
              ? "Fetching…"
              : `Last synced · ${new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}`}
        </p>

        <style>{`
          .repo-row:hover { padding-left: 12px !important; background: linear-gradient(90deg, var(--accent-subtle) 0%, transparent 40%); }
          @keyframes statShimmer {
            0%   { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="statShimmer"] { animation: none !important; }
          }
          @media (max-width: 900px) {
            .stats-tile-grid > :nth-child(-n+2) { border-bottom: 1px solid var(--divider); }
            .stats-tile-grid > :nth-child(even) { border-right: none !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
