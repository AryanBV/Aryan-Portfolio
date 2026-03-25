import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aryan B V — Full-Stack Developer & AI/ML Engineer",
    short_name: "Aryan B V",
    description:
      "Portfolio of Aryan B V — Full-Stack Developer and AI/ML Engineer",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#F5A623",
    icons: [
      { src: "/icon", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
