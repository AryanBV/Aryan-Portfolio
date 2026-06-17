import type { Project } from "@/lib/projects";

// Shared status pill used by both the homepage project cards and the
// case-study page. Presentational only (no hooks), so it renders in both
// server and client components.
export default function StatusBadge({ status }: { status: Project["status"] }) {
  const isLive = status === "Live";
  return (
    <span className={`status-chip-v2 ${isLive ? "live" : "other"}`}>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: isLive ? "var(--status-live)" : "var(--text-muted)",
          boxShadow: isLive ? "0 0 8px var(--status-live)" : "none",
        }}
      />
      {status}
    </span>
  );
}
