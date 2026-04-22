import type { NextConfig } from "next";

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
          // script-src / style-src retain 'unsafe-inline' deliberately:
          // * External URLs are rendered via <SafeExternalLink>, which rejects non-http(s) schemes.
          // * JSON-LD is rendered via <JsonLd>, which HTML-escapes </script>, <!--, <![CDATA[, and U+2028/9.
          // * GitHub API responses are Zod-validated by githubResponseSchema at the boundary.
          // * Long-text project/certificate fields go through safeLongText, which rejects breakout sequences.
          // * tests/security.test.ts asserts every primitive + source-scans render sites for bypasses.
          // * react/no-danger ESLint rule flags any new dangerouslySetInnerHTML at lint time.
          // Removing 'unsafe-inline' entirely via nonce middleware remains possible but the
          // +150ms SSR cost is not justified now that the XSS surface is structurally zero.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
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
