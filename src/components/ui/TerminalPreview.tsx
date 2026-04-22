import { Terminal } from "@/components/ui/Icons";

interface TerminalPreviewProps {
  lines: string[];
  title?: string;
}

// Mac-style terminal window with traffic-light dots and mono-font lines.
// Lines starting with $ / > / # are treated as commands (lighter); others
// are output (muted). Lines containing ✓ render as success green.
function lineColor(line: string): string {
  if (!line.trim()) return "var(--text-muted)";
  if (/^(\$|>|#)/.test(line.trim())) return "var(--text-secondary)";
  if (line.includes("✓") || line.startsWith("True")) return "var(--success)";
  return "var(--text-muted)";
}

export default function TerminalPreview({
  lines,
  title = "~/projects",
}: TerminalPreviewProps) {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        background: "var(--bg-base)",
        border: "1px solid var(--divider)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 16px",
          background: "var(--bg-elevated)",
          borderBottom: "1px solid var(--divider)",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              aria-hidden="true"
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "var(--text-muted)",
                opacity: 0.35,
              }}
            />
          ))}
        </div>
        <span
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 11,
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {title}
        </span>
        <Terminal size={12} />
      </div>
      <div
        style={{
          padding: "16px 20px",
          fontSize: 12,
          lineHeight: 1.7,
          minHeight: 220,
          fontFamily: "var(--font-mono)",
          overflowX: "auto",
        }}
      >
        {lines.map((l, i) => (
          <div
            key={i}
            style={{
              color: lineColor(l),
              minHeight: 20,
              whiteSpace: "pre",
            }}
          >
            {l || "\u00A0"}
          </div>
        ))}
      </div>
    </div>
  );
}
