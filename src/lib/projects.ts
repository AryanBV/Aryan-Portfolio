// ─── Project data (shared between homepage cards + case study pages) ─────────

export type ProjectStatus = "Live" | "Prototype";

export interface ProjectLink {
  caseStudy?: string;
  live?: string;
  github?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  featured?: boolean;
  tech: string[];
  links: ProjectLink;
  image?: string;
  caseStudy?: {
    tagline: string;
    challenge: string;
    approach: string;
    impact: string;
    techDetails: { name: string; reason: string }[];
  };
}

export const projects: Project[] = [
  {
    slug: "ajsp-manager",
    title: "AJSP Manager",
    tagline: "Automotive retail business management system",
    description:
      "Client-commissioned full-stack business management system running daily at an automotive spare parts retailer in Karnataka. Handles inventory tracking, billing, supplier management, and daily operations — replacing a manual paper-based workflow.",
    status: "Live",
    featured: true,
    tech: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "PWA"],
    links: {
      caseStudy: "/projects/ajsp-manager",
    },
    image: "/images/AJSP-Manager.png",
    caseStudy: {
      tagline:
        "A full-stack PWA that replaced a 15-year paper workflow for an automotive parts retailer.",
      challenge:
        "Amar Jyothi Spare Parts is an automotive parts retail business in Napoklu, Karnataka. For about 15 years, the business tracked inventory on paper notebooks and kept supplier records in physical files. Purchases, payments, and sales were all managed manually — purchases recorded as they happened, but sales tallied only once at the end of each month. Every six months, the entire stock had to be counted by hand: writing down every item name, counting quantities, then calculating the total stock value.",
      approach:
        "I built a full-stack PWA using Next.js and Supabase. The app tracks purchases, payments, and sales — purchases are entered as they happen, payments are recorded and marked when paid, and monthly summaries show total purchases, sales, and payments so the business knows exactly where it stands. For the bi-annual stock count, every item and its name is stored in the system. During a count, you enter only the quantity for each item, and the app calculates the total stock value automatically — eliminating the manual process of writing lists, counting, and calculating by hand. As a PWA, it is installable on mobile devices and accessible directly in the shop.",
      impact:
        "The app is used daily by the family business and has fully replaced the 15-year paper-based workflow. The bi-annual stock count — previously a manual process of listing every item, counting quantities, and calculating values — is now a matter of entering quantities while the system handles the rest. Monthly purchase, sale, and payment tracking gives clear visibility into business performance that didn't exist before.",
      techDetails: [
        {
          name: "Next.js",
          reason:
            "Full-stack framework — handles both the frontend UI and API routes in one codebase",
        },
        {
          name: "Supabase",
          reason:
            "PostgreSQL database with built-in auth and real-time capabilities",
        },
        {
          name: "PWA",
          reason:
            "Installable on mobile, accessible in the shop without needing an app store",
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
    tech: ["Next.js", "Supabase", "TypeScript", "Razorpay"],
    links: {
      caseStudy: "/projects/lumina-crafts",
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
    slug: "smart-med",
    title: "SMART_MED",
    tagline: "AI-powered family health management app",
    description:
      "AI-powered diabetes management system with interactive family tree visualization and medical document OCR. Upload prescriptions, extract medicine names automatically, and manage family health profiles with hierarchical access control.",
    status: "Prototype",
    tech: ["React", "TypeScript", "Express", "MySQL", "Tesseract.js"],
    links: {
      github: "https://github.com/AryanBV/SMART_MED_2.0",
    },
    image: "/images/smart-med.png",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.filter((p) => p.links.caseStudy).map((p) => p.slug);
}
