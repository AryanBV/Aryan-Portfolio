import { ImageResponse } from "next/og";

export const alt = "Aryan B V — Full-Stack Developer & AI/ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            background: "#F5A623",
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          }}
        />
        <div
          style={{
            color: "#F5A623",
            fontSize: 24,
            letterSpacing: "0.2em",
          }}
        >
          PORTFOLIO
        </div>
      </div>
      <div
        style={{
          color: "#f5f5f5",
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: 24,
        }}
      >
        Aryan B V
      </div>
      <div style={{ color: "#a09888", fontSize: 28 }}>
        Full-Stack Developer & AI/ML Engineer
      </div>
      <div style={{ color: "#787068", fontSize: 20, marginTop: 32 }}>
        aryanbv.com
      </div>
    </div>,
    { ...size },
  );
}
