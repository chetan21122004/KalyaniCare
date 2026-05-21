import type { BlogSectionBlock } from "@/lib/blog";
import { BlogRichParagraph } from "@/app/components/blog/BlogRichParagraph";

export function BlogArticleBody({ sections }: { sections: BlogSectionBlock[] }) {
  return (
    <div className="space-y-10 max-w-none">
      {sections.map((block, idx) => (
        <section key={`${idx}-${block.heading ?? ""}`} className="space-y-4">
          {block.heading ? (
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-primary-deep tracking-tight">
              <BlogRichParagraph>{block.heading}</BlogRichParagraph>
            </h2>
          ) : null}
          {block.paragraphs.map((p, pi) => (
            <p
              key={`${idx}-p-${pi}`}
              className="text-base md:text-[1.05rem] leading-relaxed text-foreground/85"
            >
              <BlogRichParagraph>{p}</BlogRichParagraph>
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}
