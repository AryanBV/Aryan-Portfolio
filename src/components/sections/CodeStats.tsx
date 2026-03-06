"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

type GitHubData = {
  publicRepos: number;
  totalStars: number;
  totalContributions: number;
  topLanguages: Array<{ name: string; count: number }>;
};

const EASING = [0.22, 1, 0.36, 1] as const;

function AnimatedNumber({ value, inView }: { value: number; inView: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 1.6, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, count, value]);

  return <motion.span>{rounded}</motion.span>;
}

export default function CodeStats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => {
        if (!r.ok) throw new Error(`status ${r.status}`);
        return r.json();
      })
      .then((d: GitHubData) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const maxLangCount = data
    ? Math.max(...data.topLanguages.map((l) => l.count))
    : 1;

  return (
    <section
      ref={ref}
      className="py-16 px-6"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: EASING }}
          className="text-xs tracking-[0.2em] uppercase mb-10"
          style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
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
              fontFamily: "var(--font-mono)",
            }}
          >
            Could not load GitHub data.
          </p>
        ) : data ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: EASING }}
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
                <AnimatedNumber
                  value={data.totalContributions}
                  inView={inView}
                />
                <span style={{ color: "var(--accent)" }}>+</span>
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
              {data.topLanguages.map(({ name, count }) => (
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
                      {Math.round((count / maxLangCount) * 100)}%
                    </span>
                  </div>
                  <div
                    className="w-full h-0.5"
                    style={{ backgroundColor: "var(--border)" }}
                  >
                    <motion.div
                      className="h-0.5"
                      style={{ backgroundColor: "var(--accent)" }}
                      initial={{ width: 0 }}
                      animate={
                        inView
                          ? { width: `${(count / maxLangCount) * 100}%` }
                          : { width: 0 }
                      }
                      transition={{ duration: 1, delay: 0.3, ease: EASING }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
