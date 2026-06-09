import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock3, MapPin, ShieldCheck } from "lucide-react";

import Navbar from "@/app/components/site/Navbar";
import Footer from "@/app/components/site/Footer";
import StickyWhatsApp from "@/app/components/site/StickyWhatsApp";
import LocalProgrammaticTemplate from "@/app/components/site/LocalProgrammaticTemplate";

import {
  CONTACT_PHONE_E164,
  GOOGLE_MAPS_DIRECTIONS_URL,
  getBusinessGeoJsonLd,
  getBusinessPostalAddressJsonLd,
} from "@/lib/contact";
import { AREAS } from "@/lib/areas";
import {
  AREA_SERVED_CITY,
  AREA_SERVED_LOCALITY,
  BRAND_NAME,
  getAbsoluteSiteUrl,
  getServiceBySlug,
  getWhatsAppHrefWithService,
  services,
} from "@/lib/services";

type PageProps = { params: Promise<{ slug: string }> };

const doodleBySlug: Record<string, string> = {
  babysitting: "/assets/doodles/Baby-amico.svg",
};

const blobBySlug: Record<string, string> = {
  babysitting: "/assets/baby_imgs/2.jpg",
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: "Service not found" };
  }

  const url = getAbsoluteSiteUrl(`/services/${service.slug}`);

  return {
    title: {
      absolute: service.metaTitle,
    },
    description: service.metaDescription,
    keywords: [...service.keywords, ...service.marathiKeywords],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: BRAND_NAME,
      title: service.metaTitle,
      description: service.metaDescription,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage(props: PageProps) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  const canonical = getAbsoluteSiteUrl(`/services/${service.slug}`);
  const homeUrl = getAbsoluteSiteUrl("/");
  const whatsappHref = getWhatsAppHrefWithService(service.title);
  const businessId = `${canonical}#localbusiness`;
  const doodleAsset = doodleBySlug[service.slug] ?? "/assets/doodles/Baby-amico.svg";
  const blobAsset = blobBySlug[service.slug] ?? "/assets/baby_imgs/1.jpg";

  const relatedLinks = AREAS.slice(0, 6).map((area) => ({
    href: `/nanny-service-in-${area.slug}`,
    label: `Nanny in ${area.name}`,
  }));

  const trustHighlights = [
    {
      icon: ShieldCheck,
      title: "Verified professionals",
      description:
        "Background-verified candidates shortlisted for your household preferences.",
    },
    {
      icon: Clock3,
      title: "Fast matching support",
      description:
        "Most families get relevant options quickly with a guided matching process.",
    },
    {
      icon: MapPin,
      title: `Local to ${AREA_SERVED_LOCALITY}`,
      description:
        "Location-aware matching helps with reliability, timing, and continuity.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: BRAND_NAME,
        url: homeUrl,
        telephone: CONTACT_PHONE_E164,
        description: `${BRAND_NAME} connects Pune households with vetted babysitters and nannies for child care at home.`,
        address: getBusinessPostalAddressJsonLd(),
        geo: getBusinessGeoJsonLd(),
        hasMap: GOOGLE_MAPS_DIRECTIONS_URL,
        areaServed: {
          "@type": "City",
          name: AREA_SERVED_CITY,
        },
        serviceArea: {
          "@type": "Place",
          name: `${AREA_SERVED_LOCALITY}, ${AREA_SERVED_CITY}`,
        },
      },
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: service.title,
        serviceType: service.title,
        description: service.metaDescription,
        keywords: service.keywords.join(", "),
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          priceRange: service.priceRange,
          availability: "https://schema.org/InStock",
          url: canonical,
        },
        provider: { "@id": businessId },
        areaServed: {
          "@type": "City",
          name: AREA_SERVED_CITY,
        },
        serviceArea: {
          "@type": "Place",
          name: `${AREA_SERVED_LOCALITY}, ${AREA_SERVED_CITY}`,
        },
        url: canonical,
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${homeUrl}#services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: canonical,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1">
          <LocalProgrammaticTemplate
            data={{
              breadcrumb: [
                { label: "Home", href: "/" },
                { label: "Services", href: "/#services" },
                { label: service.title },
              ],
              localityLabel: `${AREA_SERVED_LOCALITY}, ${AREA_SERVED_CITY}`,
              h1: service.headline,
              intro: service.longDescription,
              highlights: service.points,
              blobAsset,
              doodleAsset,
              doodleAlt: `${service.title} support illustration`,
              visualTitle: "Professional matching support",
              visualDescription:
                "Share your preferred timings and household needs. Our team aligns suitable profiles from nearby localities.",
              trustHeading: `Why families choose ${BRAND_NAME}`,
              trustHighlights,
              faqHeading: "Frequently asked questions",
              faqItems: service.faq,
              sideCtaTag: "Ready to book?",
              sideCtaTitle: "Talk to our local matching team",
              sideCtaDescription: `Share your child's age, timings, and locality in ${AREA_SERVED_LOCALITY} or nearby Pune areas. Indicative pricing: ₹${service.priceRange}.`,
              primaryCtaLabel: `Book ${service.title}`,
              primaryCtaHref: "/#enquiry",
              secondaryCtaLabel: "WhatsApp for quick match",
              secondaryCtaHref: whatsappHref,
              relatedHeading: "Nanny coverage by area",
              relatedLinks,
            }}
          />
        </main>
        <Footer />
        <StickyWhatsApp />
      </div>
    </>
  );
}
