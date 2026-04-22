"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

interface SpotCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

// Card with amber radial-spotlight that follows the mouse. The spotlight is
// pure CSS (radial-gradient using --mx/--my custom properties); React only
// sets the CSS variables on mousemove — no re-render, no motion lib cost.
export default function SpotCard({
  children,
  className = "",
  style,
}: SpotCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      className={`card-v2 ${className}`}
      style={style}
      onMouseMove={onMove}
    >
      {children}
    </div>
  );
}
