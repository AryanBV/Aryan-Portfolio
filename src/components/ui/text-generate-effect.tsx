"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  highlightWord?: string;
}

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
  highlightWord,
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate();
  const prefersReducedMotion = useReducedMotion();
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (prefersReducedMotion) return;

    animate(
      "span.word",
      { opacity: 1, filter: filter ? "blur(0px)" : "none" },
      { duration: duration * 0.4, delay: stagger(duration * 0.4) },
    );
  }, [animate, duration, filter, prefersReducedMotion]);

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div
          className="text-2xl leading-snug tracking-tight sm:text-3xl md:text-4xl lg:text-5xl text-[var(--text-primary)]"
          ref={scope}
        >
          {wordsArray.map((word, idx) => {
            const isHighlighted =
              highlightWord &&
              word.toLowerCase() === highlightWord.toLowerCase();

            return (
              <motion.span
                key={`${word}-${idx}`}
                className={cn(
                  "word inline-block mr-1.5",
                  prefersReducedMotion ? "opacity-100" : "opacity-0",
                )}
                style={{
                  filter:
                    filter && !prefersReducedMotion ? "blur(10px)" : "none",
                }}
              >
                {isHighlighted ? (
                  <span className="text-[var(--accent)]">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
