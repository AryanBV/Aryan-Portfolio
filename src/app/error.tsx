"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-12 md:py-20 lg:py-28"
      style={{
        backgroundColor: "var(--bg-base)",
        color: "var(--text-primary)",
      }}
    >
      <p
        className="text-sm uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        500
      </p>
      <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold">
        Something went wrong
      </h1>
      <p
        className="mt-3 text-sm sm:text-base max-w-md text-center"
        style={{ color: "var(--text-secondary)" }}
      >
        An unexpected error occurred. Try reloading &mdash; if it keeps
        happening, get in touch.
      </p>
      <button
        onClick={reset}
        className="mt-8 px-5 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
        style={{
          backgroundColor: "var(--accent)",
          color: "var(--bg-base)",
        }}
      >
        Try again
      </button>
    </main>
  );
}
