import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aryan B V — Full-Stack Developer & AI/ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#0a0a0a",
        fontFamily: "sans-serif",
      }}
    >
      {/* Accent line */}
      <div
        style={{
          width: "48px",
          height: "2px",
          backgroundColor: "#00d4ff",
          marginBottom: "32px",
        }}
      />

      <div
        style={{
          fontSize: "56px",
          fontWeight: 700,
          color: "#f5f5f5",
          lineHeight: 1.1,
          marginBottom: "16px",
        }}
      >
        Aryan B V
      </div>

      <div
        style={{
          fontSize: "28px",
          color: "#00d4ff",
          marginBottom: "24px",
        }}
      >
        Full-Stack Developer &amp; AI/ML Engineer
      </div>

      <div
        style={{
          fontSize: "20px",
          color: "#666666",
        }}
      >
        Next.js · NestJS · Supabase · Claude API · Bangalore
      </div>
    </div>,
    { ...size },
  );
}
