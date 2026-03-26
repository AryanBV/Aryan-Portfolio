import { ImageResponse } from "next/og";

// Colors are hardcoded — see icon.tsx comment for why.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: 180,
        height: 180,
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 36,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 130,
          height: 130,
          display: "flex",
        }}
      >
        {/* Main amber triangle */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 130,
            height: 130,
            background: "#F5A623",
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          }}
        />
        {/* Inner triangle cutout */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 30,
            width: 70,
            height: 63,
            background: "#0a0a0a",
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          }}
        />
        {/* Crossbar cutout */}
        <div
          style={{
            position: "absolute",
            top: 76,
            left: 17,
            width: 96,
            height: 11,
            background: "#0a0a0a",
            borderRadius: 3,
          }}
        />
      </div>
    </div>,
    { ...size },
  );
}
