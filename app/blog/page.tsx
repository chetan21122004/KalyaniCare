import type { Metadata } from "next";

import { BlogCard } from "@/app/components/blog/BlogCard";
import { BlogBreadcrumbs } from "@/app/components/blog/BlogBreadcrumbs";
import Footer from "@/app/components/site/Footer";
import Navbar from "@/app/components/site/Navbar";
import StickyWhatsApp from "@/app/components/site/StickyWhatsApp";
import { blogCanonicalUrl, getAllBlogPosts } from "@/lib/blog";
import { BRAND_NAME, getAbsoluteSiteUrl } from "@/lib/services";

const canonical = getAbsoluteSiteUrl("/blog");

export const metadata: Metadata = {
  title: "Maid & Home Help Tips & Guides",
  description:
    "Expert articles on hiring verified maids, salaries, verification, and home services across Hinjewadi IT Park, Wakad, and Pune—from SakhiHome.",
  keywords: [
    "maid tips Pune",
    "hire maid Hinjewadi",
    "domestic help blog",
    "SakhiHome guides",
    "maid verification Maharashtra",
  ],
  alternates: { canonical },
  openGraph: {
    title: "Maid & Home Help Tips & Guides",
    description:
      "Hiring guides, salaries, verification checklists & local Pune west advice from SakhiHome.",
    url: canonical,
    type: "website",
    locale: "en_IN",
    siteName: BRAND_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "Maid & Home Help Tips & Guides | SakhiHome",
    description:
      "Practical reads on maid hiring, costs, verification & services near Hinjewadi and Pune.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#collection`,
        name: `${BRAND_NAME} Blog`,
        headline: "Maid & home help tips for Pune households",
        description:
          "Guides on hiring domestic help near Hinjewadi IT Park, wages, verification, and what services include.",
        url: canonical,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${getAbsoluteSiteUrl("/")}#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: getAbsoluteSiteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: canonical,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: `${BRAND_NAME} articles`,
        numberOfItems: posts.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: posts.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: blogCanonicalUrl(p.slug),
          item: {
            "@type": "BlogPosting",
            headline: p.title,
            description: p.excerpt,
            url: blogCanonicalUrl(p.slug),
            datePublished: p.publishedAt,
            dateModified: p.updatedAt,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="relative overflow-hidden border-b border-primary/10 bg-gradient-soft">
            <div
              className="pointer-events-none absolute -top-28 right-[-10%] h-72 w-72 rounded-full bg-accent/25 blur-[100px]"
              aria-hidden
            />
            <div className="container relative mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
              <BlogBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} />
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-primary-deep md:text-5xl lg:text-[3.35rem] text-balance">
                Maid & home help <span className="text-gradient-brand">guides</span> for Pune
              </h1>
              <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/75">
                Actionable guides on budgeting, verifying candidates, understanding service types near Hinjewadi IT Park,
                Wakad, Baner—and how it maps to placements at SakhiHome.
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
            <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
        <StickyWhatsApp />
      </div>
    </>
  );
}
