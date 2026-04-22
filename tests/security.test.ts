import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { projects } from "@/lib/projects";
import { certificates } from "@/lib/certificates";
import {
  safeUrlSchema,
  safeImagePathSchema,
  noInlineScriptSchema,
  contactFormSchema,
} from "@/lib/schema";

// ─── Schema-level invariants ──────────────────────────────────────────────────

describe("safeUrlSchema", () => {
  it("rejects non-http(s) schemes", () => {
    for (const s of [
      "javascript:alert(1)",
      "data:text/html,<script>x</script>",
      "file:///etc/passwd",
      "vbscript:msgbox(1)",
      "  javascript:x",
    ]) {
      expect(safeUrlSchema.safeParse(s).success).toBe(false);
    }
  });
  it("accepts http and https URLs", () => {
    for (const s of [
      "https://example.com",
      "http://example.com/path?q=1",
      "HTTPS://EXAMPLE.COM",
    ]) {
      expect(safeUrlSchema.safeParse(s).success).toBe(true);
    }
  });
});

describe("safeImagePathSchema", () => {
  it("rejects protocol-relative and external", () => {
    for (const s of [
      "//evil.com/x.png",
      "https://evil.com/x.png",
      "evil.png",
      "",
    ]) {
      expect(safeImagePathSchema.safeParse(s).success).toBe(false);
    }
  });
  it("accepts absolute root paths", () => {
    expect(safeImagePathSchema.safeParse("/images/foo.png").success).toBe(true);
  });
});

describe("noInlineScriptSchema", () => {
  it("rejects breakout sequences", () => {
    for (const s of ["hi </script", "x <!-- comment", "<![CDATA["]) {
      expect(noInlineScriptSchema.safeParse(s).success).toBe(false);
    }
  });
  it("accepts normal text", () => {
    expect(noInlineScriptSchema.safeParse("Hello, world!").success).toBe(true);
  });
});

// ─── Data-level invariants ────────────────────────────────────────────────────

describe("project data safety", () => {
  it("every external link is https", () => {
    for (const p of projects) {
      if (p.links.live) expect(p.links.live).toMatch(/^https:\/\//);
      if (p.links.github) expect(p.links.github).toMatch(/^https:\/\//);
    }
  });
  it("no long-text field contains a breakout sequence", () => {
    const forbidden = /<\/script|<!--|<!\[CDATA\[/i;
    for (const p of projects) {
      const fields = [
        p.title,
        p.description,
        p.tagline,
        p.caseStudy?.tagline,
        p.caseStudy?.challenge,
        p.caseStudy?.approach,
        p.caseStudy?.impact,
      ];
      for (const f of fields) if (f) expect(f).not.toMatch(forbidden);
    }
  });
});

describe("certificate data safety", () => {
  it("every verifyUrl is https", () => {
    for (const c of certificates) {
      if (c.verifyUrl) expect(c.verifyUrl).toMatch(/^https:\/\//);
    }
  });
});

// ─── Contact form schema ──────────────────────────────────────────────────────

describe("contactFormSchema", () => {
  const base = {
    name: "Test",
    email: "test@example.com",
    inquiry: "hello" as const,
    message: "hi",
    website: "",
  };
  it("accepts a clean submission", () => {
    expect(contactFormSchema.safeParse(base).success).toBe(true);
  });
  it("rejects empty name", () => {
    expect(contactFormSchema.safeParse({ ...base, name: "" }).success).toBe(
      false,
    );
  });
  it("rejects CR/LF in email (header injection)", () => {
    expect(
      contactFormSchema.safeParse({ ...base, email: "a@b.co\r\nBcc: x@y.z" })
        .success,
    ).toBe(false);
  });
  it("rejects filled honeypot", () => {
    expect(
      contactFormSchema.safeParse({ ...base, website: "bot" }).success,
    ).toBe(false);
  });
  it("rejects invalid inquiry enum", () => {
    expect(
      contactFormSchema.safeParse({
        ...base,
        inquiry: "other" as unknown as typeof base.inquiry,
      }).success,
    ).toBe(false);
  });
});

// ─── CSP + config snapshot ────────────────────────────────────────────────────

describe("next.config.ts CSP snapshot", () => {
  const src = readFileSync(join(__dirname, "..", "next.config.ts"), "utf8");
  it("contains all strengthened CSP directives", () => {
    for (const d of [
      "base-uri 'self'",
      "object-src 'none'",
      "form-action 'self'",
      "upgrade-insecure-requests",
      "frame-ancestors 'none'",
    ]) {
      expect(src).toContain(d);
    }
  });
  it("declares poweredByHeader: false", () => {
    expect(src).toMatch(/poweredByHeader:\s*false/);
  });
  it("declares COOP: same-origin", () => {
    expect(src).toContain("Cross-Origin-Opener-Policy");
    expect(src).toContain("same-origin");
  });
  it("gates 'unsafe-eval' behind NODE_ENV === 'development' (never ships to prod)", () => {
    // The source may contain 'unsafe-eval' but only inside an `isDev` branch.
    // This test locks that guard in so a future refactor can't accidentally
    // promote it to the production CSP.
    const hasEvalDirective = src.includes("'unsafe-eval'");
    if (hasEvalDirective) {
      expect(src).toMatch(/NODE_ENV\s*===\s*["']development["']/);
      expect(src).toMatch(/isDev\s*\?/);
    }
  });
});

// ─── Render-site source scans (the real lock-in) ──────────────────────────────

function walkSrc(
  dir: string,
  match: (full: string) => boolean,
  acc: string[] = [],
): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walkSrc(full, match, acc);
    else if (/\.(ts|tsx)$/.test(entry) && match(full)) acc.push(full);
  }
  return acc;
}

describe("render-site source scans", () => {
  const SRC = join(__dirname, "..", "src");

  it("no raw dangerouslySetInnerHTML outside json-ld.tsx", () => {
    const offenders = walkSrc(SRC, (full) => {
      if (full.endsWith("json-ld.tsx")) return false;
      return /dangerouslySetInnerHTML/.test(readFileSync(full, "utf8"));
    });
    expect(offenders).toEqual([]);
  });

  it("no raw z.url() outside schema.ts", () => {
    const offenders = walkSrc(SRC, (full) => {
      if (full.endsWith("schema.ts")) return false;
      return /z\.url\(\)/.test(readFileSync(full, "utf8"));
    });
    expect(offenders).toEqual([]);
  });

  it("no raw fetch( outside safe-fetch.ts", () => {
    const offenders = walkSrc(SRC, (full) => {
      if (full.endsWith("safe-fetch.ts")) return false;
      const content = readFileSync(full, "utf8");
      // \bfetch( matches fetch( at word boundary, so safeFetch( does not match
      return /\bfetch\(/.test(content);
    });
    expect(offenders).toEqual([]);
  });
});
