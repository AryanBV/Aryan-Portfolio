import { z } from "zod";
import { safeUrlSchema, safeImagePathSchema, safeLongText } from "@/lib/schema";

const certificateSchema = z.object({
  id: z.string().min(1),
  name: safeLongText,
  code: z.string().min(1),
  issuer: z.string().min(1),
  issued: z.string().min(1),
  verifyUrl: safeUrlSchema.optional(),
  image: safeImagePathSchema,
  description: safeLongText,
});

export type Certificate = z.infer<typeof certificateSchema>;

export const certificates: Certificate[] = z
  .array(certificateSchema)
  .min(1)
  .parse([
    {
      id: "az-900-ai",
      name: "Microsoft Azure AI Fundamentals (AI-900)",
      code: "AI-900",
      issuer: "Microsoft",
      issued: "2024",
      verifyUrl:
        "https://learn.microsoft.com/api/credentials/share/en-us/AryanSalian-4114/878ECBC7C3BE4794?sharingId=D3203799C3E8D012",
      image: "/images/microsoft-cert.png",
      description:
        "Core AI and machine learning concepts on Microsoft Azure — covering ML workloads, computer vision, NLP, and generative AI fundamentals.",
    },
    {
      id: "apna-alpha",
      name: "Java & Data Structures — Alpha Batch",
      code: "ALPHA",
      issuer: "Apna College",
      issued: "2023",
      image: "/images/alpha-certificate.png",
      description:
        "Comprehensive Java and Data Structures & Algorithms course — covering arrays, linked lists, trees, graphs, dynamic programming, OOP, and placement-ready problem solving.",
    },
    {
      id: "apna-delta",
      name: "Full Stack Web Development — Delta Batch",
      code: "DELTA",
      issuer: "Apna College",
      issued: "2024",
      image: "/images/delta-certificate.png",
      description:
        "Complete MERN stack development — HTML, CSS, JavaScript, Node.js, Express.js, React, MongoDB, REST APIs, and full-stack deployment.",
    },
  ]);
