/**
 * Canonical nanny service catalog + SEO payload.
 */

export type ServiceIconKey = "baby" | "heart" | "handHeart";

export type ServiceFaq = { question: string; answer: string };

export type ServiceRecord = {
  slug: string;
  iconKey: ServiceIconKey;
  title: string;
  tag?: string;
  points: string[];
  mobileSummary: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  longDescription: string;
  keywords: string[];
  marathiKeywords: string[];
  relatedSearches: string[];
  priceRange: string;
  searchIntent: "transactional" | "informational" | "mixed";
  faq: ServiceFaq[];
};

export {
  CONTACT_PHONE_DISPLAY_IN,
  CONTACT_PHONE_E164,
  WHATSAPP,
  getWhatsAppHrefWithService,
} from "./contact";

export const BRAND_NAME = "KalyaniCare Nanny Services";
export const AREA_SERVED_CITY = "Pune";
export const AREA_SERVED_LOCALITY = "Hinjewadi IT Park";

export function getAbsoluteSiteUrl(path = ""): string {
  const pathname = path.startsWith("/") ? path : path ? `/${path}` : "";

  const baseCandidate =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "http://localhost:3000";

  const trimmed = baseCandidate.trim();
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const originUrl = new URL(withScheme);
    return `${originUrl.origin}${pathname}`;
  } catch {
    return `http://localhost:3000${pathname}`;
  }
}

export const SERVICE_SLUGS = ["babysitting"] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const services: readonly ServiceRecord[] = [
  {
    slug: "babysitting",
    iconKey: "baby",
    title: "Babysitter & Nanny Services",
    tag: "Specialist",
    points: [
      "Infant, toddler & after-school supervision",
      "Daytime nanny, part-day babysitter, and ayah-style care",
      "Background-verified profiles with trial and replacement support",
    ],
    mobileSummary: "Verified babysitters and nannies for child care at home.",
    headline: "Trusted Babysitter & Nanny Services in Hinjewadi, Wakad & Baner",
    metaTitle:
      "Babysitter & Nanny Services in Hinjewadi Pune | KalyaniCare Nanny Services",
    metaDescription:
      "Hire trusted babysitters and nannies in Hinjewadi, Wakad, Baner, Megapolis, Marunji, and Pune west. Infant care, toddler care, after-school supervision, ayah-style support, trials, and replacement assistance.",
    longDescription:
      "KalyaniCare Nanny Services helps Pune west families find reliable babysitters and nannies for safe child care at home. We focus only on child-focused support: infant routines, feeding support, diapering, nap windows, supervised play, toddler engagement, school-bus handovers, after-school supervision, and calm support while parents work.\n\nFamilies can ask for a few hours of babysitting, a regular daytime nanny, or ayah-style care for infants and young children. We shortlist background-verified profiles, align language and timing preferences, support a trial before commitment, and help with replacements when schedules or fit change.",
    keywords: [
      "babysitter Hinjewadi",
      "nanny Hinjewadi",
      "babysitter Wakad",
      "nanny Wakad",
      "babysitter Baner",
      "nanny Baner",
      "babysitter Pune",
      "nanny Pune",
      "baby sitter near me Pune",
      "infant care nanny Hinjewadi",
      "child caretaker Pune",
      "ayah for baby Pune",
      "aaya for baby Hinjewadi",
      "daytime nanny Pune",
      "after school babysitter Pune",
      "toddler care at home Pune",
      "childcare at home Hinjewadi",
    ],
    marathiKeywords: [
      "bal sangopan bai Pune",
      "baby sambhal wali bai Hinjewadi",
      "lahan mulanche care Pune",
      "aaya bai Pune",
      "aayi bai Hinjewadi",
      "bal palak bai Pune",
      "mulanche pahara Wakad",
    ],
    relatedSearches: [
      "babysitter in Hinjewadi",
      "nanny in Wakad",
      "infant care in Baner",
      "ayah for baby in Pune",
    ],
    priceRange: "Rs 6,000 - Rs 18,000/month",
    searchIntent: "mixed",
    faq: [
      {
        question: "What ages do KalyaniCare babysitters and nannies support?",
        answer:
          "We support newborns, infants, toddlers, preschoolers, and school-age children. Duties are matched to your child's age, routine, feeding needs, nap schedule, and supervision requirements.",
      },
      {
        question: "Can I hire a nanny for only a few hours a day?",
        answer:
          "Yes. Families can request part-day babysitting, daytime nanny shifts, after-school coverage, or longer recurring care depending on availability in their area.",
      },
      {
        question: "Are nanny profiles background verified?",
        answer:
          "Yes. We prioritize background-verified caregivers and document key preferences before introducing profiles for trial or onboarding.",
      },
      {
        question: "Can the nanny help with light child-related tasks?",
        answer:
          "Yes, child-adjacent tasks like feeding prep, bottle cleaning, toy tidying, school-bag handovers, and child laundry can be discussed. General housekeeping is not the focus of this service.",
      },
      {
        question: "Do you offer trial and replacement support?",
        answer:
          "Yes. A short trial helps the child, parents, and caregiver align. If availability or fit changes, KalyaniCare helps with replacement options as quickly as possible.",
      },
    ],
  },
] satisfies readonly ServiceRecord[];

const bySlug = new Map(services.map((s) => [s.slug, s] as const));

export function getServiceBySlug(slug: string): ServiceRecord | undefined {
  return bySlug.get(slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

export function findServiceSlugByLabel(label: string): string | undefined {
  const l = label.toLowerCase();
  return services.find(
    (s) => l.includes(s.slug) || l.includes(s.title.toLowerCase()) || l.includes("nanny") || l.includes("babysitter"),
  )?.slug;
}
