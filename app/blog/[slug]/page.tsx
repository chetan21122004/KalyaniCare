import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogArticleBody } from "@/app/components/blog/BlogArticleBody";
import { BlogBreadcrumbs } from "@/app/components/blog/BlogBreadcrumbs";
import { BlogCard } from "@/app/components/blog/BlogCard";
import Footer from "@/app/components/site/Footer";
import Navbar from "@/app/components/site/Navbar";
import StickyWhatsApp from "@/app/components/site/StickyWhatsApp";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAreaBySlug } from "@/lib/areas";
import {
  areaNannyHref,
  blogCanonicalUrl,
  blogPostHref,
  getAllBlogSlugs,
  getBlogPostBySlug,
  getRelatedBlogPosts,
  blogPostOpenGraphArticleFields,
} from "@/lib/blog";
import { WHATSAPP } from "@/lib/contact";
import { BRAND_NAME, getAbsoluteSiteUrl, getServiceBySlug } from "@/lib/services";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return { title: "Article not found" };
  }

  const url = blogCanonicalUrl(post.slug);
  const ogArticle = blogPostOpenGraphArticleFields(post);
  const imageUrl = getAbsoluteSiteUrl(post.coverImage.src);

  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    keywords: [...post.keywords],
    alternates: { canonical: url },
    openGraph: {
      locale: "en_IN",
      siteName: BRAND_NAME,
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      ...ogArticle,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [imageUrl],
    },
  };
}

function formatBlogDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(`${iso}T12:00:00+05:30`));
  } catch {
    return iso;
  }
}

export default async function BlogPostPage(props: PageProps) {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const canonical = blogCanonicalUrl(post.slug);
  const homeUrl = getAbsoluteSiteUrl("/");
  const imageUrl = getAbsoluteSiteUrl(post.coverImage.src);
  const related = getRelatedBlogPosts(post.slug, 2);

  const structuredDataBlog: Record<string, unknown> = {
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    headline: post.title,
    description: post.excerpt,
    inLanguage: "en-IN",
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      caption: post.coverImage.alt,
    },
    author: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: homeUrl,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: homeUrl,
      logo: {
        "@type": "ImageObject",
        url: getAbsoluteSiteUrl("/assets/logo_only.png"),
      },
    },
    datePublished: `${post.publishedAt}T08:30:00+05:30`,
    dateModified: `${post.updatedAt}T08:30:00+05:30`,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    url: canonical,
  };

  if (typeof post.readingTimeMinutes === "number") {
    structuredDataBlog.timeRequired = `PT${post.readingTimeMinutes}M`;
  }

  const graph: Record<string, unknown>[] = [structuredDataBlog];

  graph.push({
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: homeUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: getAbsoluteSiteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  });

  if (post.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1">
          <article>
            <div className="relative overflow-hidden border-b border-primary/10">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-soft opacity-[0.55]"
                aria-hidden
              />
              <img
                src={post.coverImage.src}
                alt={post.coverImage.alt}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12]"
                aria-hidden
              />

              <div className="container relative mx-auto px-4 py-10 md:px-6 md:py-14 lg:py-16">
                <BlogBreadcrumbs
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Blog", href: "/blog" },
                    { label: post.title, href: blogPostHref(post.slug) },
                  ]}
                />
                <header className="mx-auto mt-8 max-w-3xl">
                  <span className="inline-flex rounded-full border border-primary/20 bg-background/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary shadow-sm backdrop-blur-sm">
                    {post.category}
                  </span>
                  <h1 className="mt-6 font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-primary-deep md:text-[2.6rem] lg:text-[2.85rem] text-balance">
                    {post.title}
                  </h1>
                  <p className="mt-5 text-base md:text-lg leading-relaxed text-foreground/80">{post.excerpt}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <time dateTime={post.publishedAt}>Published {formatBlogDate(post.publishedAt)}</time>
                    <span aria-hidden className="hidden sm:inline">
                      ·
                    </span>
                    <span>Updated {formatBlogDate(post.updatedAt)}</span>
                    <span aria-hidden>
                      ·
                    </span>
                    <span>{post.readingTimeMinutes} minute read</span>
                  </div>
                </header>
              </div>
            </div>

            <div className="container mx-auto px-4 py-10 md:px-6 md:py-14">
              <div className="mx-auto max-w-3xl">
                <BlogArticleBody sections={post.sections} />

                {post.relatedServiceSlugs.length > 0 ? (
                  <section className="mt-14 rounded-[1.5rem] border border-primary/15 bg-card p-6 shadow-card md:p-8">
                    <h2 className="font-display text-xl font-bold text-primary-deep md:text-2xl">Related KalyaniCare services</h2>
                    <ul className="mt-4 flex flex-wrap gap-2 md:gap-3">
                      {post.relatedServiceSlugs.map((s) => {
                        const svc = getServiceBySlug(s);
                        const href = `/services/${s}`;
                        return (
                          <li key={s}>
                            <Link
                              href={href}
                              className="inline-flex rounded-full border border-primary/20 bg-background px-3.5 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/5"
                            >
                              {svc?.title ?? s}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ) : null}

                {post.relatedAreaSlugs.length > 0 ? (
                  <section className="mt-8 rounded-[1.5rem] border border-border bg-muted/40 p-6 md:p-8">
                    <h2 className="font-display text-xl font-bold text-primary-deep md:text-2xl">Local nanny pages</h2>
                    <ul className="mt-4 space-y-2">
                      {post.relatedAreaSlugs.map((slug) => {
                        const area = getAreaBySlug(slug);
                        const href = areaNannyHref(slug);
                        return (
                          <li key={slug}>
                            <Link href={href} className="text-base font-semibold text-primary hover:underline">
                              Nanny service near {area?.name ?? slug.replace(/-/g, " ")}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ) : null}

                {post.faq?.length ? (
                  <section className="mt-14" aria-labelledby="blog-faq-heading">
                    <h2 id="blog-faq-heading" className="font-display text-xl font-bold text-primary-deep md:text-2xl">
                      Frequently asked questions
                    </h2>
                    <Accordion type="single" collapsible className="mt-4 w-full">
                      {post.faq.map((item, fi) => (
                        <AccordionItem key={fi} value={`faq-${post.slug}-${fi}`} className="border-border">
                          <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                          <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                ) : null}

                {related.length > 0 ? (
                  <section className="mt-16" aria-labelledby="related-posts-heading">
                    <h2 id="related-posts-heading" className="font-display text-2xl font-extrabold text-primary-deep">
                      More guides
                    </h2>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      {related.map((p) => (
                        <BlogCard key={p.slug} post={p} />
                      ))}
                    </div>
                  </section>
                ) : null}

                <aside className="mt-14 rounded-[1.75rem] border border-accent/35 bg-gradient-to-br from-accent/15 via-background to-background p-6 md:p-8">
                  <h2 className="font-display text-xl font-bold text-primary-deep md:text-2xl">Ready to hire trusted child care?</h2>
                  <p className="mt-3 text-sm md:text-base text-foreground/75 leading-relaxed">
                    Tell us your timings, locality, child age, and routine. We&apos;ll match you from our verified network across Pune
                    west.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button variant="hero" size="lg" asChild>
                      <Link href="/#enquiry">Send an enquiry</Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                        WhatsApp KalyaniCare
                      </a>
                    </Button>
                  </div>
                </aside>
              </div>
            </div>
          </article>
        </main>
        <Footer />
        <StickyWhatsApp />
      </div>
    </>
  );
}
