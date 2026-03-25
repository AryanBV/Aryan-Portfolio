"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FiGithub, FiLinkedin, FiSend } from "react-icons/fi";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = {
  name: string;
  email: string;
  message: string;
};

type SubmitStatus = "idle" | "sending" | "success" | "error";

// ─── Constants ────────────────────────────────────────────────────────────────

const EASING = [0.22, 1, 0.36, 1] as const;

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/AryanBV",
    icon: FiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aryan-b-v-78aa63246/",
    icon: FiLinkedin,
  },
];

const INITIAL_FORM: FormState = { name: "", email: "", message: "" };

// Defined at module level — not inside component — so it's not recreated on every render
const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  backgroundColor: "var(--bg-surface)",
  color: "var(--text-primary)",
  fontSize: "0.875rem",
  padding: "0.75rem 1rem",
  outline: "none",
};

// ─── Inline validation ────────────────────────────────────────────────────────

function validate(form: FormState): string | null {
  if (!form.name.trim()) return "Name is required.";
  if (!form.email.trim()) return "Email is required.";
  if (!/\S+@\S+\.\S+/.test(form.email)) return "Enter a valid email.";
  if (form.message.trim().length < 10)
    return "Message must be at least 10 characters.";
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [validationError, setValidationError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (validationError) setValidationError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const error = validate(form);
    if (error) {
      setValidationError(error);
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          name: form.name,
          from_email: form.email,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="py-12 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow + heading */}
        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: prefersReducedMotion ? 0 : 12 }
          }
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.5,
            ease: EASING,
          }}
          className="text-xs tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: prefersReducedMotion ? 0 : 16 }
          }
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.05,
            ease: EASING,
          }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Let&apos;s work together.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: prefersReducedMotion ? 0 : 12 }
          }
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.5,
            delay: prefersReducedMotion ? 0 : 0.1,
            ease: EASING,
          }}
          className="text-sm mb-8 md:mb-12 lg:mb-16 max-w-md"
          style={{ color: "var(--text-secondary)" }}
        >
          Open to full-time roles, contract projects, and interesting
          collaborations. Available now — I respond within 24 hours.
        </motion.p>

        {/* Two-column layout: form left, social right */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: prefersReducedMotion ? 0 : 24 }
          }
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.15,
            ease: EASING,
          }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-12"
        >
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-xs uppercase tracking-widest"
                style={{
                  color: "var(--text-muted)",
                }}
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-required="true"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="border border-[var(--border)] focus:border-[var(--accent)] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
                style={INPUT_STYLE}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-xs uppercase tracking-widest"
                style={{
                  color: "var(--text-muted)",
                }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-required="true"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="border border-[var(--border)] focus:border-[var(--accent)] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
                style={INPUT_STYLE}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="message"
                className="text-xs uppercase tracking-widest"
                style={{
                  color: "var(--text-muted)",
                }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                aria-required="true"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about the project or role..."
                className="border border-[var(--border)] focus:border-[var(--accent)] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
                style={{
                  ...INPUT_STYLE,
                  resize: "vertical",
                  minHeight: "140px",
                }}
              />
            </div>

            {/* Validation error */}
            {validationError && (
              <p className="text-xs" style={{ color: "#f87171" }}>
                {validationError}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending" || status === "success"}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 self-start focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
              style={{
                backgroundColor:
                  status === "success" ? "transparent" : "var(--accent)",
                color: status === "success" ? "var(--accent)" : "#0a0a0a",
                border:
                  status === "success"
                    ? "1px solid var(--accent)"
                    : "1px solid transparent",
                opacity: status === "sending" ? 0.6 : 1,
                cursor:
                  status === "sending" || status === "success"
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              <FiSend size={14} />
              {status === "idle" && "Send Message"}
              {status === "sending" && "Sending\u2026"}
              {status === "success" && "Message Sent"}
              {status === "error" && "Try Again"}
            </button>

            {/* Success / error feedback */}
            {status === "success" && (
              <p className="text-xs" style={{ color: "var(--success)" }}>
                Got it &mdash; I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-xs" style={{ color: "#f87171" }}>
                Something went wrong. Try emailing me at{" "}
                <span style={{ color: "var(--text-secondary)" }}>
                  aryansalian5678@gmail.com
                </span>
                .
              </p>
            )}
          </form>

          {/* Social links panel */}
          <div className="flex flex-col gap-6 pt-1">
            <p
              className="text-xs uppercase tracking-widest"
              style={{
                color: "var(--text-muted)",
              }}
            >
              Find me online
            </p>

            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
              >
                <Icon size={16} />
                {label}
              </a>
            ))}

            {/* Divider */}
            <div
              style={{
                borderTop: "1px solid var(--border)",
                marginTop: "0.5rem",
              }}
            />

            <p
              className="text-xs leading-relaxed"
              style={{
                color: "var(--text-muted)",
              }}
            >
              Based in Bangalore, India.
              <br />
              Open to remote and hybrid roles.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
