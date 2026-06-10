import type { Metadata } from "next";
import BlogSection from "@/app/components/site/BlogSection";
import About from "@/app/components/site/About";
import Areas from "@/app/components/site/Areas";
import EnquirySection from "@/app/components/site/EnquirySection";
import FinalCTA from "@/app/components/site/FinalCTA";
import Footer from "@/app/components/site/Footer";
import Hero from "@/app/components/site/Hero";
import Navbar from "@/app/components/site/Navbar";
import Process from "@/app/components/site/Process";
import Services from "@/app/components/site/Services";
import StickyWhatsApp from "@/app/components/site/StickyWhatsApp";
import Testimonials from "@/app/components/site/Testimonials";
import TrustSection from "@/app/components/site/TrustSection";
import {
  GOOGLE_MAPS_DIRECTIONS_URL,
  getBusinessGeoJsonLd,
  getBusinessPostalAddressJsonLd,
  CONTACT_PHONE_E164,
} from "@/lib/contact";
import {
  AREA_SERVED_CITY,
  AREA_SERVED_LOCALITY,
  BRAND_NAME,
  getAbsoluteSiteUrl,
} from "@/lib/services";
import {
  getLocalBusinessSchemaBase,
  SCHEMA_AGGREGATE_RATING,
  SCHEMA_REVIEWS,
  SCHEMA_OPENING_HOURS,
  SCHEMA_PRICE_RANGE,
  SCHEMA_BUSINESS_IMAGE,
  SCHEMA_AREA_SERVED,
} from "@/lib/schema";

const canonical = getAbsoluteSiteUrl("/");

export const metadata: Metadata = {
  alternates: {
    canonical,
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${canonical}#organization`,
        name: BRAND_NAME,
        url: canonical,
        telephone: CONTACT_PHONE_E164,
      },
      {
        "@type": "WebSite",
        "@id": `${canonical}#website`,
        name: BRAND_NAME,
        url: canonical,
        inLanguage: "en-IN",
      },
      {
        "@type": "LocalBusiness",
        "@id": `${canonical}#localbusiness`,
        name: BRAND_NAME,
        url: canonical,
        telephone: CONTACT_PHONE_E164,
        description: `${BRAND_NAME} connects families in Hinjewadi IT Park and Pune west with background-verified babysitters and nannies for infant care, toddler routines, after-school supervision, and ongoing child care at home.`,
        image: SCHEMA_BUSINESS_IMAGE,
        address: getBusinessPostalAddressJsonLd(),
        geo: getBusinessGeoJsonLd(),
        hasMap: GOOGLE_MAPS_DIRECTIONS_URL,
        openingHours: SCHEMA_OPENING_HOURS,
        priceRange: SCHEMA_PRICE_RANGE,
        aggregateRating: SCHEMA_AGGREGATE_RATING,
        review: SCHEMA_REVIEWS,
        areaServed: SCHEMA_AREA_SERVED.map((name) => ({ "@type": "Place", name })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <TrustSection />
          <Services />
          <Process />
          <About />
          <Areas />
          <Testimonials />
          <BlogSection />
          <EnquirySection />
          <FinalCTA />
        </main>
        <Footer />
        <StickyWhatsApp />
      </div>
    </>
  );
}
