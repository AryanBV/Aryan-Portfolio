"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FiGithub, FiLinkedin, FiSend } from "react-icons/fi";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = {
  name: string;
  email: string;
  inquiry: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

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

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  inquiry: "",
  message: "",
};

const INQUIRY_OPTIONS = [
  { value: "", label: "What can I help with?", disabled: true },
  { value: "fulltime", label: "Full-time opportunity" },
  { value: "freelance", label: "Freelance / contract project" },
  { value: "collaboration", label: "Collaboration / open source" },
  { value: "hello", label: "Just saying hello" },
];

const INPUT_CLASSES =
  "w-full rounded-lg border border-[var(--border)] focus:border-[var(--accent)] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)] text-sm p-3";

const INPUT_BG: React.CSSProperties = {
  backgroundColor: "var(--bg-base)",
  color: "var(--text-primary)",
};

// Custom chevron SVG for the select dropdown
const SELECT_CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23787068' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")";

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) {
    errors.email = "Please enter a valid email";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "Please enter a valid email";
  }
  if (!form.inquiry) errors.inquiry = "Please select an inquiry type";
  if (!form.message.trim()) errors.message = "Message is required";
  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field when the user starts typing/selecting
    if (fieldErrors[name as keyof FormState]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormState];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setStatus("sending");
    setFieldErrors({});

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          name: form.name,
          from_email: form.email,
          inquiry_type: form.inquiry,
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
          collaborations.
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
          {/* Form card */}
          <div
            className="card-shadow rounded-xl p-6 md:p-8"
            style={{ backgroundColor: "var(--bg-surface)" }}
          >
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
                  style={{ color: "var(--text-muted)" }}
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
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={INPUT_CLASSES}
                  style={INPUT_BG}
                />
                {fieldErrors.name && (
                  <p
                    id="name-error"
                    className="text-sm"
                    style={{ color: "var(--error)" }}
                  >
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
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
                  aria-describedby={
                    fieldErrors.email ? "email-error" : undefined
                  }
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={INPUT_CLASSES}
                  style={INPUT_BG}
                />
                {fieldErrors.email && (
                  <p
                    id="email-error"
                    className="text-sm"
                    style={{ color: "var(--error)" }}
                  >
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Inquiry type */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="inquiry"
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  Inquiry Type
                </label>
                <select
                  id="inquiry"
                  name="inquiry"
                  required
                  aria-required="true"
                  aria-describedby={
                    fieldErrors.inquiry ? "inquiry-error" : undefined
                  }
                  value={form.inquiry}
                  onChange={handleChange}
                  className={`${INPUT_CLASSES} appearance-none cursor-pointer`}
                  style={{
                    ...INPUT_BG,
                    color: form.inquiry
                      ? "var(--text-primary)"
                      : "var(--text-muted)",
                    backgroundImage: SELECT_CHEVRON,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "16px",
                    paddingRight: "2.5rem",
                  }}
                >
                  {INQUIRY_OPTIONS.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.disabled}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
                {fieldErrors.inquiry && (
                  <p
                    id="inquiry-error"
                    className="text-sm"
                    style={{ color: "var(--error)" }}
                  >
                    {fieldErrors.inquiry}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="message"
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  aria-required="true"
                  aria-describedby={
                    fieldErrors.message ? "message-error" : undefined
                  }
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about the project or role..."
                  className={`${INPUT_CLASSES} max-h-48 resize-y`}
                  style={INPUT_BG}
                />
                {fieldErrors.message && (
                  <p
                    id="message-error"
                    className="text-sm"
                    style={{ color: "var(--error)" }}
                  >
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-opacity duration-200 self-start focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
                style={{
                  backgroundColor:
                    status === "success" ? "transparent" : "var(--accent)",
                  color:
                    status === "success" ? "var(--accent)" : "var(--bg-base)",
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
                <p className="text-xs" style={{ color: "var(--error)" }}>
                  Something went wrong. Try emailing me at{" "}
                  <span style={{ color: "var(--text-secondary)" }}>
                    aryansalian5678@gmail.com
                  </span>
                  .
                </p>
              )}
            </form>
          </div>

          {/* Social links panel */}
          <div className="flex flex-col gap-6 pt-1">
            <p
              className="text-xs uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
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
              style={{ color: "var(--text-muted)" }}
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
