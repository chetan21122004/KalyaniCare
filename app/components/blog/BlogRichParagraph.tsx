import Link from "next/link";

/** Renders Markdown-like inline `**bold**` and `**[label](href)**` for blog prose. */
export function BlogRichParagraph({ children: text }: { children: string }) {
  const parts = parseInlineSegments(text);
  return (
    <>
      {parts.map((segment, idx) =>
        typeof segment === "string" ? (
          segment
        ) : segment.kind === "bold" ? (
          <strong key={idx} className="font-semibold text-primary-deep">
            {segment.text}
          </strong>
        ) : (
          <Link
            key={idx}
            href={segment.href}
            className="font-semibold text-primary underline decoration-primary/35 underline-offset-2 transition-colors hover:text-primary-deep hover:decoration-primary"
          >
            {segment.label}
          </Link>
        ),
      )}
    </>
  );
}

type Segment =
  | string
  | { kind: "bold"; text: string }
  | { kind: "link"; label: string; href: string };

function parseInlineSegments(input: string): Segment[] {
  const out: Segment[] = [];
  let rest = input;

  while (rest.length > 0) {
    const linkMatch = rest.match(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/);
    if (linkMatch?.[1] && linkMatch[2]) {
      out.push({ kind: "link", label: linkMatch[1], href: linkMatch[2] });
      rest = rest.slice(linkMatch[0].length);
      continue;
    }

    const boldMatch = rest.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch?.[1]) {
      out.push({ kind: "bold", text: boldMatch[1] });
      rest = rest.slice(boldMatch[0].length);
      continue;
    }

    const idx = rest.indexOf("**");
    if (idx === -1) {
      out.push(rest);
      break;
    }
    if (idx > 0) {
      out.push(rest.slice(0, idx));
      rest = rest.slice(idx);
      continue;
    }

    // Leading "**" — treat as escaped literal to avoid infinite loop.
    out.push("*");
    rest = rest.slice(1);
  }

  return out;
}
