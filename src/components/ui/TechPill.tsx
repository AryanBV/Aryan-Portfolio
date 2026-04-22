"use client";

import Image from "next/image";
import { useState } from "react";

// Mapping of tech display names → SimpleIcons slug. Logos are served from
// cdn.simpleicons.org as monochrome SVGs (color-matched via ?a89a8b), which
// keeps our CSP img-src list short (just the CDN domain).
const TECH: Record<string, string> = {
  React: "react",
  "Next.js": "nextdotjs",
  TypeScript: "typescript",
  JavaScript: "javascript",
  Python: "python",
  Tailwind: "tailwindcss",
  NestJS: "nestjs",
  "Node.js": "nodedotjs",
  "Node.js 20": "nodedotjs",
  "Node.js 18": "nodedotjs",
  FastAPI: "fastapi",
  Express: "express",
  "Express.js": "express",
  "Claude API": "anthropic",
  "MCP Protocol": "anthropic",
  "MCP SDK": "anthropic",
  Supabase: "supabase",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  MongoDB: "mongodb",
  Razorpay: "razorpay",
  // Tesseract doesn't exist as a SimpleIcons slug → omit the logo, name-only fallback.
  REST: "openapiinitiative",
  Vercel: "vercel",
  "Git / GitHub": "github",
  GitHub: "github",
  pytest: "pytest",
  PWA: "pwa",
  mypy: "python",
  "mypy strict": "python",
  Zod: "zod",
  "GitHub Actions": "githubactions",
  pikepdf: "python",
  fonttools: "python",
  "pdfminer.six": "python",
  "Python 3.12": "python",
  "Python 3.13": "python",
  // Entries without reliable SimpleIcons slugs intentionally omitted:
  //   JSON-RPC, pdfmake, @pdfme/pdf-lib, unpdf, Framer Motion, EmailJS,
  //   Tesseract — TechPill shows name-only when no slug is mapped.
};

export type TechPillMode = "both" | "logo" | "name";

interface TechPillProps {
  name: string;
  mode?: TechPillMode;
  secondary?: boolean;
}

export default function TechPill({
  name,
  mode = "both",
  secondary = false,
}: TechPillProps) {
  const slug = TECH[name];
  const [failed, setFailed] = useState(false);
  const showLogo = mode !== "name" && !!slug && !failed;
  const showName = mode !== "logo";
  const isLogoOnly = mode === "logo";

  if (secondary) {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: showLogo && showName ? 6 : 0,
          fontSize: 12.5,
          color: "var(--text-secondary)",
          fontFamily: "var(--font-mono)",
        }}
        title={isLogoOnly ? name : undefined}
      >
        {showLogo && slug && (
          <Image
            src={`https://cdn.simpleicons.org/${slug}/a89a8b`}
            alt=""
            width={13}
            height={13}
            unoptimized
            style={{ display: "block", opacity: 0.7 }}
            onError={() => setFailed(true)}
          />
        )}
        {showName && <span>{name}</span>}
      </span>
    );
  }

  return (
    <span
      className="tech-pill-v2"
      style={{
        gap: showLogo && showName ? 7 : 0,
        padding: isLogoOnly ? "8px" : "6px 11px",
      }}
      title={isLogoOnly ? name : undefined}
    >
      {showLogo && slug && (
        <Image
          src={`https://cdn.simpleicons.org/${slug}/a89a8b`}
          alt=""
          width={isLogoOnly ? 18 : 14}
          height={isLogoOnly ? 18 : 14}
          unoptimized
          style={{ display: "block", opacity: 0.85 }}
          onError={() => setFailed(true)}
        />
      )}
      {showName && <span>{name}</span>}
    </span>
  );
}
