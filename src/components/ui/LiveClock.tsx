"use client";

import { useEffect, useState } from "react";

// IST clock (Asia/Kolkata) updated every second. Renders empty pre-mount so
// SSR and first client render agree — no hydration flash, no locale mismatch.
export default function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const fmt = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatter.format(now));
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning style={{ fontFamily: "var(--font-mono)" }}>
      {time ? `${time} IST` : ""}
    </span>
  );
}
