import { ImageResponse } from "next/og";

// Colors are hardcoded because ImageResponse (Satori) runs at build time
// and cannot resolve CSS custom properties. Update these if the palette changes.
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 192,
        height: 192,
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 32,
      }}
    >
      <span style={{ color: "#F5A623", fontSize: 120, fontWeight: 700 }}>
        A
      </span>
    </div>,
    { ...size },
  );
}
