"use client";

import type { ReactNode } from "react";
import { SafeExternalLink } from "@/components/ui/safe-external-link";

interface MagneticLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

// Shared link style: left-origin underline + trailing arrow translate.
// `external` routes through SafeExternalLink (scheme guard + target=_blank).
export default function MagneticLink({
  href,
  children,
  className = "",
  external = false,
  onClick,
  style,
}: MagneticLinkProps) {
  const classes = `magnetic-link ${className}`.trim();
  if (external) {
    return (
      <SafeExternalLink href={href} className={classes} style={style}>
        {children}
      </SafeExternalLink>
    );
  }
  return (
    <a href={href} className={classes} onClick={onClick} style={style}>
      {children}
    </a>
  );
}
