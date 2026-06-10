/**
 * Shared Schema.org fragments used across all page JSON-LD blocks.
 * Single source of truth — edit here, all pages pick it up automatically.
 */

export const SCHEMA_AGGREGATE_RATING = {
  "@type": "AggregateRating",
  ratingValue: "4.9",
  reviewCount: "30",
  bestRating: "5",
  worstRating: "1",
} as const;

/** Testimonials shown on-site — kept in sync with Testimonials.tsx */
export const SCHEMA_REVIEWS = [
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Priya S." },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    reviewBody:
      "Found a warm daytime nanny through KalyaniCare within 2 days. Our toddler settled faster than we expected.",
    datePublished: "2025-12-01",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Rahul M." },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    reviewBody:
      "When our babysitter became unavailable, KalyaniCare arranged replacement options quickly. Lifesaver for a working couple.",
    datePublished: "2025-11-15",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Anjali K." },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    reviewBody:
      "Loved the personal touch. They actually listen to what we need and don't just send anyone. Truly local and trustworthy.",
    datePublished: "2025-10-20",
  },
] as const;

/** Mo-Su 8 AM – 9 PM IST */
export const SCHEMA_OPENING_HOURS = ["Mo-Su 08:00-21:00"] as const;

export const SCHEMA_PRICE_RANGE = "₹₹" as const;

/** Primary hero image for the business */
export const SCHEMA_BUSINESS_IMAGE = "https://www.kalyanicare.com/assets/baby_imgs/1.jpg" as const;

/** All service areas — drives areaServed array on LocalBusiness */
export const SCHEMA_AREA_SERVED = [
  "Hinjewadi Phase 1",
  "Hinjewadi Phase 2",
  "Hinjewadi Phase 3",
  "Megapolis, Hinjewadi",
  "Wakad, Pune",
  "Bhumkar Chowk, Pune",
  "Baner, Pune",
  "Marunji, Pune",
] as const;

/**
 * Returns the enriched LocalBusiness node.
 * Merge with page-specific overrides using spread syntax.
 */
export function getLocalBusinessSchemaBase(homeUrl: string) {
  return {
    "@type": "LocalBusiness" as const,
    image: SCHEMA_BUSINESS_IMAGE,
    openingHours: SCHEMA_OPENING_HOURS,
    priceRange: SCHEMA_PRICE_RANGE,
    aggregateRating: SCHEMA_AGGREGATE_RATING,
    review: SCHEMA_REVIEWS,
    areaServed: SCHEMA_AREA_SERVED.map((name) => ({
      "@type": "Place" as const,
      name,
    })),
  };
}
