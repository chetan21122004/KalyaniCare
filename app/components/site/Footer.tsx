import Link from "next/link";
import { Phone, MapPin, ArrowUpRight } from "lucide-react";
import { WhatsAppIcon } from "@/app/components/site/WhatsAppIcon";
import { BusinessMap } from "@/app/components/site/BusinessMap";
import {
  BUSINESS_ADDRESS_DISPLAY,
  CONTACT_PHONE_DISPLAY_IN,
  CONTACT_PHONE_E164,
  GOOGLE_MAPS_DIRECTIONS_URL,
  WHATSAPP,
} from "@/lib/contact";
import { EnquiryTrigger } from "@/app/components/site/EnquiryTrigger";
import { services } from "@/lib/services";
import { homeSection } from "@/lib/siteNav";

const logo = "/assets/logo_only.png";
const logotext = "/assets/logo_text.png";

const areas = [
  { name: "Hinjewadi Phase 1", slug: "hinjewadi-phase-1" },
  { name: "Hinjewadi Phase 2", slug: "hinjewadi-phase-2" },
  { name: "Hinjewadi Phase 3", slug: "hinjewadi-phase-3" },
  { name: "Megapolis", slug: "megapolis-hinjewadi" },
  { name: "Wakad", slug: "wakad" },
  { name: "Bhumkar Chowk", slug: "bhumkar-chowk" },
  { name: "Baner", slug: "baner" },
  { name: "Marunji", slug: "marunji" },
];

const quickLinks: { label: string; href: string; enquiry?: boolean }[] = [
  { label: "Babysitter & Nanny", href: homeSection("services") },
  { label: "How It Works", href: homeSection("process") },
  { label: "Areas", href: homeSection("areas") },
  { label: "About", href: homeSection("about") },
  { label: "Blog", href: "/blog" },
  { label: "Book a Nanny", href: homeSection("enquiry"), enquiry: true },
];

const Footer = () => {
  const service = services[0];

  return (
    <footer className="relative isolate overflow-hidden bg-dark text-dark-foreground">
      {/* Top accent rule */}
      <div className="h-1 w-full bg-accent" aria-hidden />

      {/* Subtle background - single layer, contained */}
      <div className="pointer-events-none absolute inset-0 bg-dots-light opacity-[0.14]" aria-hidden />
      <div
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent/12 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-primary-glow/20 blur-[100px]"
        aria-hidden
      />

      <div className="relative container mx-auto px-4 py-12 md:px-6 md:py-16">
        {/* ── Mobile ── */}
        <div className="space-y-8 md:hidden">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-16 w-16 shrink-0 object-contain" />
            <img src={logotext} alt="KalyaniCare Nanny Services" className="h-14 w-auto object-contain object-left" />
          </div>
          <p className="text-sm leading-relaxed text-dark-muted">
            Trusted babysitter and nanny care across{" "}
            <span className="font-semibold text-dark-foreground/90">Hinjewadi IT Park</span> and Pune west.
          </p>

          {/* CTAs */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${CONTACT_PHONE_E164}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-sm font-semibold transition-smooth hover:border-accent/40 hover:text-accent"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-3 py-3 text-sm font-semibold text-accent transition-smooth hover:bg-accent/20"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-3 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((item) =>
                item.enquiry ? (
                  <EnquiryTrigger
                    key={item.label}
                    href={item.href}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-center text-xs font-semibold text-dark-muted transition-smooth hover:border-accent/35 hover:text-accent"
                  >
                    {item.label}
                  </EnquiryTrigger>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-center text-xs font-semibold text-dark-muted transition-smooth hover:border-accent/35 hover:text-accent"
                  >
                    {item.label}
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Service */}
          <div>
            <h4 className="mb-3 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
              Our Service
            </h4>
            <a
              href={`/services/${service.slug}`}
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-dark-muted transition-smooth hover:border-accent/35 hover:text-dark-foreground"
            >
              <span>{service.title}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 opacity-60 transition-smooth group-hover:opacity-100" />
            </a>
          </div>

          {/* Areas */}
          <div>
            <h4 className="mb-3 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
              Service Areas
            </h4>
            <div className="flex flex-wrap gap-2">
              {areas.map((a) => (
                <a
                  key={a.slug}
                  href={`/nanny-service-in-${a.slug}`}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-dark-muted transition-smooth hover:border-accent/35 hover:text-accent"
                >
                  {a.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <h4 className="mb-3 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`tel:${CONTACT_PHONE_E164}`} className="flex items-center gap-3 font-semibold hover:text-accent transition-smooth">
                  <Phone className="h-4 w-4 text-accent shrink-0" />
                  {CONTACT_PHONE_DISPLAY_IN}
                </a>
              </li>
              <li>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold hover:text-accent transition-smooth">
                  <WhatsAppIcon className="h-4 w-4 text-accent shrink-0" />
                  WhatsApp preferred
                </a>
              </li>
              <li>
                <a
                  href={GOOGLE_MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 font-medium leading-snug hover:text-accent transition-smooth"
                >
                  <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  {BUSINESS_ADDRESS_DISPLAY}
                </a>
              </li>
            </ul>
          </div>

          <BusinessMap className="rounded-2xl border border-white/10 bg-white/[0.03] p-4" />

          <div className="border-t border-white/10 pt-6 text-center text-xs text-dark-muted">
            <p>© {new Date().getFullYear()} KalyaniCare Nanny Services. All rights reserved.</p>
            <p className="mt-2">Crafted in Hinjewadi · Pune</p>
          </div>
        </div>

        {/* ── Desktop ── */}
        <div className="hidden md:block">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Brand column */}
            <div className="lg:col-span-4">
              <a href={homeSection("top")} className="inline-flex items-center gap-4">
                <img src={logo} alt="" className="h-20 w-20 shrink-0 object-contain" />
                <img
                  src={logotext}
                  alt="KalyaniCare Nanny Services"
                  className="h-[10rem] w-auto mt-6 max-w-[min(100%,36rem)] object-contain object-left"
                />
              </a>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-dark-muted">
                Trusted babysitter and nanny care across{" "}
                <span className="font-semibold text-dark-foreground/90">Hinjewadi IT Park</span> and Pune west - verified
                caregivers, fast matching, human support.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`tel:${CONTACT_PHONE_E164}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold transition-smooth hover:border-accent/40 hover:text-accent"
                >
                  <Phone className="h-4 w-4" />
                  {CONTACT_PHONE_DISPLAY_IN}
                </a>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-4 py-2.5 text-sm font-semibold text-accent transition-smooth hover:bg-accent/20"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
              <Link
                href="/blog"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-smooth hover:text-dark-foreground hover:underline underline-offset-4"
              >
                Tips & guides
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Links columns */}
            <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
              <div>
                <h4 className="mb-4 font-display text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  {quickLinks.map((item) => (
                    <li key={item.label}>
                      {item.enquiry ? (
                        <EnquiryTrigger
                          href={item.href}
                          className="text-sm text-dark-muted transition-smooth hover:text-accent"
                        >
                          {item.label}
                        </EnquiryTrigger>
                      ) : (
                        <a
                          href={item.href}
                          className="text-sm text-dark-muted transition-smooth hover:text-accent"
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-display text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  Our Service
                </h4>
                <a
                  href={`/services/${service.slug}`}
                  className="group flex items-center gap-2 text-sm text-dark-muted transition-smooth hover:text-dark-foreground"
                >
                  {service.title}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-smooth group-hover:opacity-100" />
                </a>

                <h4 className="mb-4 mt-8 font-display text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  Service Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {areas.map((a) => (
                    <a
                      key={a.slug}
                      href={`/nanny-service-in-${a.slug}`}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-dark-muted transition-smooth hover:border-accent/35 hover:text-accent"
                    >
                      {a.name}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-4 font-display text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  Contact
                </h4>
                <ul className="space-y-4 text-sm">
                  <li>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-dark-muted mb-1">Phone</p>
                    <a href={`tel:${CONTACT_PHONE_E164}`} className="font-semibold hover:text-accent transition-smooth">
                      {CONTACT_PHONE_DISPLAY_IN}
                    </a>
                  </li>
                  <li>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-dark-muted mb-1">WhatsApp</p>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold hover:text-accent transition-smooth">
                      <WhatsAppIcon className="h-4 w-4" />
                      Message us
                    </a>
                  </li>
                  <li>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-dark-muted mb-1">Office</p>
                    <address className="not-italic font-medium leading-snug text-dark-foreground/90">
                      <a
                        href={GOOGLE_MAPS_DIRECTIONS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-smooth"
                      >
                        {BUSINESS_ADDRESS_DISPLAY}
                      </a>
                    </address>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <BusinessMap className="mt-12 max-w-2xl" />

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-dark-muted sm:flex-row">
            <p>© {new Date().getFullYear()} KalyaniCare Nanny Services. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Crafted in Hinjewadi · Pune
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
