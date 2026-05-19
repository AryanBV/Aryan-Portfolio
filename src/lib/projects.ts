import { z } from "zod";
import { safeUrlSchema, safeImagePathSchema, safeLongText } from "@/lib/schema";

// ─── Project data (shared between homepage cards + case study pages) ─────────

export type ProjectStatus = "Live" | "Prototype";
export type ProjectKind = "web-app" | "library" | "mcp-server" | "cli";

export interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface ProjectInstall {
  label: string;
  command: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  kind: ProjectKind;
  tech: string[];
  links: ProjectLinks;
  image?: string;
  install?: ProjectInstall[];
  metrics?: ProjectMetric[];
  terminalPreview?: string[];
  caseStudy?: {
    tagline: string;
    challenge: string;
    approach: string;
    impact: string;
    techDetails: { name: string; reason: string }[];
  };
}

// ─── Runtime schema (validates conformance to the Project interface) ─────────
// The interface above is the compile-time source of truth; this schema enforces
// the same shape at module-load, catching typos and drift at build time.

const projectKindSchema = z.enum(["web-app", "library", "mcp-server", "cli"]);
const projectStatusSchema = z.enum(["Live", "Prototype"]);

const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must be kebab-case"),
  title: safeLongText,
  tagline: safeLongText,
  description: safeLongText,
  status: projectStatusSchema,
  kind: projectKindSchema,
  tech: z.array(z.string().min(1)).min(1),
  links: z.object({
    live: safeUrlSchema.optional(),
    github: safeUrlSchema.optional(),
  }),
  image: safeImagePathSchema.optional(),
  install: z
    .array(
      z.object({
        label: z.string().min(1),
        command: z.string().min(1),
      }),
    )
    .optional(),
  metrics: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
      }),
    )
    .optional(),
  terminalPreview: z.array(z.string()).optional(),
  caseStudy: z
    .object({
      tagline: safeLongText,
      challenge: safeLongText,
      approach: safeLongText,
      impact: safeLongText,
      techDetails: z
        .array(
          z.object({
            name: z.string().min(1),
            reason: safeLongText,
          }),
        )
        .min(1),
    })
    .optional(),
});

const projectsSchema = z.array(projectSchema).min(1);

// Index 0 is the featured project by convention.
// Adding a new "on top" project means inserting at index 0 — no flag to flip.
export const projects: Project[] = projectsSchema.parse([
  {
    slug: "pdf-edit-engine",
    title: "pdf-edit-engine",
    tagline: "Format-preserving PDF text editing at the content-stream level",
    description:
      "A Python library that edits text in existing PDFs by modifying content-stream operators in place — preserving the original font, kerning, and exact pixel positioning instead of redact-and-replace. Every edit returns a structured FidelityReport so automated pipelines and AI agents can verify quality programmatically, and the engine powers a companion MCP server that exposes 38 tools to agents. v0.1.2 adds an 81-probe invariant audit suite across 14 layers as a permanent regression guard against future drift.",
    status: "Live",
    kind: "library",
    tech: [
      "Python 3.12",
      "pikepdf",
      "fonttools",
      "pdfminer.six",
      "pytest",
      "mypy strict",
    ],
    links: {
      live: "https://pypi.org/project/pdf-edit-engine/",
      github: "https://github.com/AryanBV/pdf-edit-engine",
    },
    install: [{ label: "pip", command: "pip install pdf-edit-engine" }],
    metrics: [
      { label: "tests", value: "660+" },
      { label: "coverage", value: "88%" },
      { label: "audit probes", value: "81" },
    ],
    terminalPreview: [
      "$ pip install pdf-edit-engine",
      "Installed pdf-edit-engine 0.1.2",
      "",
      ">>> from pdf_edit_engine import replace",
      '>>> r = replace("invoice.pdf",',
      '...     "$12,500", "$13,250",',
      '...     "invoice-v2.pdf")',
      ">>> r.fidelity_report.font_preserved",
      "True",
    ],
    caseStudy: {
      tagline:
        "Change the words in a PDF without touching the layout — operator-level content-stream surgery that preserves fonts, kerning, and pixel-exact positioning.",
      challenge:
        "Editing text in an existing PDF is a constant need — names, dates, typos, labels — but PDF was designed as a display format, not an editing format. Text is stored as positioned glyph indices, not editable strings, which is why every mainstream tool falls back to one of two approaches: redact the area and stamp new text over it with a substitute font, or extract to another format and re-render. Both silently destroy the original fonts, kerning, and exact pixel positioning. I hit this wall while building pdf-toolkit-mcp and realised there was no production-grade library that could change the words in a PDF while keeping everything else identical.",
      approach:
        "Instead of treating a PDF as a document, pdf-edit-engine treats it as an instruction stream. It interprets the content-stream operators inside BT/ET blocks, tracks graphics state — transformation matrix, active font, colour — and modifies the operators themselves. Where PyMuPDF — the mainstream Python tool — covers the original text with a white rectangle and stamps replacement text with a substitute font, pdf-edit-engine keeps the original glyphs and just changes the operators that position them. A two-tier font system extends embedded subsets on demand: a CMap-only fast path when the needed glyphs already exist in the font binary, and a full re-embed with --retain-gids when they don't. Replacement text has its kerning redistributed across glyphs so the output preserves the original string width exactly — no visible spacing gaps. Every edit returns a structured FidelityReport (font_preserved, overflow_detected, reflow_applied, glyphs_missing) so automated pipelines and AI agents can verify quality programmatically without visual review. Every function also supports dry_run=True to preview the report before touching disk.",
      impact:
        "Shipped to PyPI as pdf-edit-engine v0.1.0 with 660+ tests at 88% coverage under mypy strict. An 81-probe invariant audit suite across 14 layers runs as a permanent regression guard on every change. The CI matrix validates the engine against seven PDF generators (Chrome, Google Docs, four reportlab variants, pikepdf synthetic) with 100% character agreement across all of them. Benchmarks on a 100-page PDF: 0.3 s to index 900 matches, 0.03 s to replace on a single page, 0.1 s for a 50-edit batch, under 500 MB of memory. The engine powers pdf-edit-mcp — a 38-tool MCP server that brings format-preserving editing to AI agents.",
      techDetails: [
        {
          name: "Python 3.12 + pikepdf",
          reason:
            "pikepdf gives byte-level access to content streams and can unparse modified operators back into a valid PDF — the foundation of the in-place edit approach.",
        },
        {
          name: "fonttools",
          reason:
            "Font introspection, CMap parsing, and glyph metrics drive both the two-tier subset-extension algorithm and the kerning-redistribution that preserves original text widths.",
        },
        {
          name: "pdfminer.six",
          reason:
            "Position-aware text extraction. The engine correlates pdfminer's layout with pikepdf's content streams so operator-level edits target the correct glyphs.",
        },
        {
          name: "pytest + mypy strict",
          reason:
            "628 tests across seven PDF generators catch encoding and font edge cases; mypy strict keeps the public API type-safe so downstream tools like pdf-edit-mcp get reliable typings.",
        },
      ],
    },
  },
  {
    slug: "pdf-edit-mcp",
    title: "pdf-edit-mcp",
    tagline: "38-tool MCP server for format-preserving PDF editing",
    description:
      "TypeScript MCP server that exposes pdf-edit-engine's capabilities to AI agents over the Model Context Protocol — 38 tools across 7 categories, 3 built-in workflow prompts, and a long-running Python bridge that eliminates per-request interpreter startup. Every input is validated by Zod before it reaches Python, and every edit returns a FidelityReport agents can inspect to verify quality.",
    status: "Live",
    kind: "mcp-server",
    tech: [
      "TypeScript",
      "Node.js 20",
      "MCP SDK",
      "Zod",
      "Python 3.12",
      "JSON-RPC",
    ],
    links: {
      live: "https://www.npmjs.com/package/@aryanbv/pdf-edit-mcp",
      github: "https://github.com/AryanBV/pdf-edit-mcp",
    },
    install: [
      {
        label: "Claude Code",
        command: "claude mcp add pdf-edit-mcp -- npx -y @aryanbv/pdf-edit-mcp",
      },
      { label: "npm", command: "npx -y @aryanbv/pdf-edit-mcp" },
    ],
    metrics: [
      { label: "tools", value: "38" },
      { label: "categories", value: "7" },
      { label: "prompts", value: "3" },
    ],
    terminalPreview: [
      "$ npx -y @aryanbv/pdf-edit-mcp",
      "[mcp] ready · 38 tools · 3 prompts",
      "",
      '> pdf_inspect { "pdf_path": "quote.pdf" }',
      "✓ 4 pages · 2 fonts · 12 annotations",
      "",
      '> pdf_batch_replace { "edits": [...] }',
      "✓ font_preserved · overflow: false",
    ],
    caseStudy: {
      tagline:
        "Bringing format-preserving PDF editing to AI agents — 38 tools, three guided workflows, one long-running Python bridge.",
      challenge:
        "Once pdf-edit-engine existed as a Python library, the next question was how to make it usable by AI agents. A naïve MCP server would spawn a fresh Python process per tool call — tens of milliseconds of interpreter startup on every request, which compounds over batch operations. And without structured workflows, agents would have no idea when to inspect a PDF, when to call analyze_subset before editing, or how to combine 38 tools into a coherent edit. Simply exposing the library's functions one-for-one would be a usability failure even if it technically worked.",
      approach:
        "pdf-edit-mcp is a TypeScript MCP server that spawns bridge.py once at startup and keeps it alive for the entire session, communicating over stdio via JSON-RPC 2.0. Zod schemas validate every input at the TypeScript boundary before it ever hits Python, so malformed agent requests never reach the engine. The 38 tools are organised into seven categories (reading, text edits, block ops, section ops, annotations, document manipulation, metadata/security) and backed by three built-in MCP prompts that teach agents the canonical workflow: quick-pdf-edit for typos and dates, section-swap for structural rewrites (including the subtle requirement that batch_replace_block must include all sibling sections for uniform spacing), and comprehensive-pdf-edit for multi-step edits. Every tool result surfaces pdf-edit-engine's FidelityReport so agents can verify quality before calling it done.",
      impact:
        "Published to npm as @aryanbv/pdf-edit-mcp, installable in one command across Claude Desktop, Claude Code, Cursor, Windsurf, and VS Code. The long-running Python bridge eliminates interpreter startup from the hot path, so a 500-edit batch call runs in essentially the same time as calling the engine directly. The three built-in prompts are workflow scaffolding agents can reference by name — teaching them the inspect → analyze → execute → verify loop rather than leaving them to discover it.",
      techDetails: [
        {
          name: "Model Context Protocol SDK",
          reason:
            "Official @modelcontextprotocol/sdk for tool and prompt registration over stdio transport — the canonical implementation every major MCP client expects.",
        },
        {
          name: "Python subprocess bridge",
          reason:
            "Spawns bridge.py once at startup and keeps it alive for the whole session — eliminates per-request Python startup and makes batch operations fast.",
        },
        {
          name: "Zod",
          reason:
            "Runtime input validation at the TypeScript boundary. Agents generate unpredictable arguments; Zod catches them before they reach Python, and the schemas double as the MCP tool parameter specs.",
        },
        {
          name: "JSON-RPC 2.0 over stdio",
          reason:
            "Standard IPC format between the TypeScript server and the Python bridge. stdout is the IPC channel; all logging routes to stderr so it never contaminates the protocol stream.",
        },
      ],
    },
  },
  {
    slug: "pdf-toolkit-mcp",
    title: "pdf-toolkit-mcp",
    tagline: "Zero-config MCP server for creating and manipulating PDFs",
    description:
      "TypeScript MCP server that exposes 16 tools for the PDF workflows people actually use — create rich PDFs from Markdown with tables and page numbers, generate invoices from structured data, merge/split/rotate, fill forms, embed QR codes and barcodes, and password-encrypt. Installable with a single npx command — no config, no API keys, no Docker — and listed on the official MCP Registry.",
    status: "Live",
    kind: "mcp-server",
    tech: [
      "TypeScript",
      "Node.js 18",
      "MCP SDK",
      "pdfmake",
      "@pdfme/pdf-lib",
      "unpdf",
    ],
    links: {
      live: "https://www.npmjs.com/package/@aryanbv/pdf-toolkit-mcp",
      github: "https://github.com/AryanBV/pdf-toolkit-mcp",
    },
    install: [
      {
        label: "Claude Code",
        command:
          "claude mcp add pdf-toolkit -- npx -y @aryanbv/pdf-toolkit-mcp",
      },
      { label: "npm", command: "npx -y @aryanbv/pdf-toolkit-mcp" },
    ],
    metrics: [
      { label: "tools", value: "16" },
      { label: "tests", value: "51" },
      { label: "MCP Registry", value: "listed" },
    ],
    terminalPreview: [
      "$ npx -y @aryanbv/pdf-toolkit-mcp",
      "[mcp] pdf-toolkit ready · 16 tools",
      "",
      "> pdf_create_from_markdown {",
      '    "markdown": "# Q1 2026 Review\\n..."',
      "  }",
      "✓ q1-review.pdf · 3 pages · 47 KB",
    ],
    caseStudy: {
      tagline:
        "The standout feature is what most users actually want — turn a Markdown document into a professional PDF with one tool call. No design software, no templates, no friction.",
      challenge:
        "Most PDF tools expect a designer's workflow: open Acrobat or InDesign, lay out a document, export. For AI agents and developers who just need a PDF of a Markdown report, an invoice for a client, or a filled-in form, that workflow is overkill. The existing PDF libraries are either Python-only (closed to Node and TypeScript agents), require Docker or API keys (blocking local-first agents), or handle creation and manipulation in two different ecosystems that don't talk to each other. The result is that a simple prompt like 'turn this Markdown into a PDF with page numbers' typically becomes a multi-step manual pipeline.",
      approach:
        "pdf-toolkit-mcp is a single TypeScript MCP server installable via npx -y @aryanbv/pdf-toolkit-mcp — no config files, no API keys, no Docker, no network calls. Internally it uses a dual-engine architecture: pdfmake for rich document creation (Markdown-to-PDF with headings, tables, lists, code blocks, page numbers; templates for invoice/report/letter), @pdfme/pdf-lib for manipulation of existing PDFs (merge, split, rotate, watermark, forms, image embedding), and unpdf for text extraction and metadata. 16 tools across six categories (create, read, modify, enhance, forms, security), three MCP prompts to guide usage, and security hardening from day one (path validation, page caps, prototype-pollution guards). 51 tests run on CI and gate every release.",
      impact:
        "Published to npm as @aryanbv/pdf-toolkit-mcp and listed on the official MCP Registry as io.github.AryanBV/pdf-toolkit-mcp — a discoverability bar that requires production-grade packaging. Runs in every major MCP client (Claude Desktop, Claude Code, Cursor, Windsurf, VS Code) with a single line of config. This was the first project in the trilogy: it taught me how MCP servers work, and running into the limits of library-wrapper PDF editing is exactly what started me down the path to pdf-edit-engine.",
      techDetails: [
        {
          name: "pdfmake",
          reason:
            "Rich document creation from structured data — the Markdown-to-PDF pipeline, tables with styling, templates for invoice/report/letter, and page numbers/headers/footers.",
        },
        {
          name: "@pdfme/pdf-lib",
          reason:
            "Fork of pdf-lib used for modifying existing PDFs — merge, split, rotate, watermark, form filling, image embedding. Pairs with pdfmake to cover both create-from-scratch and edit-existing workflows.",
        },
        {
          name: "unpdf",
          reason:
            "Lightweight text and metadata extraction — zero external dependencies, matching the 'works offline' constraint that lets the server run in any MCP client without setup.",
        },
        {
          name: "Model Context Protocol SDK",
          reason:
            "Official @modelcontextprotocol/sdk for tool registration plus the three built-in prompts. Published via the MCP Registry for discoverability.",
        },
      ],
    },
  },
  {
    slug: "ajsp-manager",
    title: "AJSP Manager",
    tagline: "Business management PWA for a family-run spare parts shop",
    description:
      "Full-stack PWA running daily at my family's automotive spare parts retailer in Karnataka. Tracks purchases, payments, sales, funds, and loans — replacing a 15-year Excel workflow. An inventory counting system is built and ready for the next six-monthly count; everything else is already in daily production use.",
    status: "Live",
    kind: "web-app",
    tech: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "PWA"],
    links: {},
    image: "/images/AJSP-Manager.png",
    caseStudy: {
      tagline:
        "A full-stack PWA that replaced a 15-year Excel workflow for my family's automotive spare parts shop.",
      challenge:
        "Amar Jyothi Spare Parts is my family's automotive spare parts retail shop in Karnataka. For about 15 years, the business tracked purchases, payments, and sales in Excel spreadsheets. Month-end was a slow manual tally, the spreadsheets grew brittle as formulas broke with every new row, and there was no single place to see where the business actually stood. Every six months, the entire stock also had to be counted by hand — writing down every item, counting quantities, then calculating the total stock value on paper.",
      approach:
        "I built a full-stack PWA using Next.js, Supabase, and TypeScript. The app tracks purchases, payments, and sales in real time — purchases entered as they happen, payments marked when cleared, and monthly summaries that show exactly where the business stands without a manual tally. Fund management and loan tracking were added later and are also in daily use. The inventory-count module is fully implemented and waiting for the next six-monthly count: every item is already in the system, so the count becomes 'enter the quantity, let the app do the math.' As a PWA, it is installable on the owner's and my mother's phones and works without any app-store distribution.",
      impact:
        "The app is used daily by the family business and has replaced the 15-year Excel workflow for purchases, payments, sales, funds, and loans. Monthly visibility into performance is now a single screen instead of hand-reconciled spreadsheets. The inventory counting module is built and ready for the next six-monthly count — switching that process over is the last remaining step before AJSP Manager replaces Excel end-to-end.",
      techDetails: [
        {
          name: "Next.js",
          reason:
            "Full-stack framework — handles UI, Server Actions, and API routes in one codebase, with App Router + Server Components for fast navigation.",
        },
        {
          name: "Supabase",
          reason:
            "PostgreSQL + Auth + Storage in one platform. Google OAuth with a 2-email whitelist means no sign-up flow to build, and invoice photos live in Supabase Storage right next to their rows.",
        },
        {
          name: "TypeScript + Zod",
          reason:
            "Strict types end to end, with Zod validating every form input both client- and server-side so bad data never reaches the database.",
        },
        {
          name: "PWA",
          reason:
            "Installable on the owner's and my mother's phones straight from the URL — no app store, no review process, and offline-tolerant for when the shop's connection drops.",
        },
      ],
    },
  },
  {
    slug: "lumina-crafts",
    title: "Lumina Crafts",
    tagline: "E-commerce platform for handmade goods",
    description:
      "Full-stack e-commerce platform with product catalogue, cart, checkout with payment integration, and a complete admin dashboard for inventory and order management.",
    status: "Live",
    kind: "web-app",
    tech: ["Next.js", "Supabase", "TypeScript", "Razorpay"],
    links: {
      github: "https://github.com/AryanBV/lumina-crafts",
      live: "https://lumina-crafts.vercel.app/",
    },
    image: "/images/Lumina-Craft.png",
    caseStudy: {
      tagline:
        "A custom e-commerce platform for a handmade premium candle brand, with full admin dashboard and Razorpay checkout.",
      challenge:
        "A client needed a custom e-commerce platform to sell handmade premium candles — a branded storefront with product browsing, cart, and checkout, plus a full admin dashboard for managing inventory and orders.",
      approach:
        "I built the platform using Next.js for the frontend and Supabase for the database and auth layer. The storefront includes product browsing, a cart system, and a complete checkout flow with Razorpay integrated for payment processing (currently in test mode). On the backend, there's a full admin dashboard where the client can manage products, track inventory, and view orders.",
      impact:
        "The platform is fully built and deployed on Vercel. The client has not yet launched with real products — the storefront is live with placeholder content while they prepare their product line. The technical foundation is complete: storefront, admin dashboard, payment integration, and deployment infrastructure are all in place.",
      techDetails: [
        {
          name: "Next.js",
          reason: "Server-rendered storefront for fast page loads and SEO",
        },
        {
          name: "Supabase",
          reason:
            "Database, auth, and storage for product images and order data",
        },
        {
          name: "Razorpay",
          reason:
            "Payment gateway for the Indian market — integrated in test mode",
        },
        { name: "Vercel", reason: "Deployment and hosting" },
      ],
    },
  },
  {
    slug: "trade-code",
    title: "TradeCode",
    tagline: "AI-powered HS code classification for Indian exporters",
    description:
      "A web app that classifies products against the 10,468-code Indian HS taxonomy using a hybrid pipeline — keyword matching, decision-tree rules, and GPT-4o-mini reasoning combined through a confidence aggregator. Returns a classification in under thirty seconds with a confidence score and per-result reasoning, so exporters can audit the answer before they file. Built to address a real cost: misclassification carries ₹50K–5L customs penalties and customs consultants charge ₹2K–10K per lookup, while doing it manually takes 30+ minutes per product.",
    status: "Live",
    kind: "web-app",
    tech: ["Next.js", "TypeScript", "Supabase", "Prisma", "OpenAI", "Tailwind"],
    links: {
      live: "https://hs-code-classifier.vercel.app",
      github: "https://github.com/AryanBV/hs-code-classifier",
    },
    metrics: [
      { label: "HS codes", value: "10,468" },
      { label: "classification", value: "<30s" },
      { label: "model", value: "GPT-4o-mini" },
    ],
    caseStudy: {
      tagline:
        "Replacing 30-minute manual HS code lookups — and the ₹2K–10K consultant fees that go with them — with a sub-30-second AI classifier that shows its reasoning.",
      challenge:
        "Every Indian exporter has to assign an HS code to every product they ship, and getting it wrong is costly: customs authorities can levy penalties of ₹50K–5L per misclassified shipment. Manually mapping a product to the right code takes 30+ minutes per item against a catalogue of thousands, and most small exporters end up paying customs consultants ₹2K–10K per classification because the cost of being wrong dwarfs the consultant fee.",
      approach:
        "TradeCode combines three classification signals over an indexed catalogue of 10,468 HS codes: keyword matching for fast exact hits, decision-tree rules that encode the structural hierarchy of the HS taxonomy, and GPT-4o-mini reasoning for ambiguous cases the rule-based layer can't resolve. The three signals feed into a confidence aggregator that returns a single classification along with a confidence score and a human-readable explanation. A query that previously took thirty minutes returns in under thirty seconds, and because the model's reasoning is surfaced inline, exporters can audit the answer before they file rather than trusting a black-box decision.",
      impact:
        "The tool classifies any product against the 10,468-code Indian HS taxonomy in under thirty seconds — collapsing a 30+ minute manual workflow and removing the need to pay ₹2K–10K to a customs consultant for each lookup. Live at hs-code-classifier.vercel.app, the full hybrid pipeline (keyword + rules + GPT-4o-mini) runs end-to-end with confidence scores and per-classification reasoning surfaced inline.",
      techDetails: [
        {
          name: "Next.js",
          reason:
            "App Router for the classifier UI plus server-side routes for the keyword and rule passes — one codebase across frontend and backend.",
        },
        {
          name: "Supabase + Prisma",
          reason:
            "Postgres on Supabase holds the 10,468-row HS code catalogue; Prisma is the typed access layer so the schema and TypeScript stay in lockstep.",
        },
        {
          name: "OpenAI GPT-4o-mini",
          reason:
            "Reasoning layer for the cases the keyword and rule passes can't disambiguate — chosen for the cost/latency profile that keeps classifications under thirty seconds.",
        },
        {
          name: "Shadcn/ui + Tailwind",
          reason:
            "Accessible component primitives over Tailwind utilities — fast iteration on the classifier UI without building a bespoke design system.",
        },
      ],
    },
  },
  {
    slug: "smart-med",
    title: "SMART_MED",
    tagline: "AI-powered family health management app",
    description:
      "AI-powered diabetes management system with interactive family tree visualization and medical document OCR. Upload prescriptions, extract medicine names automatically, and manage family health profiles with hierarchical access control.",
    status: "Prototype",
    kind: "web-app",
    tech: ["React", "TypeScript", "Express", "MySQL", "Tesseract.js"],
    links: {
      github: "https://github.com/AryanBV/SMART_MED_2.0",
    },
    image: "/images/smart-med.png",
  },
]);

// ─── Derived accessors ───────────────────────────────────────────────────────

export function getFeaturedProject(): Project {
  return projects[0];
}

export function getRestProjects(): Project[] {
  return projects.slice(1);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectCaseStudyRoute(project: Project): string | null {
  return project.caseStudy ? `/projects/${project.slug}` : null;
}

export function getProjectSlugs(): string[] {
  return projects.filter((p) => p.caseStudy).map((p) => p.slug);
}
