"use client";

import "./globals.css";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "var(--bg-base)",
          color: "var(--text-primary)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
          <p
            className="text-sm uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            500
          </p>
          <h1 className="mt-4 text-2xl font-bold">Something went wrong</h1>
          <button
            onClick={reset}
            className="mt-8 px-5 py-2.5 rounded-lg text-sm font-medium"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--bg-base)",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
