interface SafeExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

// Renders target="_blank" rel="noopener noreferrer" only when href is
// http or https. Non-http(s) schemes render as plain <span>, so nothing
// clickable reaches the DOM. Defense in depth on top of safeUrlSchema at
// the data layer.
export function SafeExternalLink({
  href,
  children,
  ...rest
}: SafeExternalLinkProps) {
  const isSafe = /^https?:\/\//i.test(href);
  if (!isSafe) return <span {...rest}>{children}</span>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
