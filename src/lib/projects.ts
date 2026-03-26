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
    tech: ["Next.js", "NestJS", "Supabase", "PostgreSQL", "TypeScript", "PWA"],
    links: {
      caseStudy: "/projects/ajsp-manager",
      github: "https://github.com/AryanBV/ajsp-manager",
    },
    image: "/images/AJSP-Manager.png",
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
  },
  {
    slug: "smart-med",
    title: "SMART_MED",
    tagline: "AI-powered family health management app",
    description:
      "Progressive web app for family health management. Uses OCR to digitize paper prescriptions, checks for drug interactions, and stores health records — built on a multi-agent AI architecture.",
    status: "Prototype",
    tech: ["Next.js", "OpenAI API", "TypeScript"],
    links: {
      github: "https://github.com/AryanBV/smart-med",
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
