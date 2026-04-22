"use client";

import { useEffect, useState } from "react";

// Floating amber pill button. Appears after scrolling past ~first-section
// height (600px). Click → smooth scroll to top. Respects reduced-motion.
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
        })
      }
      style={{
        position: "fixed",
        bottom: "clamp(16px, 3vw, 28px)",
        right: "clamp(16px, 3vw, 28px)",
        width: 44,
        height: 44,
        borderRadius: 999,
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-hover)",
        color: "var(--accent)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 40,
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(12px) scale(0.9)",
        pointerEvents: visible ? "auto" : "none",
        transition:
          "opacity 300ms var(--ease-emph), transform 300ms var(--ease-emph), background 200ms, box-shadow 200ms",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.5), 0 0 0 4px rgba(245,166,35,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--accent)";
        e.currentTarget.style.color = "var(--bg-base)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--bg-elevated)";
        e.currentTarget.style.color = "var(--accent)";
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
