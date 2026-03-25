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
      <span style={{ color: "#F5A623", fontSize: 110, fontWeight: 700 }}>
        A
      </span>
    </div>,
    { ...size },
  );
}
