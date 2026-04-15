interface JsonLdProps {
  data: Record<string, unknown>;
  id?: string;
}

// Safe inline JSON-LD. HTML-escapes sensitive characters so no field value
// can break out of the script tag, and escapes U+2028/U+2029 which are
// valid in JSON but terminate JavaScript string literals.
export function JsonLd({ data, id }: JsonLdProps) {
  const json = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
