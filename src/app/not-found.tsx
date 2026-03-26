import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Aryan B V",
};

export default function NotFound() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-12 md:py-20 lg:py-28"
      style={{
        backgroundColor: "var(--bg-base)",
        color: "var(--text-primary)",
      }}
    >
      <p
        className="text-sm font-medium uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        404
      </p>

      <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold">
        Page not found
      </h1>

      <p
        className="mt-3 text-sm sm:text-base max-w-md text-center"
        style={{ color: "var(--text-secondary)" }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <nav className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
        <Link
          href="/"
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/#projects"
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
        >
          Projects
        </Link>
        <Link
          href="/#contact"
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
        >
          Contact
        </Link>
      </nav>
    </main>
  );
}
