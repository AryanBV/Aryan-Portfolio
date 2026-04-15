"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { safeFetch } from "@/lib/safe-fetch";
import { githubResponseSchema, type GitHubResponse } from "@/lib/github-schema";

const EASING = [0.22, 1, 0.36, 1] as const;

function formatRelativeTime(iso: string): string {
  const diffSec = Math.max(
    0,
    Math.floor((Date.now() - new Date(iso).getTime()) / 1000),
  );
  if (diffSec < 60) return "updated just now";
  if (diffSec < 3600) {
    const mins = Math.floor(diffSec / 60);
    return `updated ${mins} minute${mins === 1 ? "" : "s"} ago`;
  }
  if (diffSec < 86400) {
    const hours = Math.floor(diffSec / 3600);
    return `updated ${hours} hour${hours === 1 ? "" : "s"} ago`;
  }
  const days = Math.floor(diffSec / 86400);
  return `updated ${days} day${days === 1 ? "" : "s"} ago`;
}

function AnimatedNumber({ value, inView }: { value: number; inView: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1.6, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, count, value, prefersReducedMotion]);

  return <motion.span>{rounded}</motion.span>;
}

export default function CodeStats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const [data, setData] = useState<GitHubResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    safeFetch("/api/github", githubResponseSchema, {
      signal: controller.signal,
    }).then((result) => {
      if (!result.ok) {
        // External unmount abort — silently ignore so we don't flash an error
        if (result.error === "network" && result.detail === "aborted") return;
        setError(true);
        setLoading(false);
        return;
      }
      setData(result.data);
      setLoading(false);
    });
    return () => controller.abort();
  }, []);

  return (
    <section
      ref={ref}
      className="py-12 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-16"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: prefersReducedMotion ? 0 : 12 }
          }
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.5,
            ease: EASING,
          }}
          className="text-xs tracking-[0.2em] uppercase mb-6 md:mb-10"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          GitHub Activity
        </motion.p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="min-h-[180px] animate-pulse"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                }}
              />
            ))}
          </div>
        ) : error ? (
          <p
            className="text-sm"
            style={{
              color: "var(--text-muted)",
            }}
          >
            Could not load GitHub data.
          </p>
        ) : data ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={
                inView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }
              }
              transition={{
                duration: prefersReducedMotion ? 0.3 : 0.6,
                ease: EASING,
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Repos + Stars */}
              <div
                className="p-6 flex flex-col gap-4"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex flex-col gap-1">
                  <p
                    className="text-3xl font-bold"
                    style={{
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <AnimatedNumber value={data.publicRepos} inView={inView} />
                  </p>
                  <p
                    className="text-xs uppercase tracking-widest"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    Public Repos
                  </p>
                </div>
                <div
                  className="flex flex-col gap-1"
                  style={{
                    borderTop: "1px solid var(--border)",
                    paddingTop: "1rem",
                  }}
                >
                  <p
                    className="text-3xl font-bold"
                    style={{
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <AnimatedNumber value={data.totalStars} inView={inView} />
                  </p>
                  <p
                    className="text-xs uppercase tracking-widest"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    Total Stars
                  </p>
                </div>
              </div>

              {/* Contributions */}
              <div
                className="p-6 flex flex-col gap-2"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <p
                  className="text-3xl font-bold"
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {data.totalContributions !== null ? (
                    <>
                      <AnimatedNumber
                        value={data.totalContributions}
                        inView={inView}
                      />
                      <span style={{ color: "var(--accent)" }}>+</span>
                    </>
                  ) : (
                    <span style={{ color: "var(--text-muted)" }}>—</span>
                  )}
                </p>
                <p
                  className="text-xs uppercase tracking-widest"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Contributions (last year)
                </p>
              </div>

              {/* Top Languages */}
              <div
                className="p-6 flex flex-col gap-3"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <p
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Top Languages
                </p>
                {data.topLanguages.map(({ name, count }, i) => {
                  const pct =
                    data.totalLangRepos > 0
                      ? (count / data.totalLangRepos) * 100
                      : 0;
                  return (
                    <div key={name} className="flex flex-col gap-1">
                      <div className="flex justify-between">
                        <span
                          className="text-xs"
                          style={{
                            color: "var(--text-secondary)",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {name}
                        </span>
                        <span
                          className="text-xs"
                          style={{
                            color: "var(--text-muted)",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {Math.round(pct)}%
                        </span>
                      </div>
                      <div
                        className="w-full h-0.5"
                        style={{ backgroundColor: "var(--border)" }}
                      >
                        <motion.div
                          className="h-0.5"
                          style={{ backgroundColor: "var(--accent)" }}
                          initial={{
                            width: prefersReducedMotion ? `${pct}%` : 0,
                          }}
                          animate={
                            inView
                              ? { width: `${pct}%` }
                              : {
                                  width: prefersReducedMotion ? `${pct}%` : 0,
                                }
                          }
                          transition={{
                            duration: prefersReducedMotion ? 0 : 1,
                            delay: prefersReducedMotion ? 0 : 0.3 + i * 0.08,
                            ease: EASING,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
            <p
              className="mt-6 text-xs"
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {formatRelativeTime(data.fetchedAt)}
            </p>
          </>
        ) : null}
      </div>
    </section>
  );
}
