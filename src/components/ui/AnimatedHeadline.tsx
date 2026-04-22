"use client";

import { useReducedMotion } from "framer-motion";

export interface HeadlineChunk {
  text: string;
  accent?: boolean;
  italic?: boolean;
}

interface AnimatedHeadlineProps {
  lines: HeadlineChunk[][];
}

// Word-by-word rise-and-reveal headline. Each chunk staggers by 80ms within a
// line, each line by 400ms. Accent chunks get the amber color + underline bar.
// Reduced-motion paints the text with zero delay and no transform.
export default function AnimatedHeadline({ lines }: AnimatedHeadlineProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <h1
      style={{
        fontSize: "var(--fluid-h1)",
        fontWeight: 700,
        lineHeight: 0.98,
        letterSpacing: "-0.035em",
        margin: 0,
        color: "var(--text-primary)",
      }}
    >
      {lines.map((line, li) => (
        <span key={li} style={{ display: "block" }}>
          {line.map((chunk, ci) => {
            const delay = prefersReducedMotion ? 0 : li * 400 + ci * 80;
            const animation = prefersReducedMotion
              ? "none"
              : `heroRise 900ms var(--ease-emph) ${delay}ms backwards`;
            const underlineAnimation = prefersReducedMotion
              ? "none"
              : `heroUnderline 700ms var(--ease-emph) ${delay + 600}ms backwards`;
            return (
              <span
                key={ci}
                style={{
                  display: "inline-block",
                  verticalAlign: "top",
                  marginRight: "0.2em",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    animation,
                    color: chunk.accent ? "var(--accent)" : "inherit",
                    fontStyle: chunk.italic ? "italic" : "normal",
                    fontWeight: chunk.italic ? 400 : "inherit",
                    position: "relative",
                  }}
                >
                  {chunk.text}
                  {chunk.accent && (
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: 0,
                        bottom: "0.08em",
                        height: "0.08em",
                        width: "100%",
                        background: "var(--accent)",
                        opacity: 0.25,
                        animation: underlineAnimation,
                        transformOrigin: "left",
                      }}
                    />
                  )}
                </span>
              </span>
            );
          })}
        </span>
      ))}
      <style>{`
        @keyframes heroRise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroUnderline { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      `}</style>
    </h1>
  );
}
