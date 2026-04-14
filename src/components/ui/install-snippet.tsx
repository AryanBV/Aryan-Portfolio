"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import type { ProjectInstall } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface InstallSnippetProps {
  install: ProjectInstall[];
  className?: string;
}

export function InstallSnippet({ install, className }: InstallSnippetProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async (command: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedIdx(idx);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopiedIdx(null), 2000);
    } catch (err) {
      console.error("Failed to copy install command:", err);
    }
  };

  if (install.length === 0) return null;

  return (
    <div className={cn("space-y-3", className)}>
      {install.map((item, idx) => {
        const isCopied = copiedIdx === idx;
        return (
          <div
            key={item.label}
            className="rounded-lg overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            {/* Title bar — label + copy button */}
            <div
              className="flex items-center justify-between gap-3 px-4 py-2"
              style={{ backgroundColor: "var(--bg-elevated)" }}
            >
              <span
                className="text-xs"
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {item.label}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(item.command, idx)}
                aria-label={`Copy ${item.label} install command`}
                className="inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-elevated)]"
                style={{
                  color: isCopied ? "var(--success)" : "var(--text-secondary)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {isCopied ? (
                  <FiCheck aria-hidden className="w-3.5 h-3.5" />
                ) : (
                  <FiCopy aria-hidden className="w-3.5 h-3.5" />
                )}
                <span>{isCopied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Command row */}
            <div
              className="overflow-x-auto"
              style={{ backgroundColor: "var(--bg-surface)" }}
            >
              <code
                className="block px-4 py-3 text-xs sm:text-sm whitespace-nowrap"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {item.command}
              </code>
            </div>

            {/* Screen-reader-only live region for copy feedback */}
            <span aria-live="polite" className="sr-only">
              {isCopied ? `${item.label} install command copied` : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}
