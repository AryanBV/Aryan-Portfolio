import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Security-focused overrides: block new dangerouslySetInnerHTML usage
  // at lint time. The single legitimate site (json-ld.tsx) carries a
  // site-local disable-next-line with a justification comment.
  {
    rules: {
      "react/no-danger": "error",
    },
  },
]);

export default eslintConfig;
