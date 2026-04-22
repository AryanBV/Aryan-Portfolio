import { z } from "zod";

// Shared Zod primitives. Every consumer in the app that accepts external
// URLs, image paths, long-text fields, or contact form input should use
// these instead of raw z.string() / z.url() — the raw primitives accept
// unsafe inputs (javascript:, protocol-relative paths, HTML breakout
// sequences) that these guards structurally reject.

export const safeUrlSchema = z
  .string()
  .refine((s) => /^https?:\/\//i.test(s), {
    message: "URL must use http or https scheme",
  })
  .pipe(z.url());

export const safeImagePathSchema = z
  .string()
  .refine((s) => s.startsWith("/") && !s.startsWith("//"), {
    message: "Image path must start with / and not //",
  });

export const noInlineScriptSchema = z
  .string()
  .refine(
    (s) => !/<\/script/i.test(s) && !/<!--/.test(s) && !/<!\[CDATA\[/.test(s),
    { message: "Contains HTML-sensitive breakout sequence" },
  );

export const safeLongText = z.string().min(1).pipe(noInlineScriptSchema);

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .max(254)
    .refine((s) => !/[\r\n]/.test(s), {
      message: "Email contains invalid characters",
    }),
  inquiry: z.enum(["freelance", "contract", "collaboration", "hello"], {
    message: "Please select an inquiry type",
  }),
  message: z.string().min(1, "Message is required").max(5000),
  website: z.string().max(0, { message: "bot" }),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
