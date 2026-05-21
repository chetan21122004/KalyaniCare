import Link from "next/link";

export type BlogCrumb = { label: string; href: string };

type BlogBreadcrumbsProps = {
  items: BlogCrumb[];
};

export function BlogBreadcrumbs({ items }: BlogBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, idx) => {
          const last = idx === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {idx > 0 ? <span className="text-foreground/30" aria-hidden>/</span> : null}
              {last ? (
                <span className="max-w-[min(72vw,28rem)] truncate font-medium text-foreground/85">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="font-medium hover:text-primary transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
