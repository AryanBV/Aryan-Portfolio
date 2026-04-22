"use client";

import { useEffect } from "react";

// Developer-inspector easter egg. Prints once per page load, on mount only.
// Guard prevents duplicate logs under React Strict Mode double-mount.
declare global {
  interface Window {
    __aryanGreetingShown?: boolean;
  }
}

export default function ConsoleSignature() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__aryanGreetingShown) return;
    window.__aryanGreetingShown = true;

    const title = "%cHi. Looking at the source?";
    const titleStyle =
      "color:#f5a623;font-size:16px;font-weight:600;letter-spacing:0.02em";
    const body =
      "%cI'm Aryan — full-stack dev. If you're a recruiter or fellow builder, say hi: aryansalian5678@gmail.com";
    const bodyStyle = "color:#a09888;font-size:12px;line-height:1.5";
    // Intentional developer-facing console output — not runtime diagnostics.
    console.log(`${title}\n${body}`, titleStyle, bodyStyle);
  }, []);

  return null;
}
