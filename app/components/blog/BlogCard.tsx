import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { blogPostHref } from "@/lib/blog";

type BlogCardProps = {
  post: BlogPost;
  /** More descriptive anchor for SEO than “Read more”. */
  readLabel?: string;
};

export function BlogCard({ post, readLabel }: BlogCardProps) {
  const href = blogPostHref(post.slug);
  const label =
    readLabel ?? `Read: ${post.title}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-primary/15 bg-card shadow-card transition-all duration-300 hover:border-primary/35 hover:shadow-elevated">
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden shrink-0">
        <img
          src={post.coverImage.src}
          alt={post.coverImage.alt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          width={640}
          height={400}
        />
        <div className="absolute left-4 top-4">
          <span className="inline-flex rounded-full border border-white/35 bg-dark/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent backdrop-blur-sm">
            {post.category}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <time
          dateTime={post.updatedAt}
          className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"
        >
          Updated {formatBlogDate(post.updatedAt)} · {post.readingTimeMinutes} min read
        </time>
        <h2 className="font-display text-xl font-extrabold leading-snug tracking-tight text-primary-deep md:text-[1.35rem]">
          <Link href={href} className="transition-colors hover:text-primary">
            {post.title}
          </Link>
        </h2>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-foreground/70">{post.excerpt}</p>
        <div className="pt-2">
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors hover:text-primary-deep"
          >
            <span aria-label={label}>{label}</span>
            <span className="translate-x-0 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function formatBlogDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(`${iso}T12:00:00+05:30`));
  } catch {
    return iso;
  }
}
