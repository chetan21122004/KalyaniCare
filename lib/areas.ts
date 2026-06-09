/**
 * Canonical area + society catalog (single source of truth).
 * Drives programmatic SEO pages:
 *   /nanny-service-in-[areaSlug]
 *   /[serviceSlug]-in-[areaSlug]
 *   /nanny-service-in-[societySlug]
 */

export type Society = {
  name: string;
  slug: string;
  areaId: string;
};

export type AreaRecord = {
  id: string;
  name: string;
  slug: string;
  shortName: string;
  description: string;
  landmark: string;
  pincode: string;
  nearbyMicroLocalities: string[];
  seoTitle: string;
  metaDescription: string;
  searchVolumeTier: "high" | "medium" | "low";
  societies: Omit<Society, "areaId">[];
};

export const AREAS: readonly AreaRecord[] = [
  {
    id: "hinjewadi-phase-1",
    name: "Hinjewadi Phase 1",
    slug: "hinjewadi-phase-1",
    shortName: "Phase 1",
    description:
      "Rajiv Gandhi Infotech Park core area and adjoining residential societies -the beating heart of Pune's IT corridor.",
    landmark: "Rajiv Gandhi Infotech Park Gate 1",
    pincode: "411057",
    nearbyMicroLocalities: ["Nande", "Hinjewadi Village", "Kate Wasti", "Kemse Vasti"],
    seoTitle: "Nanny Service in Hinjewadi Phase 1 | Babysitter Near You - KalyaniCare",
    metaDescription:
      "Looking for a nanny or babysitter in Hinjewadi Phase 1? KalyaniCare Nanny Services connects families with background-verified child caregivers.",
    searchVolumeTier: "high",
    societies: [
      { name: "Godrej 24", slug: "godrej-24-hinjewadi" },
      { name: "Shapoorji Joyville Sensorium", slug: "shapoorji-joyville-sensorium" },
      { name: "Park Astra", slug: "park-astra-hinjewadi" },
      { name: "Gera Joy on the Treetops", slug: "gera-joy-treetops-hinjewadi" },
      { name: "Kolte Patil Life Republic", slug: "kolte-patil-life-republic" },
      { name: "VTP Blue Waters", slug: "vtp-blue-waters-hinjewadi" },
      { name: "Hazel View", slug: "hazel-view-hinjewadi" },
      { name: "Ashiana Malhar", slug: "ashiana-malhar-hinjewadi" },
      { name: "Kolte Canvas", slug: "kolte-canvas-hinjewadi" },
    ],
  },
  {
    id: "hinjewadi-phase-2",
    name: "Hinjewadi Phase 2",
    slug: "hinjewadi-phase-2",
    shortName: "Phase 2",
    description:
      "Home to Infosys, Wipro and large IT campuses with dense residential society clusters -thousands of working families nearby.",
    landmark: "Infosys Pune Development Centre",
    pincode: "411057",
    nearbyMicroLocalities: ["Maan", "Mahalunge", "Hinjewadi Phase 2 Hill"],
    seoTitle: "Nanny Service in Hinjewadi Phase 2 | Child Care at Home - KalyaniCare",
    metaDescription:
      "Find verified babysitters and nannies near Infosys, Wipro, and Hinjewadi Phase 2 societies. Infant, toddler, and after-school care at home.",
    searchVolumeTier: "high",
    societies: [
      { name: "Supreme Estia Phase 1", slug: "supreme-estia-hinjewadi-phase-2" },
      { name: "VJ Eternity", slug: "vj-eternity-hinjewadi" },
      { name: "Megapolis Mystic", slug: "megapolis-mystic-hinjewadi" },
      { name: "Kolte 24K Atria", slug: "kolte-24k-atria-hinjewadi" },
      { name: "Lemon Tree Residences", slug: "lemon-tree-residences-hinjewadi" },
      { name: "Hinjewadi Village Residences", slug: "hinjewadi-village-residences" },
    ],
  },
  {
    id: "hinjewadi-phase-3",
    name: "Hinjewadi Phase 3",
    slug: "hinjewadi-phase-3",
    shortName: "Phase 3",
    description:
      "Blue Ridge Township, Life Republic and an expanding residential belt -one of the largest IT-adjacent communities in Pune west.",
    landmark: "Blue Ridge Township",
    pincode: "411057",
    nearbyMicroLocalities: ["Sus", "Marunji Road", "Hinjewadi Maan Phase 3"],
    seoTitle: "Nanny Service in Hinjewadi Phase 3 | Blue Ridge & Life Republic - KalyaniCare",
    metaDescription:
      "Trusted babysitter and nanny services in Hinjewadi Phase 3, Blue Ridge, Life Republic, Megapolis, and nearby societies.",
    searchVolumeTier: "high",
    societies: [
      { name: "Blue Ridge Township", slug: "blue-ridge-township-hinjewadi" },
      { name: "Life Republic Aros", slug: "life-republic-aros-hinjewadi" },
      { name: "Life Republic 16", slug: "life-republic-16-hinjewadi" },
      { name: "Paranjape Broadway", slug: "paranjape-broadway-hinjewadi" },
      { name: "Shapoorji Joyville Phase 3", slug: "shapoorji-joyville-hinjewadi-phase-3" },
      { name: "The Ridges 41", slug: "the-ridges-41-blue-ridge" },
      { name: "Qrious by Life Republic", slug: "qrious-life-republic" },
    ],
  },
  {
    id: "megapolis",
    name: "Megapolis",
    slug: "megapolis-hinjewadi",
    shortName: "Megapolis",
    description:
      "Megapolis Splendour, Sparklet and the surrounding township -one of Pune's most densely populated IT-adjacent residential clusters.",
    landmark: "Megapolis Splendour Tower",
    pincode: "411057",
    nearbyMicroLocalities: ["Godambewadi", "Hinjewadi Phase 3 corridor"],
    seoTitle: "Nanny Service in Megapolis Hinjewadi | Verified Babysitters - KalyaniCare",
    metaDescription:
      "Need a nanny in Megapolis Splendour or Sparklet? KalyaniCare provides verified babysitters and child caregivers for infants and young children.",
    searchVolumeTier: "medium",
    societies: [
      { name: "Megapolis Splendour", slug: "megapolis-splendour-hinjewadi" },
      { name: "Megapolis Sparklet", slug: "megapolis-sparklet-hinjewadi" },
      { name: "Megapolis Mystic", slug: "megapolis-mystic" },
      { name: "Megapolis Smart Homes", slug: "megapolis-smart-homes" },
    ],
  },
  {
    id: "wakad",
    name: "Wakad",
    slug: "wakad",
    shortName: "Wakad",
    description:
      "Highway belt and residential hubs with fast IT Park access -one of Pune west's fastest-growing localities for working professionals.",
    landmark: "Wakad Chowk",
    pincode: "411057",
    nearbyMicroLocalities: ["Tathawade", "Dange Chowk", "Pimple Saudagar"],
    seoTitle: "Nanny Service in Wakad Pune | Trusted Babysitter & Child Care - KalyaniCare",
    metaDescription:
      "Find verified nannies and babysitters in Wakad, Pune. Daytime child care, infant support, toddler supervision, and after-school coverage.",
    searchVolumeTier: "high",
    societies: [
      { name: "RGS Forte", slug: "rgs-forte-wakad" },
      { name: "Sanskruti Casa Poli", slug: "sanskruti-casa-poli-wakad" },
      { name: "AR Atlas", slug: "ar-atlas-wakad" },
      { name: "HS Lagom Homes", slug: "hs-lagom-homes-wakad" },
      { name: "Paranjape Blue Ridge Wakad", slug: "paranjape-blue-ridge-wakad" },
      { name: "Kolte 24K Espada", slug: "kolte-24k-espada-wakad" },
      { name: "Kasturi Nagar Wakad", slug: "kasturi-nagar-wakad" },
    ],
  },
  {
    id: "bhumkar-chowk",
    name: "Bhumkar Chowk",
    slug: "bhumkar-chowk",
    shortName: "Bhumkar Chowk",
    description:
      "Junction area linking Wakad to Hinjewadi with rapidly growing residential societies -a key transit point for IT Park commuters.",
    landmark: "Bhumkar Chowk Junction",
    pincode: "411033",
    nearbyMicroLocalities: ["Bhumkar Nagar", "Wakadkar Wasti", "Hinjewadi Road"],
    seoTitle: "Nanny Service in Bhumkar Chowk | Verified Babysitters Near You - KalyaniCare",
    metaDescription:
      "Looking for a babysitter near Bhumkar Chowk? KalyaniCare helps families find verified nannies and child caregivers with replacement support.",
    searchVolumeTier: "medium",
    societies: [
      { name: "Bhumkar Nagar Societies", slug: "bhumkar-nagar-societies" },
      { name: "Sai Nagar Bhumkar Chowk", slug: "sai-nagar-bhumkar-chowk" },
      { name: "Green Valley Bhumkar", slug: "green-valley-bhumkar-chowk" },
      { name: "Shreeram Residency", slug: "shreeram-residency-bhumkar" },
      { name: "Wakadkar Wasti", slug: "wakadkar-wasti-bhumkar" },
    ],
  },
  {
    id: "baner",
    name: "Baner",
    slug: "baner",
    shortName: "Baner",
    description:
      "Established residential neighbourhood a short drive from Hinjewadi IT Park -popular with senior IT professionals and families.",
    landmark: "Baner Road",
    pincode: "411045",
    nearbyMicroLocalities: ["Balewadi", "Aundh", "Pashan", "Sus Road"],
    seoTitle: "Nanny Service in Baner Pune | Trusted Verified Babysitters - KalyaniCare",
    metaDescription:
      "Find trusted nannies and babysitters in Baner, Pune. Verified child caregivers for infant care, toddler routines, and after-school supervision.",
    searchVolumeTier: "high",
    societies: [
      { name: "VJ Portia Grande", slug: "vj-portia-grande-baner" },
      { name: "Kalpataru Jade Residences", slug: "kalpataru-jade-residences-baner" },
      { name: "Grand Legacy Baner", slug: "grand-legacy-baner" },
      { name: "Supreme Estia Baner", slug: "supreme-estia-baner" },
      { name: "Kohinoor Zen Estate", slug: "kohinoor-zen-estate-baner" },
      { name: "Kolte 24K Grazio", slug: "kolte-24k-grazio-baner" },
      { name: "Gayatri Bravuria", slug: "gayatri-bravuria-baner" },
    ],
  },
  {
    id: "marunji",
    name: "Marunji",
    slug: "marunji",
    shortName: "Marunji",
    description:
      "Fast-growing locality near Sus and Hinjewadi corridors -increasing residential density as IT Park families move outward.",
    landmark: "Marunji Village Road",
    pincode: "412115",
    nearbyMicroLocalities: ["Sus", "Kasarsai Road", "Hinjewadi Phase 3 border"],
    seoTitle: "Nanny Service in Marunji Pune | Background-Verified Babysitters - KalyaniCare",
    metaDescription:
      "Need a babysitter in Marunji near Sus or Hinjewadi? KalyaniCare matches families with local, verified nannies and child caregivers.",
    searchVolumeTier: "medium",
    societies: [
      { name: "Life Republic Marunji", slug: "life-republic-marunji" },
      { name: "Kolte Patil Western Avenue", slug: "kolte-patil-western-avenue-marunji" },
      { name: "Sus Road Societies", slug: "sus-road-societies-marunji" },
      { name: "Kasarsai Road Societies", slug: "kasarsai-road-societies-marunji" },
      { name: "Marunji Village Residences", slug: "marunji-village-residences" },
    ],
  },
] as const;

const bySlug = new Map(AREAS.map((a) => [a.slug, a]));
const byId = new Map(AREAS.map((a) => [a.id, a]));

export function getAreaBySlug(slug: string): AreaRecord | undefined {
  return bySlug.get(slug);
}

export function getAreaById(id: string): AreaRecord | undefined {
  return byId.get(id);
}

export function getAllAreaSlugs(): string[] {
  return AREAS.map((a) => a.slug);
}

export function getAllSocieties(): Society[] {
  return AREAS.flatMap((area) =>
    area.societies.map((s) => ({ ...s, areaId: area.id })),
  );
}

export function getSocietyBySlug(
  slug: string,
): (Society & { area: AreaRecord }) | undefined {
  for (const area of AREAS) {
    const society = area.societies.find((s) => s.slug === slug);
    if (society) return { ...society, areaId: area.id, area };
  }
  return undefined;
}

export function getAllSocietySlugs(): string[] {
  return getAllSocieties().map((s) => s.slug);
}
