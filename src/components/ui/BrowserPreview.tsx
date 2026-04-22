import Image from "next/image";

interface BrowserPreviewProps {
  image?: string;
  url?: string;
  title: string;
}

// Mac-style browser window with traffic-light dots and a URL pill, housing a
// 16:10 image area. Missing image → fallback block with project title.
export default function BrowserPreview({
  image,
  url,
  title,
}: BrowserPreviewProps) {
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
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 14px",
              background: "var(--bg-base)",
              borderRadius: 999,
              border: "1px solid var(--divider)",
              fontSize: 11,
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--success)",
                flexShrink: 0,
              }}
            />
            {url ?? title.toLowerCase().replace(/\s+/g, "-")}
          </div>
        </div>
      </div>
      <div
        style={{
          aspectRatio: "16/10",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-muted)",
              background:
                "linear-gradient(135deg, var(--bg-elevated), var(--bg-surface))",
              fontSize: 14,
              fontFamily: "var(--font-mono)",
            }}
          >
            {title}
          </div>
        )}
      </div>
    </div>
  );
}
