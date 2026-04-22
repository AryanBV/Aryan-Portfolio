"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  stagger?: boolean;
}

// IntersectionObserver-based one-shot reveal. Under prefers-reduced-motion we
// skip the observer entirely and paint visible on mount — no layout delay, no
// lingering invisible content if the IO API misses an edge case.
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [scrolledInto, setScrolledInto] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setScrolledInto(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "-5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [prefersReducedMotion]);

  // Reduced-motion → always visible. Otherwise, track IO state.
  const visible = prefersReducedMotion || scrolledInto;
  const base = stagger ? "reveal-stagger" : "reveal";
  const classes = `${base}${visible ? " is-visible" : ""}${className ? " " + className : ""}`;

  return (
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  );
}
