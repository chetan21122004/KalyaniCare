/**
 * Nanny-care blog catalog: SEO content, URLs, FAQ.
 */

import type { MetadataRoute } from "next";

import { BRAND_NAME, getAbsoluteSiteUrl } from "@/lib/services";

export type BlogSectionBlock = {
  heading?: string;
  paragraphs: string[];
};

export type BlogFaq = { question: string; answer: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  keywords: readonly string[];
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  category: string;
  tags: readonly string[];
  coverImage: { src: string; alt: string };
  sections: BlogSectionBlock[];
  faq?: BlogFaq[];
  relatedServiceSlugs: readonly string[];
  relatedAreaSlugs: readonly string[];
};

const posts: BlogPost[] = [
  {
    slug: "babysitter-vs-nanny-vs-ayah-pune-explained",
    title: "Babysitter vs Nanny vs Ayah in Pune: What to Hire",
    excerpt:
      "Compare short babysitting visits, regular daytime nannies, and ayah-style child care so you can brief KalyaniCare clearly.",
    metaTitle: "Babysitter vs Nanny vs Ayah in Pune | KalyaniCare Nanny Services",
    metaDescription:
      "Plain-English guide to choosing between babysitter, nanny, and ayah-style child care in Hinjewadi, Wakad, Baner, and Pune west.",
    keywords: [
      "babysitter vs nanny Pune",
      "ayah babysitter Pune",
      "nanny Hinjewadi",
      "daytime nanny Wakad",
      "infant caregiver Baner",
    ],
    publishedAt: "2026-04-08",
    updatedAt: "2026-06-08",
    readingTimeMinutes: 7,
    category: "Childcare",
    tags: ["babysitting", "nanny", "ayah", "Pune"],
    coverImage: {
      src: "/assets/blobs/color_grunge_pattern_liquidity_style_background.jpg",
      alt: "Calm Pune home backdrop representing babysitter and nanny care",
    },
    relatedServiceSlugs: ["babysitting"],
    relatedAreaSlugs: ["hinjewadi-phase-2", "wakad", "baner"],
    sections: [
      {
        heading: "Different names, different expectations",
        paragraphs: [
          "Families often use babysitter, nanny, ayah, aaya, and baby-care bai interchangeably. The right hire depends on hours, age of the child, feeding needs, diapering, language comfort, school handovers, and how much routine ownership you expect.",
          "A babysitter usually covers shorter windows. A daytime nanny provides regular continuity through meals, naps, play, and parent work hours. Ayah-style care often overlaps with infant routines, soothing, and culturally familiar child-care habits.",
        ],
      },
      {
        heading: "When a babysitter is enough",
        paragraphs: [
          "Choose babysitting for short blocks: after-school supervision, WFH meeting cover, evening care, tutor handovers, or a few hours when parents step out. Keep the scope child-focused and write down allowed snacks, screen limits, emergency contacts, and pickup rules.",
          "Part-day care works best when one parent or grandparent remains nearby for decisions. It is less suited to full routine management for infants unless the caregiver is booked regularly.",
        ],
      },
      {
        heading: "When you need a regular nanny",
        paragraphs: [
          "Choose nanny-style care when you need recurring daytime support across feeding, naps, supervised play, diaper changes, school-bus coordination, and predictable handovers. Continuity matters because children settle faster with familiar routines.",
          "Brief KalyaniCare with child age, preferred language, allergies, nap pattern, and any family rules. That makes profile matching much sharper than a generic request for 'baby care'.",
        ],
      },
    ],
    faq: [
      {
        question: "Can one caregiver do child care and housework?",
        answer:
          "Light child-related tasks can be discussed, such as feeding prep or toy tidying. General housekeeping should not be mixed into a child-care role unless clearly agreed.",
      },
      {
        question: "Should I do a trial before confirming?",
        answer:
          "Yes. A short trial helps you observe punctuality, comfort with the child, phone discipline, hygiene habits, and communication style.",
      },
    ],
  },
  {
    slug: "interview-checklist-for-babysitter-hinjewadi-wakad",
    title: "Interview Checklist Before You Hire a Babysitter Near Hinjewadi or Wakad",
    excerpt:
      "Practical questions for safety, routines, timing, references, society gate rules, and trial days before confirming a babysitter.",
    metaTitle: "Babysitter Interview Checklist Pune | Hinjewadi & Wakad | KalyaniCare",
    metaDescription:
      "Use this checklist before hiring a babysitter or nanny in Hinjewadi, Wakad, Megapolis, Baner, and Pune west.",
    keywords: [
      "babysitter interview questions Pune",
      "hire babysitter Hinjewadi checklist",
      "nanny screening Wakad",
      "verified babysitter IT Park Pune",
    ],
    publishedAt: "2026-04-26",
    updatedAt: "2026-06-08",
    readingTimeMinutes: 8,
    category: "Safety",
    tags: ["babysitting", "hiring", "safety"],
    coverImage: {
      src: "/assets/blobs/063602423687.jpg",
      alt: "Comfortable Pune home where parents interview a babysitter",
    },
    relatedServiceSlugs: ["babysitting"],
    relatedAreaSlugs: ["hinjewadi-phase-3", "megapolis-hinjewadi"],
    sections: [
      {
        heading: "Start with the daily routine",
        paragraphs: [
          "Ask the caregiver to walk through a sample day for your child's age: arrival, handwash, feeding, nap, play, outdoor time, school-bus pickup, and parent handover. Good answers are specific and calm.",
          "Clarify what is not allowed: unsupervised balcony time, phone scrolling while the child is awake, unknown visitors, unapproved food, or taking the child outside society gates without permission.",
        ],
      },
      {
        heading: "Ask safety scenario questions",
        paragraphs: [
          "Use simple scenarios: the child has a fever, a toddler swallows a small object, a neighbour asks to take the child downstairs, or the parent is unreachable for ten minutes. You are looking for composure, honesty, and escalation instinct.",
          "Share emergency contacts, preferred hospital, allergies, and medicine rules in writing. A verbal-only handover is too fragile for child care.",
        ],
      },
      {
        heading: "Check references and trial fit",
        paragraphs: [
          "Ask for prior child-care experience, age groups handled, reason for leaving the last family, and whether previous employers can confirm punctuality and conduct.",
          "During trial, observe how the child responds, whether the caregiver asks good questions, and whether she respects your instructions without becoming defensive.",
        ],
      },
    ],
    faq: [
      {
        question: "Should the child be present during the interview?",
        answer:
          "Yes, if practical. You can observe natural comfort, tone, patience, and how the caregiver responds to the child's cues.",
      },
      {
        question: "What documents should I ask for?",
        answer:
          "Ask for ID, address proof, emergency contact, reference details, and any society gate registration documents needed by your building.",
      },
    ],
  },
  {
    slug: "babysitter-cost-pune-hinjewadi-wakad-2026",
    title: "How Much Does a Babysitter or Daytime Nanny Cost in Pune?",
    excerpt:
      "Understand what affects nanny and babysitter pricing around Hinjewadi, Wakad, Baner, Megapolis, and Pune west.",
    metaTitle: "Babysitter & Nanny Cost in Pune | Hinjewadi, Wakad & Baner | KalyaniCare",
    metaDescription:
      "Guide to babysitter and daytime nanny costs in Pune west, including timing, child age, duties, society access, and replacement support.",
    keywords: [
      "babysitter cost Pune",
      "nanny salary Hinjewadi",
      "daytime nanny rates Wakad",
      "babysitting charges Baner",
    ],
    publishedAt: "2026-05-12",
    updatedAt: "2026-06-08",
    readingTimeMinutes: 7,
    category: "Pricing",
    tags: ["babysitting", "salary", "Pune west"],
    coverImage: {
      src: "/assets/blobs/254596558522.jpg",
      alt: "Family budgeting context for Pune babysitter and nanny monthly costs",
    },
    relatedServiceSlugs: ["babysitting"],
    relatedAreaSlugs: ["hinjewadi-phase-1", "hinjewadi-phase-3", "wakad"],
    sections: [
      {
        heading: "What changes the price",
        paragraphs: [
          "Cost depends on hours, child age, number of children, infant-care experience, commute, language preference, weekend needs, and whether the role includes child-related chores like feeding prep or toy tidying.",
          "A short babysitting window is priced differently from a recurring daytime nanny who owns meals, naps, play, school handovers, and daily continuity.",
        ],
      },
      {
        heading: "Typical scope bands",
        paragraphs: [
          "Part-day babysitting usually suits two to six hour windows. Regular daytime nanny care is better for working parents who need recurring support across the child's daily routine.",
          "Live-in or long-shift requirements need a separate discussion because food, rest time, weekly offs, privacy, and night waking expectations must be clear from day one.",
        ],
      },
      {
        heading: "Budget for stability, not only the lowest quote",
        paragraphs: [
          "Child-care roles are high trust. Very low offers often lead to churn, hidden compromises, or poor punctuality. A realistic budget improves retention and helps attract caregivers comfortable with your exact routine.",
          "KalyaniCare helps clarify scope before matching so families compare profiles fairly and caregivers know what they are agreeing to.",
        ],
      },
    ],
    faq: [
      {
        question: "Is a daytime nanny charged monthly or hourly?",
        answer:
          "Recurring daytime care is usually discussed monthly, while short or occasional babysitting may be scoped by visit or number of hours.",
      },
      {
        question: "Can I change hours later?",
        answer:
          "Often yes, but changes should be discussed early so the caregiver can confirm availability and compensation remains fair.",
      },
    ],
  },
];

const bySlug = new Map(posts.map((p) => [p.slug, p]));

export function getAllBlogPosts(): BlogPost[] {
  return [...posts].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
}

export function getAllBlogSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return bySlug.get(slug);
}

export function getLatestBlogPosts(limit: number): BlogPost[] {
  return getAllBlogPosts().slice(0, limit);
}

export function getRelatedBlogPosts(slug: string, limit = 2): BlogPost[] {
  return getAllBlogPosts().filter((p) => p.slug !== slug).slice(0, limit);
}

export function blogPostHref(slug: string): string {
  return `/blog/${slug}`;
}

export function blogCanonicalUrl(slug: string): string {
  return getAbsoluteSiteUrl(`/blog/${slug}`);
}

export function areaNannyHref(areaSlug: string): string {
  return `/nanny-service-in-${areaSlug}`;
}

export function blogPostOpenGraphArticleFields(post: BlogPost) {
  const imageAbs = getAbsoluteSiteUrl(post.coverImage.src);
  return {
    type: "article" as const,
    publishedTime: `${post.publishedAt}T08:30:00+05:30`,
    modifiedTime: `${post.updatedAt}T08:30:00+05:30`,
    authors: [{ name: `${BRAND_NAME} Editorial`, url: getAbsoluteSiteUrl("/") }],
    images: [{ url: imageAbs, alt: post.coverImage.alt }],
  };
}

export function getBlogEntriesForSitemap(now: Date): MetadataRoute.Sitemap {
  const index: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteSiteUrl("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
  const articles = posts.map((p) => ({
    url: getAbsoluteSiteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75 as const,
  }));
  return [...index, ...articles];
}
