/** Site-wide call / WhatsApp / address - single source of truth for NAP consistency. */

export const CONTACT_PHONE_E164 = "+919172475977";

/** Registered office-matches Google Business / Maps listing. */
export const BUSINESS_STREET_ADDRESS = "Annabhau Sathe Nagar, Maan";
export const BUSINESS_ADDRESS_LOCALITY = "Man";
export const BUSINESS_ADDRESS_REGION = "Maharashtra";
export const BUSINESS_POSTAL_CODE = "411057";
export const BUSINESS_ADDRESS_COUNTRY = "IN";
export const BUSINESS_ADDRESS_DISPLAY =
  "Annabhau Sathe Nagar, Maan, Man, Maharashtra 411057";

export const BUSINESS_GEO_LAT = 18.575996;
export const BUSINESS_GEO_LNG = 73.709906;

export const GOOGLE_MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d778.0587754592929!2d73.70990627494702!3d18.57599619609245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb9abfbdf319%3A0xf0027cd442f858e0!2sAnnabhau%20Sathe%20Nagar%2C%20Maan%2C%20Man%2C%20Maharashtra%20411057!5e1!3m2!1sen!2sin!4v1779388548356!5m2!1sen!2sin";

export const GOOGLE_MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/place/Annabhau+Sathe+Nagar,+Maan,+Man,+Maharashtra+411057/@18.575996,73.709906,17z";

/** Schema.org PostalAddress for LocalBusiness JSON-LD. */
export function getBusinessPostalAddressJsonLd() {
  return {
    "@type": "PostalAddress" as const,
    streetAddress: BUSINESS_STREET_ADDRESS,
    addressLocality: BUSINESS_ADDRESS_LOCALITY,
    addressRegion: BUSINESS_ADDRESS_REGION,
    postalCode: BUSINESS_POSTAL_CODE,
    addressCountry: BUSINESS_ADDRESS_COUNTRY,
  };
}

export function getBusinessGeoJsonLd() {
  return {
    "@type": "GeoCoordinates" as const,
    latitude: BUSINESS_GEO_LAT,
    longitude: BUSINESS_GEO_LNG,
  };
}

/** Human-readable for India (matches marketing). */
export const CONTACT_PHONE_DISPLAY_IN = "+91 91724 75977";

const WA_ME_DIGITS = "919172475977";

const DEFAULT_BOOKING_TEXT = "Hi KalyaniCare Nanny Services, I'd like to book a babysitter or nanny";

export const WHATSAPP = `https://wa.me/${WA_ME_DIGITS}?text=${encodeURIComponent(DEFAULT_BOOKING_TEXT)}`;

export function getWhatsAppHrefWithService(topic: string) {
  const q = encodeURIComponent(`Hi KalyaniCare Nanny Services, I'm interested in ${topic}.`);
  return `https://wa.me/${WA_ME_DIGITS}?text=${q}`;
}
