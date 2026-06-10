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

const genericFaq: LocalProgrammaticTemplateData["faqItems"] = [
  {
    question: "How quickly can I get a nanny or babysitter?",
    answer:
      "Availability depends on the area, timing, and child-care scope. Most enquiries receive suitable matching options quickly after the requirement is clarified.",
  },
  {
    question: "Can the caregiver support infants and toddlers?",
    answer:
      "Yes. We match for age-specific needs such as feeding support, diapering, naps, supervised play, and calm handovers.",
  },
  {
    question: "Is this service for general housekeeping?",
    answer:
      "No. KalyaniCare Nanny Services is focused on babysitter, nanny, ayah-style, and child-care support. Light child-related tidy-up can be discussed.",
  },
  {
    question: "Do you offer trial and replacement support?",
    answer:
      "Yes. A trial helps families assess comfort and routine fit, and our team assists with replacement options when needed.",
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

  if (resolved.kind === "area" || resolved.kind === "service-area") {
    const area = getAreaBySlug(resolved.areaSlug);
    if (!area) return {};
    const title = `Nanny & Babysitter Service in ${area.name}, Pune | ${BRAND_NAME}`;
    const description = `Hire trusted nannies and babysitters in ${area.name}, Pune for infant care, toddler supervision, after-school support, trials, and replacement assistance.`;
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

  if (resolved.kind === "area" || resolved.kind === "service-area") {
    const area = getAreaBySlug(resolved.areaSlug);
    if (!area) notFound();
    const waHref = getWhatsAppHrefWithService(`nanny or babysitter in ${area.name}`);

    schemaName = `Nanny & Babysitter Service in ${area.name}`;
    schemaDescription = `Trusted nanny and babysitter support in ${area.name}, Pune.`;
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
      h1: `Nanny & Babysitter Service in ${area.name}`,
      intro: `KalyaniCare Nanny Services helps families in ${area.name} find verified babysitters and nannies for safe child care at home near ${area.landmark}.`,
      highlights: [
        "One trusted service - babysitter and nanny care at home",
        "Flexible part-day, full-day, or recurring timings",
        `Coverage near ${area.landmark}`,
        "Trial visits and replacement support",
      ],
      blobAsset,
      doodleAsset,
      doodleAlt: `Nanny and babysitter support in ${area.name}`,
      visualTitle: `Child-care coverage in ${area.shortName}`,
      visualDescription: `Share your preferred timings, child age, language comfort, and routine. We align suitable caregivers from nearby communities.`,
      trustHeading: `Why families in ${area.name} choose ${BRAND_NAME}`,
      trustHighlights,
      faqHeading: "Frequently asked questions",
      faqItems: genericFaq,
      sideCtaTag: `Serving ${area.shortName}`,
      sideCtaTitle: `Book a nanny in ${area.name}`,
      sideCtaDescription: `Get recommendations based on your child's age, home routine, timings, and locality in ${area.name}.`,
      primaryCtaLabel: "Start your enquiry",
      primaryCtaHref: "/#enquiry",
      secondaryCtaLabel: "WhatsApp for quick match",
      secondaryCtaHref: waHref,
      relatedHeading: `Explore nanny coverage around ${area.name}`,
      relatedLinks: [
        { href: `/services/babysitting`, label: "Babysitter & Nanny Services" },
        { href: `/${babysittingPrefix}${area.slug}`, label: `Babysitting in ${area.name}` },
        ...area.societies
          .slice(0, 6)
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
      faqItems: genericFaq,
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
