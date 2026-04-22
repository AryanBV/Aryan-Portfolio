// Infinite horizontal tech strip. Duplicated content + CSS translateX(-50%)
// keyframe gives a seamless loop. `aria-hidden` — this is decorative.

const ITEMS = [
  "Next.js 16",
  "TypeScript 5",
  "React 19",
  "Tailwind v4",
  "Framer Motion",
  "Vercel",
  "Supabase",
  "Claude API",
  "MCP SDK",
  "Python 3.12",
  "pytest",
  "EmailJS",
];

export default function Marquee() {
  return (
    <div
      aria-hidden="true"
      style={{
        padding: "32px 0",
        borderTop: "1px solid var(--divider)",
        borderBottom: "1px solid var(--divider)",
        background: "var(--bg-base)",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div className="marquee-wrap">
        <div className="marquee">
          {[...ITEMS, ...ITEMS].map((s, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-dot" />
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
