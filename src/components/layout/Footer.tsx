export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 2,
        borderTop: "1px solid var(--divider)",
        background: "var(--bg-base)",
      }}
    >
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ paddingTop: 20, paddingBottom: 20, flexWrap: "wrap" }}
      >
        <p
          style={{
            fontSize: 11,
            color: "var(--text-muted)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            margin: 0,
            fontFamily: "var(--font-mono)",
          }}
        >
          © {new Date().getFullYear()} Aryan B V
        </p>
        <a
          href="#hero"
          style={{
            fontSize: 11,
            color: "var(--text-muted)",
            textDecoration: "none",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
          }}
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
