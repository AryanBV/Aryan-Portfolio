import { cn } from "@/lib/utils";

interface TerminalTranscriptProps {
  lines: string[];
  className?: string;
}

// Render one terminal line with prompt-prefix coloring.
// Lines starting with "$ " or ">>> " / "... " or "> " get amber prompts;
// "[mcp]" lines are muted system output; "✓ " lines use the live-status green.
function TerminalLine({ line }: { line: string }) {
  if (line === "") {
    return <div aria-hidden="true">&nbsp;</div>;
  }

  if (line.startsWith("$ ")) {
    return (
      <div>
        <span style={{ color: "var(--accent)" }}>$</span>
        <span style={{ color: "var(--text-secondary)" }}>{line.slice(1)}</span>
      </div>
    );
  }

  if (line.startsWith(">>> ") || line.startsWith("... ")) {
    return (
      <div>
        <span style={{ color: "var(--accent)" }}>{line.slice(0, 3)}</span>
        <span style={{ color: "var(--text-secondary)" }}>{line.slice(3)}</span>
      </div>
    );
  }

  if (line.startsWith("> ")) {
    return (
      <div>
        <span style={{ color: "var(--accent)" }}>{">"}</span>
        <span style={{ color: "var(--text-secondary)" }}>{line.slice(1)}</span>
      </div>
    );
  }

  if (line.startsWith("[mcp]")) {
    return (
      <div style={{ color: "var(--text-muted)", opacity: 0.75 }}>{line}</div>
    );
  }

  if (line.startsWith("✓ ")) {
    return (
      <div>
        <span style={{ color: "var(--status-live)" }}>✓</span>
        <span style={{ color: "var(--text-secondary)" }}>{line.slice(1)}</span>
      </div>
    );
  }

  return <div style={{ color: "var(--text-secondary)" }}>{line}</div>;
}

export function TerminalTranscript({
  lines,
  className,
}: TerminalTranscriptProps) {
  return (
    <div
      className={cn(
        "aspect-[16/10] w-full overflow-hidden p-3 sm:p-4",
        className,
      )}
      style={{
        backgroundColor: "var(--bg-base)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <div
        className="w-full h-full overflow-x-auto text-[11px] sm:text-xs leading-snug"
        style={{ whiteSpace: "pre" }}
      >
        {lines.map((line, i) => (
          <TerminalLine key={i} line={line} />
        ))}
      </div>
    </div>
  );
}
