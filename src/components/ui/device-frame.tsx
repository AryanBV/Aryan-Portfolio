import { cn } from "@/lib/utils";

interface DeviceFrameProps {
  children: React.ReactNode;
  url?: string;
  className?: string;
}

export function DeviceFrame({ children, url, className }: DeviceFrameProps) {
  return (
    <div
      className={cn("rounded-lg overflow-hidden w-full", className)}
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ backgroundColor: "var(--bg-elevated)" }}
      >
        <div className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--text-muted)", opacity: 0.3 }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--text-muted)", opacity: 0.3 }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--text-muted)", opacity: 0.3 }}
          />
        </div>
        {url && (
          <div
            className="flex-1 text-center text-xs truncate"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {url}
          </div>
        )}
      </div>
      {/* Content area */}
      <div className="w-full">{children}</div>
    </div>
  );
}
