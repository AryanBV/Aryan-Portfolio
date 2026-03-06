"use client";

import { FiGithub, FiLinkedin } from "react-icons/fi";

const SOCIAL_LINKS = {
  github: "https://github.com/aryanbv",
  linkedin: "https://www.linkedin.com/in/aryan-b-v-78aa63246/",
};

export default function Footer() {
  return (
    <footer
      className="w-full py-8 px-6"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-sm"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          © {new Date().getFullYear()} Aryan B V
        </p>

        <div className="flex items-center gap-5">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            <FiGithub size={18} />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            <FiLinkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
