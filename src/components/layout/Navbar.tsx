"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/Icons";

// hrefs use `/#id` (not `#id`) so nav works from sub-routes like
// /projects/[slug] — a bare `#id` on a sub-route only updates the URL
// hash without navigating back to the home page.
const NAV_LINKS = [
  { n: "01", label: "Work", href: "/#projects", id: "projects" },
  { n: "02", label: "About", href: "/#about", id: "about" },
  { n: "03", label: "Skills", href: "/#skills", id: "skills" },
  { n: "04", label: "Stats", href: "/#stats", id: "stats" },
  { n: "05", label: "Certs", href: "/#certifications", id: "certifications" },
];

// Floating pill nav that shrinks to a compact rounded bar on scroll.
// Mobile uses a hamburger → overlay with the same links + CTA.
// Scroll-spy, focus-trap, Escape-to-close — all preserved from v2.
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll state (for pill shrink + backdrop)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy (same IO pattern as v2)
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Lock body scroll when overlay open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Focus trap + Escape
  useEffect(() => {
    if (!menuOpen) return;
    const raf = requestAnimationFrame(() => {
      const menu = menuRef.current;
      if (!menu) return;
      menu.querySelectorAll<HTMLElement>("a, button")[0]?.focus();
    });
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const menu = menuRef.current;
      if (!menu) return;
      const list = menu.querySelectorAll<HTMLElement>("a, button");
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ transition: "all 400ms var(--ease-emph)" }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{
          height: scrolled ? 60 : 72,
          marginTop: scrolled ? 12 : 20,
          maxWidth: scrolled ? 960 : 1200,
          padding: scrolled ? "0 16px" : "0 clamp(1rem, 4vw, 2rem)",
          background: scrolled ? "rgba(17,17,17,0.75)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          border: scrolled
            ? "1px solid var(--divider)"
            : "1px solid transparent",
          borderRadius: scrolled ? 999 : 0,
          transition: "all 500ms var(--ease-emph)",
          width: `calc(100% - ${scrolled ? 24 : 0}px)`,
          marginLeft: "auto",
          marginRight: "auto",
          // Use max-width container — keeps alignment with section wraps
        }}
      >
        {/* Logo */}
        <Link
          href="/#hero"
          className="flex items-center gap-3"
          style={{
            textDecoration: "none",
            color: "var(--text-primary)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--accent)",
                borderRadius: 6,
                opacity: 0.15,
                filter: "blur(8px)",
              }}
            />
            <Image
              src="/logo/aryan-logo.svg"
              width={26}
              height={26}
              alt=""
              aria-hidden="true"
              style={{ position: "relative" }}
            />
          </div>
          <div
            className="hidden sm:flex"
            style={{ flexDirection: "column", lineHeight: 1 }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              Aryan B V
            </span>
            <span
              style={{
                fontSize: 10,
                color: "var(--text-muted)",
                letterSpacing: "0.2em",
                marginTop: 3,
                fontFamily: "var(--font-mono)",
              }}
            >
              SWE · BLR
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <nav
          className="hidden md:flex items-center"
          style={{ gap: 4 }}
          aria-label="Primary"
        >
          {NAV_LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.id}
                href={l.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 14px",
                  fontSize: 13,
                  color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                  textDecoration: "none",
                  borderRadius: 999,
                  background: isActive ? "var(--accent-dim)" : "transparent",
                  transition: "all 300ms var(--ease-emph)",
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    color: isActive ? "var(--accent)" : "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {l.n}
                </span>
                {l.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/#contact"
          className="btn-xl primary hidden md:inline-flex"
          style={{ padding: "10px 18px", fontSize: 13 }}
        >
          Let&apos;s talk <ArrowUpRight size={14} />
        </Link>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          className="md:hidden inline-flex items-center justify-center"
          style={{
            width: 44,
            height: 44,
            background: "transparent",
            border: "1px solid var(--divider)",
            borderRadius: 999,
            color: "var(--text-primary)",
          }}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            aria-hidden="true"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: 16,
                height: 1.5,
                background: "currentColor",
                transform: menuOpen ? "translateY(3px) rotate(45deg)" : "none",
                transition: "all 300ms var(--ease-emph)",
              }}
            />
            <span
              style={{
                width: 16,
                height: 1.5,
                background: "currentColor",
                transform: menuOpen
                  ? "translateY(-3px) rotate(-45deg)"
                  : "none",
                transition: "all 300ms var(--ease-emph)",
              }}
            />
          </span>
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="md:hidden"
          style={{
            position: "fixed",
            top: 96,
            left: 16,
            right: 16,
            background: "rgba(17,17,17,0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid var(--divider)",
            borderRadius: 20,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                borderRadius: 12,
                textDecoration: "none",
                color: "var(--text-primary)",
                background:
                  active === l.id ? "var(--accent-dim)" : "transparent",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--accent)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {l.n}
                </span>
                <span style={{ fontSize: 17 }}>{l.label}</span>
              </span>
            </a>
          ))}
          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="btn-xl primary"
            style={{ marginTop: 8, justifyContent: "center" }}
          >
            Let&apos;s talk <ArrowUpRight size={14} />
          </Link>
        </div>
      )}
    </header>
  );
}
