import type { NextConfig } from "next";

// React's dev runtime uses eval() for debug features (call-stack
// reconstruction, Fast Refresh, Turbopack hot modules). Allowing it in dev
// keeps the console clean; production CSP stays fully locked. React itself
// never uses eval() in production, so there is no security delta at runtime.
const isDev = process.env.NODE_ENV === "development";
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com"
  : "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com";

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          // style-src keeps 'unsafe-inline' for the app's inline style props;
          // script-src keeps it for the Next.js framework bootstrap. NOTE: the
          // guards below harden MARKUP / DATA / STYLE injection sinks — they do
          // NOT cover script-src itself (there are no first-party inline
          // <script> tags; <JsonLd> emits non-executable application/ld+json):
          // * External URLs are rendered via <SafeExternalLink>, which rejects non-http(s) schemes.
          // * JSON-LD is rendered via <JsonLd>, which HTML-escapes </script>, <!--, <![CDATA[, and U+2028/9.
          // * GitHub API responses are Zod-validated by githubResponseSchema at the boundary.
          // * Long-text project/certificate fields go through safeLongText, which rejects breakout sequences.
          // * tests/security.test.ts asserts every primitive + source-scans render sites for bypasses.
          // * react/no-danger ESLint rule flags any new dangerouslySetInnerHTML at lint time.
          // script-src 'unsafe-inline' is thus a consciously-accepted
          // defense-in-depth gap (a future inline-script sink would not be
          // blocked by CSP). It is removable via a per-request nonce +
          // 'strict-dynamic' in middleware; the +SSR cost is deferred for now.
          //
          // 'unsafe-eval' is dev-only — see `scriptSrc` above for rationale.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              scriptSrc,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://cdn.simpleicons.org",
              "font-src 'self'",
              "connect-src 'self' https://api.emailjs.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "object-src 'none'",
              "form-action 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
