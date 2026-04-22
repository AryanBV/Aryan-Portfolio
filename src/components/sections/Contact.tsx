"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Reveal from "@/components/ui/Reveal";
import SpotCard from "@/components/ui/SpotCard";
import {
  Github,
  Linkedin,
  Map,
  Send,
  Check,
  ArrowUpRight,
} from "@/components/ui/Icons";
import { SafeExternalLink } from "@/components/ui/safe-external-link";
import { contactFormSchema } from "@/lib/schema";

type FormState = {
  name: string;
  email: string;
  inquiry: string;
  message: string;
  website: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

type SubmitStatus = "idle" | "sending" | "success" | "error";

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  inquiry: "",
  message: "",
  website: "",
};

const INQUIRY_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "fulltime", label: "Full-time opportunity" },
  { value: "freelance", label: "Freelance / contract project" },
  { value: "collaboration", label: "Collaboration / open source" },
  { value: "hello", label: "Just saying hello" },
];

const SOCIAL_ROWS: Array<{
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  value: string;
  href: string | null;
}> = [
  {
    icon: Github,
    label: "GitHub",
    value: "@AryanBV",
    href: "https://github.com/AryanBV",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/aryan-b-v",
    href: "https://www.linkedin.com/in/aryan-b-v-78aa63246/",
  },
  {
    icon: Map,
    label: "Location",
    value: "Bangalore · IN",
    href: null,
  },
];

export default function Contact() {
  const renderedAt = useRef<number>(0);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [focusField, setFocusField] = useState<keyof FormState | null>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormState];
        return next;
      });
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot
    if (form.website.length > 0) {
      setStatus("success");
      setForm(INITIAL_FORM);
      return;
    }
    // Min-time
    if (renderedAt.current !== 0 && Date.now() - renderedAt.current < 3000) {
      setStatus("success");
      setForm(INITIAL_FORM);
      return;
    }
    // Schema
    const parsed = contactFormSchema.safeParse(form);
    if (!parsed.success) {
      const errs: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (key === "website") continue;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }

    setStatus("sending");
    setErrors({});
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: parsed.data.name,
          name: parsed.data.name,
          from_email: parsed.data.email,
          inquiry_type: parsed.data.inquiry,
          message: parsed.data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  }

  const floating = (name: keyof FormState) =>
    !!form[name] || focusField === name;

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 relative z-[2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Left column: heading + social rows */}
          <Reveal>
            <div>
              <div className="eyebrow-line">
                <span className="section-number">06</span>
                <span>Contact</span>
              </div>
              <h2
                className="text-[clamp(2rem,5vw,3.75rem)]"
                style={{
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.02,
                  margin: "20px 0 0",
                }}
              >
                Let&apos;s make <br />
                something{" "}
                <span
                  style={{
                    color: "var(--accent)",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  real.
                </span>
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: "var(--text-secondary)",
                  maxWidth: 440,
                  marginTop: 20,
                  lineHeight: 1.6,
                }}
              >
                Available for full-time SWE roles, freelance contracts, and
                open-source collaboration. Usually reply within 24 hours.
              </p>

              <div
                className="flex flex-col gap-4"
                style={{
                  marginTop: 40,
                  paddingTop: 24,
                  borderTop: "1px solid var(--divider)",
                }}
              >
                {SOCIAL_ROWS.map(({ icon: Icon, label, value, href }, i) => {
                  const row = (
                    <div className="flex items-center gap-5">
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: "var(--bg-surface)",
                          border: "1px solid var(--divider)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--text-muted)",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      <div
                        className="flex-1 flex items-baseline justify-between gap-4"
                        style={{
                          borderBottom: "1px solid var(--divider)",
                          paddingBottom: 14,
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: 10,
                              color: "var(--text-muted)",
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              margin: 0,
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            {label}
                          </p>
                          <p
                            style={{
                              fontSize: 15,
                              color: "var(--text-primary)",
                              margin: "4px 0 0",
                            }}
                          >
                            {value}
                          </p>
                        </div>
                        {href && <ArrowUpRight size={16} />}
                      </div>
                    </div>
                  );
                  return href ? (
                    <SafeExternalLink
                      key={i}
                      href={href}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      {row}
                    </SafeExternalLink>
                  ) : (
                    <div key={i}>{row}</div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Right column: form card */}
          <Reveal>
            <SpotCard style={{ padding: "clamp(20px,4vw,32px)" }}>
              <div className="flex items-center justify-between mb-5">
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--text-muted)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  New inquiry
                </span>
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--status-live)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--status-live)",
                      boxShadow: "0 0 8px var(--status-live)",
                    }}
                  />
                  Encrypted
                </span>
              </div>

              <form
                onSubmit={onSubmit}
                noValidate
                className="flex flex-col gap-4"
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={form.website}
                  onChange={handleChange}
                  style={{
                    position: "absolute",
                    left: "-10000px",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                />

                <FloatingField
                  name="name"
                  label="Your name"
                  value={form.name}
                  error={errors.name}
                  focused={focusField === "name"}
                  isFloating={floating("name")}
                  onChange={handleChange}
                  onFocus={() => setFocusField("name")}
                  onBlur={() => setFocusField(null)}
                  autoComplete="name"
                  required
                />

                <FloatingField
                  name="email"
                  label="Email address"
                  type="email"
                  value={form.email}
                  error={errors.email}
                  focused={focusField === "email"}
                  isFloating={floating("email")}
                  onChange={handleChange}
                  onFocus={() => setFocusField("email")}
                  onBlur={() => setFocusField(null)}
                  autoComplete="email"
                  required
                />

                <FloatingSelect
                  name="inquiry"
                  label="Inquiry type"
                  value={form.inquiry}
                  error={errors.inquiry}
                  focused={focusField === "inquiry"}
                  isFloating={floating("inquiry")}
                  onChange={handleChange}
                  onFocus={() => setFocusField("inquiry")}
                  onBlur={() => setFocusField(null)}
                  options={INQUIRY_OPTIONS}
                />

                <FloatingField
                  name="message"
                  label="Message"
                  value={form.message}
                  error={errors.message}
                  focused={focusField === "message"}
                  isFloating={floating("message")}
                  onChange={handleChange}
                  onFocus={() => setFocusField("message")}
                  onBlur={() => setFocusField(null)}
                  rows={5}
                  required
                />

                <button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  className="btn-xl primary"
                  style={{
                    justifyContent: "center",
                    marginTop: 4,
                    background:
                      status === "success" ? "var(--success)" : "var(--accent)",
                    transition: "all 300ms var(--ease-emph)",
                    cursor:
                      status === "sending" || status === "success"
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {status === "idle" && (
                    <>
                      Send message <Send size={14} />
                    </>
                  )}
                  {status === "sending" && (
                    <>
                      <span
                        aria-hidden="true"
                        style={{
                          width: 12,
                          height: 12,
                          border: "1.5px solid var(--bg-base)",
                          borderTopColor: "transparent",
                          borderRadius: "50%",
                          animation: "contactSpin 700ms linear infinite",
                        }}
                      />
                      Sending…
                    </>
                  )}
                  {status === "success" && (
                    <>
                      <Check size={14} /> Sent — talk soon
                    </>
                  )}
                  {status === "error" && <>Try again</>}
                </button>

                {status === "error" && (
                  <p style={{ fontSize: 12, color: "var(--error)" }}>
                    Something went wrong. Email me at{" "}
                    <span style={{ color: "var(--text-secondary)" }}>
                      aryansalian5678@gmail.com
                    </span>
                    .
                  </p>
                )}
              </form>
              <style>{`@keyframes contactSpin { to { transform: rotate(360deg); } }`}</style>
            </SpotCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Floating-label field primitives ────────────────────────────────────────

interface FieldBase {
  name: keyof FormState;
  label: string;
  value: string;
  error?: string;
  focused: boolean;
  isFloating: boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onFocus: () => void;
  onBlur: () => void;
}

function labelStyle(
  isFloating: boolean,
  focused: boolean,
): React.CSSProperties {
  return {
    position: "absolute",
    left: 14,
    top: isFloating ? 6 : "50%",
    transform: isFloating ? "none" : "translateY(-50%)",
    fontSize: isFloating ? 10 : 13,
    letterSpacing: isFloating ? "0.15em" : "0",
    textTransform: isFloating ? "uppercase" : "none",
    color: focused ? "var(--accent)" : "var(--text-muted)",
    fontFamily: isFloating ? "var(--font-mono)" : "var(--font-display)",
    pointerEvents: "none",
    background: isFloating ? "var(--bg-base)" : "transparent",
    padding: isFloating ? "0 6px" : 0,
    zIndex: 1,
    transition: "all 200ms var(--ease-emph)",
  };
}

function FloatingField({
  name,
  label,
  value,
  error,
  focused,
  isFloating,
  onChange,
  onFocus,
  onBlur,
  type = "text",
  rows,
  autoComplete,
  required,
}: FieldBase & {
  type?: string;
  rows?: number;
  autoComplete?: string;
  required?: boolean;
}) {
  const common = {
    id: name,
    name,
    value,
    onChange,
    onFocus,
    onBlur,
    autoComplete,
    required,
    "aria-required": required ? true : undefined,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${name}-error` : undefined,
    style: {
      width: "100%",
      padding: rows ? "22px 14px 12px" : "22px 14px 10px",
      background: "var(--bg-base)",
      color: "var(--text-primary)",
      border: "1px solid " + (focused ? "var(--accent)" : "var(--divider)"),
      borderRadius: 10,
      fontFamily: "var(--font-display)",
      fontSize: 14,
      outline: "none",
      resize: rows ? ("vertical" as const) : ("none" as const),
      transition: "border-color 200ms, box-shadow 200ms",
      boxShadow: focused ? "0 0 0 4px var(--accent-subtle)" : "none",
      appearance: "none" as const,
    },
  };
  return (
    <div style={{ position: "relative" }}>
      <label htmlFor={name} style={labelStyle(isFloating, focused)}>
        {label}
      </label>
      {rows ? (
        <textarea {...common} rows={rows} />
      ) : (
        <input {...common} type={type} />
      )}
      {error && (
        <p
          id={`${name}-error`}
          style={{
            fontSize: 12,
            color: "var(--error)",
            margin: "6px 0 0",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

function FloatingSelect({
  name,
  label,
  value,
  error,
  focused,
  isFloating,
  onChange,
  onFocus,
  onBlur,
  options,
}: FieldBase & {
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div style={{ position: "relative" }}>
      <label htmlFor={name} style={labelStyle(isFloating, focused)}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required
        aria-required="true"
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        style={{
          width: "100%",
          padding: "22px 14px 10px",
          background: "var(--bg-base)",
          color: value ? "var(--text-primary)" : "var(--text-muted)",
          border: "1px solid " + (focused ? "var(--accent)" : "var(--divider)"),
          borderRadius: 10,
          fontFamily: "var(--font-display)",
          fontSize: 14,
          outline: "none",
          transition: "border-color 200ms, box-shadow 200ms",
          boxShadow: focused ? "0 0 0 4px var(--accent-subtle)" : "none",
          cursor: "pointer",
          appearance: "none",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23787068' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.75rem center",
          backgroundSize: "16px",
          paddingRight: "2.5rem",
        }}
      >
        <option value="" />
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <p
          id={`${name}-error`}
          style={{
            fontSize: 12,
            color: "var(--error)",
            margin: "6px 0 0",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
