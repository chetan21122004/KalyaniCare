import type { Metadata } from "next";
import { Baby, Clock3, MapPin, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";

import Footer from "@/app/components/site/Footer";
import LocalProgrammaticTemplate, {
  type LocalProgrammaticTemplateData,
} from "@/app/components/site/LocalProgrammaticTemplate";
import Navbar from "@/app/components/site/Navbar";
import StickyWhatsApp from "@/app/components/site/StickyWhatsApp";
import { AREAS, getAreaBySlug, getAllSocietySlugs, getSocietyBySlug } from "@/lib/areas";
import {
  CONTACT_PHONE_E164,
  GOOGLE_MAPS_DIRECTIONS_URL,
  getBusinessGeoJsonLd,
  getBusinessPostalAddressJsonLd,
} from "@/lib/contact";
import {
  SCHEMA_AGGREGATE_RATING,
  SCHEMA_OPENING_HOURS,
  SCHEMA_PRICE_RANGE,
  SCHEMA_BUSINESS_IMAGE,
  SCHEMA_AREA_SERVED,
} from "@/lib/schema";
import {
  AREA_SERVED_CITY,
  AREA_SERVED_LOCALITY,
  BRAND_NAME,
  getAbsoluteSiteUrl,
  getServiceBySlug,
  getWhatsAppHrefWithService,
} from "@/lib/services";

type PageProps = { params: Promise<{ programmaticSlug: string }> };

type ResolvedRoute =
  | { kind: "area"; areaSlug: string }
  | { kind: "society"; societySlug: string }
  | { kind: "service-area"; areaSlug: string };

type BreadcrumbItem = { name: string; item: string };

const nannyPrefix = "nanny-service-in-";
const babysittingPrefix = "babysitting-in-";
const blobAsset = "/assets/baby_imgs/3.jpg";
const doodleAsset = "/assets/doodles/Baby-amico.svg";

const trustHighlights = [
  {
    icon: ShieldCheck,
    title: "Background-verified",
    description: "Profiles are screened before being recommended for child care at home.",
  },
  {
    icon: Baby,
    title: "Child-care focused",
    description: "Matching is built around infant, toddler, and after-school routines.",
  },
  {
    icon: Clock3,
    title: "Trial and replacement",
    description: "Start with a trial and get help with replacement if fit or availability changes.",
  },
  {
    icon: MapPin,
    title: `Local to ${AREA_SERVED_LOCALITY}`,
    description: "Local matching helps with punctuality, reliability, and continuity.",
  },
];

/** FAQ for nanny-service-in-[area] pages (regular daytime care) */
const nannyFaq: LocalProgrammaticTemplateData["faqItems"] = [
  {
    question: "What does a daytime nanny do at home in Pune?",
    answer:
      "A daytime nanny follows your child's routine — feeding support, diapering, naps, supervised play, toddler engagement, and light child-related tasks. They work set hours each day, giving parents a reliable, recurring caregiver.",
  },
  {
    question: "How quickly can I get a nanny matched?",
    answer:
      "Most families receive shortlisted nanny options within one to two days of sharing their requirement. Same-day options exist depending on locality and timing.",
  },
  {
    question: "Can I get a nanny for infants under 12 months?",
    answer:
      "Yes. We match infant-care nannies with experience in newborn routines, bottle feeding, burping, diapering, and calm sleep support.",
  },
  {
    question: "Do you offer trial and replacement support?",
    answer:
      "Yes. A short trial helps the child and family settle with the caregiver. If fit or availability changes, KalyaniCare arranges replacement options as quickly as possible.",
  },
];

/** FAQ for babysitting-in-[area] pages (flexible / on-demand care) */
const babysittingFaq: LocalProgrammaticTemplateData["faqItems"] = [
  {
    question: "Can I hire a babysitter for just a few hours?",
    answer:
      "Yes. KalyaniCare supports part-day babysitting, evening cover, and one-time supervision depending on availability in your area. Share your timing and we will shortlist suitable options.",
  },
  {
    question: "What is the difference between a babysitter and a nanny?",
    answer:
      "A babysitter typically provides flexible, shorter-duration supervision — a few hours, an evening, or specific shifts. A nanny works recurring daily hours as an ongoing caregiver. KalyaniCare can help with both depending on your routine.",
  },
  {
    question: "Are babysitters background-verified?",
    answer:
      "Yes. We prioritise background-verified profiles for all child-care placements, including short-duration babysitting engagements.",
  },
  {
    question: "How fast can a babysitter be arranged near me?",
    answer:
      "For recurring needs, families usually get options within one to two days. For flexible or one-time requests, availability depends on locality and timing — WhatsApp us for the fastest response.",
  },
];

function nannyAreaHref(areaSlug: string): string {
  return `/${nannyPrefix}${areaSlug}`;
}

function resolveProgrammaticSlug(slug: string): ResolvedRoute | null {
  if (slug.startsWith(nannyPrefix)) {
    const token = slug.slice(nannyPrefix.length);
    if (getAreaBySlug(token)) return { kind: "area", areaSlug: token };
    if (getSocietyBySlug(token)) return { kind: "society", societySlug: token };
    return null;
  }

  if (slug.startsWith(babysittingPrefix)) {
    const areaSlug = slug.slice(babysittingPrefix.length);
    if (getAreaBySlug(areaSlug)) return { kind: "service-area", areaSlug };
  }

  return null;
}

export function generateStaticParams() {
  const params: { programmaticSlug: string }[] = [];

  for (const area of AREAS) {
    params.push({ programmaticSlug: `${nannyPrefix}${area.slug}` });
    params.push({ programmaticSlug: `${babysittingPrefix}${area.slug}` });
  }

  for (const societySlug of getAllSocietySlugs()) {
    params.push({ programmaticSlug: `${nannyPrefix}${societySlug}` });
  }

  return params;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { programmaticSlug } = await props.params;
  const resolved = resolveProgrammaticSlug(programmaticSlug);
  if (!resolved) return {};

  const canonical = getAbsoluteSiteUrl(`/${programmaticSlug}`);

  if (resolved.kind === "area") {
    const area = getAreaBySlug(resolved.areaSlug);
    if (!area) return {};
    const title = `Nanny Service in ${area.name}, Pune | ${BRAND_NAME}`;
    const description = `Find a verified daytime nanny in ${area.name}, Pune for infant routines, toddler care, after-school supervision, and recurring home child care. Background-checked, locally matched.`;
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: { title, description, url: canonical, siteName: BRAND_NAME, type: "website", locale: "en_IN" },
    };
  }

  if (resolved.kind === "service-area") {
    const area = getAreaBySlug(resolved.areaSlug);
    if (!area) return {};
    const title = `Babysitter in ${area.name}, Pune | ${BRAND_NAME}`;
    const description = `Book a trusted babysitter in ${area.name}, Pune for flexible part-day, full-day, or one-time child care near ${area.landmark}. Verified caregivers matched to your schedule.`;
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: { title, description, url: canonical, siteName: BRAND_NAME, type: "website", locale: "en_IN" },
    };
  }

  const society = getSocietyBySlug(resolved.societySlug);
  if (!society) return {};
  const title = `Nanny & Babysitter Service in ${society.name}, ${society.area.name} | ${BRAND_NAME}`;
  const description = `Book verified nanny and babysitter support near ${society.name}, ${society.area.name}, Pune for child care at home.`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: BRAND_NAME, type: "website", locale: "en_IN" },
  };
}

export default async function ProgrammaticPage(props: PageProps) {
  const { programmaticSlug } = await props.params;
  const resolved = resolveProgrammaticSlug(programmaticSlug);
  if (!resolved) notFound();

  const service = getServiceBySlug("babysitting");
  if (!service) notFound();

  const canonical = getAbsoluteSiteUrl(`/${programmaticSlug}`);
  const homeUrl = getAbsoluteSiteUrl("/");
  const businessId = `${homeUrl}#localbusiness`;

  let schemaName = "";
  let schemaDescription = "";
  let breadcrumbItems: BreadcrumbItem[] = [];
  let templateData: LocalProgrammaticTemplateData;

  if (resolved.kind === "area") {
    const area = getAreaBySlug(resolved.areaSlug);
    if (!area) notFound();
    const waHref = getWhatsAppHrefWithService(`a daytime nanny in ${area.name}`);

    schemaName = `Nanny Service in ${area.name}`;
    schemaDescription = `Verified daytime nanny support for families in ${area.name}, Pune — infant routines, toddler care, and after-school supervision.`;
    breadcrumbItems = [
      { name: "Home", item: homeUrl },
      { name: "Areas", item: `${homeUrl}#areas` },
      { name: area.name, item: canonical },
    ];

    templateData = {
      breadcrumb: [
        { label: "Home", href: "/" },
        { label: "Areas", href: "/#areas" },
        { label: area.name },
      ],
      localityLabel: `${area.name}, Pune`,
      h1: `Nanny Service in ${area.name}, Pune`,
      intro: `KalyaniCare Nanny Services helps families in ${area.name} find a reliable daytime nanny for recurring child care at home near ${area.landmark}. We match background-verified caregivers to your infant's routine, toddler's schedule, or after-school supervision needs.`,
      highlights: [
        `Recurring daytime nanny care near ${area.landmark}`,
        "Infant and toddler routine support at home",
        "Background-verified caregiver matching",
        "Trial days and replacement assistance included",
      ],
      blobAsset,
      doodleAsset,
      doodleAlt: `Daytime nanny support in ${area.name}`,
      visualTitle: `Nanny matching in ${area.shortName}`,
      visualDescription: `Tell us your child's age, daily routine, and preferred timings. We shortlist locally-matched nannies for your home.`,
      trustHeading: `Why families in ${area.name} choose ${BRAND_NAME}`,
      trustHighlights,
      faqHeading: "Nanny service FAQs",
      faqItems: nannyFaq,
      sideCtaTag: `Serving ${area.shortName}`,
      sideCtaTitle: `Find a nanny in ${area.name}`,
      sideCtaDescription: `Share your child's age, timings, and home routine. We match you with verified nannies near ${area.name}.`,
      primaryCtaLabel: "Start your enquiry",
      primaryCtaHref: "/#enquiry",
      secondaryCtaLabel: "WhatsApp for quick match",
      secondaryCtaHref: waHref,
      relatedHeading: `More child-care options near ${area.name}`,
      relatedLinks: [
        { href: `/services/babysitting`, label: "Babysitter & Nanny Services" },
        { href: `/${babysittingPrefix}${area.slug}`, label: `Babysitter in ${area.name}` },
        ...area.societies
          .slice(0, 6)
          .map((s) => ({ href: nannyAreaHref(s.slug), label: `Nanny in ${s.name}` })),
      ],
    };
  } else if (resolved.kind === "service-area") {
    const area = getAreaBySlug(resolved.areaSlug);
    if (!area) notFound();
    const saArea = area as NonNullable<typeof area>;
    const waHref = getWhatsAppHrefWithService(`a babysitter in ${saArea.name}`);

    schemaName = `Babysitter in ${saArea.name}`;
    schemaDescription = `Flexible babysitter bookings for families in ${saArea.name}, Pune — part-day, full-day, or one-time child care near ${saArea.landmark}.`;
    breadcrumbItems = [
      { name: "Home", item: homeUrl },
      { name: "Areas", item: `${homeUrl}#areas` },
      { name: `Babysitter in ${saArea.name}`, item: canonical },
    ];

    templateData = {
      breadcrumb: [
        { label: "Home", href: "/" },
        { label: "Areas", href: "/#areas" },
        { label: `Babysitter in ${saArea.name}` },
      ],
      localityLabel: `${saArea.name}, Pune`,
      h1: `Babysitter in ${saArea.name}, Pune`,
      intro: `Looking for a babysitter in ${saArea.name}? KalyaniCare connects families near ${saArea.landmark} with background-verified babysitters for flexible part-day, full-day, or recurring child supervision at home.`,
      highlights: [
        `Flexible babysitting near ${saArea.landmark}`,
        "Part-day, full-day, or one-time bookings",
        "Background-verified babysitters",
        "Fast matching — often same-day availability",
      ],
      blobAsset,
      doodleAsset,
      doodleAlt: `Babysitter in ${saArea.name}`,
      visualTitle: `Babysitter matching in ${saArea.shortName}`,
      visualDescription: `Tell us your preferred hours and your child's age. We shortlist verified babysitters available near ${saArea.name}.`,
      trustHeading: `Why ${saArea.name} families trust ${BRAND_NAME}`,
      trustHighlights,
      faqHeading: "Babysitter FAQs",
      faqItems: babysittingFaq,
      sideCtaTag: `Babysitting in ${saArea.shortName}`,
      sideCtaTitle: `Book a babysitter in ${saArea.name}`,
      sideCtaDescription: `Share your timing, child's age, and location in ${saArea.name}. We match you with available verified babysitters.`,
      primaryCtaLabel: "Book a babysitter",
      primaryCtaHref: "/#enquiry",
      secondaryCtaLabel: "WhatsApp now",
      secondaryCtaHref: waHref,
      relatedHeading: `More child-care options near ${saArea.name}`,
      relatedLinks: [
        { href: nannyAreaHref(saArea.slug), label: `Nanny service in ${saArea.name}` },
        { href: `/services/babysitting`, label: "Babysitter & Nanny Services" },
        ...saArea.societies
          .slice(0, 4)
          .map((s) => ({ href: nannyAreaHref(s.slug), label: `Nanny in ${s.name}` })),
      ],
    };
  } else {
    const society = getSocietyBySlug(resolved.societySlug);
    if (!society) notFound();
    const waHref = getWhatsAppHrefWithService(`nanny or babysitter in ${society.name}`);

    schemaName = `Nanny & Babysitter Service in ${society.name}`;
    schemaDescription = `Verified child-care support for families in ${society.name}, ${society.area.name}, Pune.`;
    breadcrumbItems = [
      { name: "Home", item: homeUrl },
      { name: society.area.name, item: getAbsoluteSiteUrl(nannyAreaHref(society.area.slug)) },
      { name: society.name, item: canonical },
    ];

    templateData = {
      breadcrumb: [
        { label: "Home", href: "/" },
        { label: society.area.name, href: nannyAreaHref(society.area.slug) },
        { label: society.name },
      ],
      localityLabel: `${society.name}, ${society.area.name}`,
      h1: `Nanny & Babysitter Service in ${society.name}`,
      intro: `Verified babysitter and nanny support for families in ${society.name}, ${society.area.name}, Pune.`,
      highlights: [
        `Society-focused nanny support for ${society.name}`,
        "Verified babysitter and nanny care at home",
        "Background-verified caregiver matching",
        "Flexible timing to fit your home routine",
      ],
      blobAsset,
      doodleAsset,
      doodleAlt: `Nanny and babysitter support in ${society.name}`,
      visualTitle: "Society-first nanny matching",
      visualDescription: `Get caregiver options aligned for ${society.name} with support from nearby ${society.area.name} micro-localities.`,
      trustHeading: `Why families in ${society.name} choose ${BRAND_NAME}`,
      trustHighlights,
      faqHeading: "Frequently asked questions",
      faqItems: nannyFaq,
      sideCtaTag: "Society support",
      sideCtaTitle: `Need a nanny in ${society.name}?`,
      sideCtaDescription: `Our team can recommend verified babysitter and nanny options near ${society.name}.`,
      primaryCtaLabel: "Book a consultation",
      primaryCtaHref: "/#enquiry",
      secondaryCtaLabel: "WhatsApp now",
      secondaryCtaHref: waHref,
      relatedHeading: `Explore nanny coverage around ${society.area.name}`,
      relatedLinks: [
        { href: nannyAreaHref(society.area.slug), label: `Nanny service in ${society.area.name}` },
        { href: `/services/babysitting`, label: "Babysitter & Nanny Services" },
      ],
    };
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: BRAND_NAME,
        url: homeUrl,
        telephone: CONTACT_PHONE_E164,
        image: SCHEMA_BUSINESS_IMAGE,
        address: getBusinessPostalAddressJsonLd(),
        geo: getBusinessGeoJsonLd(),
        hasMap: GOOGLE_MAPS_DIRECTIONS_URL,
        openingHours: SCHEMA_OPENING_HOURS,
        priceRange: SCHEMA_PRICE_RANGE,
        aggregateRating: SCHEMA_AGGREGATE_RATING,
        areaServed: SCHEMA_AREA_SERVED.map((name) => ({ "@type": "Place", name })),
      },
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: schemaName,
        serviceType: "Nanny and babysitter services",
        description: schemaDescription,
        keywords: service.keywords.join(", "),
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          priceRange: service.priceRange,
          availability: "https://schema.org/InStock",
          url: canonical,
        },
        provider: { "@id": businessId },
        areaServed: { "@type": "City", name: AREA_SERVED_CITY },
        serviceArea: { "@type": "Place", name: AREA_SERVED_LOCALITY },
        url: canonical,
      },
      {
        "@type": "FAQPage",
        mainEntity: templateData.faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.item,
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
          <LocalProgrammaticTemplate data={templateData} />
        </main>
        <Footer />
        <StickyWhatsApp />
      </div>
    </>
  );
}
