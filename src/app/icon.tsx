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
      <div
        style={{
          position: "relative",
          width: 140,
          height: 140,
          display: "flex",
        }}
      >
        {/* Main amber triangle */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 140,
            height: 140,
            background: "#F5A623",
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          }}
        />
        {/* Inner triangle cutout */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 32,
            width: 76,
            height: 68,
            background: "#0a0a0a",
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          }}
        />
        {/* Crossbar cutout */}
        <div
          style={{
            position: "absolute",
            top: 82,
            left: 18,
            width: 104,
            height: 12,
            background: "#0a0a0a",
            borderRadius: 3,
          }}
        />
      </div>
    </div>,
    { ...size },
  );
}
