"use client";

import { useMemo, useState } from "react";

export interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
  level: number; // 0–4
}

interface HeatmapProps {
  days: ContributionDay[] | null | undefined;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CELL = 11;
const GAP = 3;
const COLS = 53;
const ROWS = 7;

function levelColor(lvl: number): string {
  if (lvl <= 0) return "rgba(255,255,255,0.04)";
  if (lvl === 1) return "rgba(245,166,35,0.25)";
  if (lvl === 2) return "rgba(245,166,35,0.5)";
  if (lvl === 3) return "rgba(245,166,35,0.75)";
  return "rgba(245,166,35,1)";
}

type Cell = (ContributionDay & { month: number }) | null;

// 53-week × 7-day GitHub-style contribution grid. Horizontally scrollable on
// narrow viewports so it never breaks layout.
export default function Heatmap({ days }: HeatmapProps) {
  const { weeks, monthLabels } = useMemo(() => {
    if (!days || days.length === 0) {
      return {
        weeks: [] as Cell[][],
        monthLabels: [] as { w: number; month: number }[],
      };
    }
    const byDate = new Map(days.map((d) => [d.date, d]));
    const today = new Date();
    const end = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const dayOfWeek = end.getDay();
    const firstSunday = new Date(end);
    firstSunday.setDate(end.getDate() - dayOfWeek - 52 * 7);

    const weeks: Cell[][] = [];
    const monthLabels: { w: number; month: number }[] = [];
    let lastMonth = -1;

    for (let w = 0; w < COLS; w++) {
      const week: Cell[] = [];
      for (let d = 0; d < ROWS; d++) {
        const day = new Date(firstSunday);
        day.setDate(firstSunday.getDate() + w * 7 + d);
        if (day > end) {
          week.push(null);
          continue;
        }
        const iso = day.toISOString().slice(0, 10);
        const rec = byDate.get(iso);
        week.push({
          date: iso,
          count: rec?.count ?? 0,
          level: rec?.level ?? 0,
          month: day.getMonth(),
        });
      }
      const monthCell = week[0] ?? week[3];
      if (monthCell && monthCell.month !== lastMonth) {
        monthLabels.push({ w, month: monthCell.month });
        lastMonth = monthCell.month;
      }
      weeks.push(week);
    }
    return { weeks, monthLabels };
  }, [days]);

  const [hover, setHover] = useState<
    (ContributionDay & { x: number; y: number }) | null
  >(null);

  if (!days || days.length === 0) {
    return (
      <div
        style={{
          height: ROWS * (CELL + GAP) + 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-muted)",
          fontSize: 13,
        }}
      >
        Contributions unavailable
      </div>
    );
  }

  const W = COLS * (CELL + GAP);
  const H = ROWS * (CELL + GAP);

  return (
    <div
      style={{
        position: "relative",
        paddingTop: 16,
        overflowX: "auto",
      }}
    >
      <div style={{ minWidth: W + 32 }}>
        {/* month labels */}
        <div style={{ position: "relative", height: 14, marginLeft: 24 }}>
          {monthLabels.map(({ w, month }) => (
            <span
              key={w}
              style={{
                position: "absolute",
                left: w * (CELL + GAP),
                fontSize: 10,
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                fontFamily: "var(--font-mono)",
              }}
            >
              {MONTHS[month]}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: GAP,
              width: 20,
            }}
            aria-hidden="true"
          >
            {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
              <span
                key={i}
                style={{
                  height: CELL,
                  fontSize: 9,
                  color: "var(--text-muted)",
                  lineHeight: `${CELL}px`,
                  letterSpacing: "0.1em",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {d}
              </span>
            ))}
          </div>

          <svg width={W} height={H} style={{ display: "block" }}>
            {weeks.map((week, wi) => (
              <g key={wi} transform={`translate(${wi * (CELL + GAP)}, 0)`}>
                {week.map(
                  (cell, di) =>
                    cell && (
                      <rect
                        key={di}
                        x={0}
                        y={di * (CELL + GAP)}
                        width={CELL}
                        height={CELL}
                        rx={2}
                        fill={levelColor(cell.level)}
                        style={{ cursor: "pointer", transition: "fill 150ms" }}
                        onMouseEnter={() =>
                          setHover({
                            date: cell.date,
                            count: cell.count,
                            level: cell.level,
                            x: wi * (CELL + GAP),
                            y: di * (CELL + GAP),
                          })
                        }
                        onMouseLeave={() => setHover(null)}
                      />
                    ),
                )}
              </g>
            ))}
          </svg>
        </div>

        {hover && (
          <div
            style={{
              position: "absolute",
              left: hover.x + 52,
              top: hover.y + 30,
              background: "var(--bg-elevated)",
              border: "1px solid var(--divider)",
              padding: "6px 10px",
              borderRadius: 6,
              fontSize: 11,
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 2,
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <span style={{ color: "var(--accent)" }}>{hover.count}</span>{" "}
            <span style={{ color: "var(--text-secondary)" }}>
              {hover.count === 1 ? "contribution" : "contributions"}
            </span>{" "}
            <span style={{ color: "var(--text-muted)" }}>
              on{" "}
              {new Date(hover.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            justifyContent: "flex-end",
            marginTop: 12,
            fontSize: 10,
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <span style={{ letterSpacing: "0.1em" }}>LESS</span>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <span
              key={lvl}
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: levelColor(lvl),
              }}
            />
          ))}
          <span style={{ letterSpacing: "0.1em" }}>MORE</span>
        </div>
      </div>
    </div>
  );
}
