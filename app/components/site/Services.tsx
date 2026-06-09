import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Baby,
  Heart,
  HandHeart,
  ArrowRight,
  ShieldCheck,
  Clock,
  RefreshCw,
  Star,
  CheckCircle2,
  Sparkles,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ServiceIconKey } from "@/lib/services";
import { services } from "@/lib/services";
import { homeSection } from "@/lib/siteNav";

const baby1 = "/assets/baby_imgs/1.jpg";
const baby2 = "/assets/baby_imgs/2.jpg";
const baby3 = "/assets/baby_imgs/3.jpg";

const iconByKey: Record<ServiceIconKey, LucideIcon> = {
  baby: Baby,
  heart: Heart,
  handHeart: HandHeart,
};

const service = services[0];
const Icon = iconByKey[service.iconKey];
const detailHref = `/services/${service.slug}`;

const featurePillars = [
  { icon: ShieldCheck, label: "Background Verified", desc: "ID & address screened before placement" },
  { icon: Clock, label: "Fast Match", desc: "Same-day options from our local network" },
  { icon: RefreshCw, label: "Replacement Support", desc: "New caregiver arranged in 24–48 hrs" },
];

const MobileServices = () => (
  <div className="md:hidden">
    {/* Header */}
    <div className="mx-auto max-w-[26rem] text-left">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-gradient-brand-soft px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-deep">
        <Sparkles className="h-3 w-3" />
        {service.tag ?? "Babysitter & Nanny"}
      </span>
      <h2 className="mt-4 font-display text-[1.85rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-primary-deep">
        {service.title}
      </h2>
      <p className="mt-3 text-[13.5px] leading-relaxed text-foreground/65">{service.mobileSummary}</p>

      {/* Points */}
      <ul className="mt-5 space-y-3">
        {service.points.map((p) => (
          <li key={p} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-3 w-3" />
            </span>
            <span className="text-[13px] text-foreground/75 leading-snug">{p}</span>
          </li>
        ))}
      </ul>

      {/* Price badge */}
      <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-[11px] font-bold text-primary-deep">
        <span className="text-accent">₹</span> {service.priceRange}
      </div>

      {/* CTA */}
      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
    </div>

    {/* Photo */}
    <div className="mx-auto mt-5 max-w-[26rem]">
      <div className="relative overflow-hidden rounded-2xl shadow-card">
        <img
          src={baby3}
          alt="Professional nanny with child — KalyaniCare Hinjewadi"
          className="w-full h-52 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div className="flex items-center gap-1.5 rounded-xl bg-white/90 px-2.5 py-1 text-[11px] font-bold text-primary-deep">
            <Star className="h-3 w-3 fill-accent text-accent" />
            4.9 Rating
          </div>
          <div className="flex items-center gap-1.5 rounded-xl bg-primary px-2.5 py-1 text-[11px] font-bold text-white">
            <ShieldCheck className="h-3 w-3" />
            Verified
          </div>
        </div>
      </div>

    </div>

    {/* CTA strip */}
    <div className="mx-auto mt-6 max-w-[26rem] space-y-3">
      <Button variant="hero" asChild className="h-12 w-full rounded-xl text-[13px] font-bold">
        <a href={homeSection("enquiry")}>
          <ShieldCheck className="h-4 w-4" />
          Get Nanny Match
          <ArrowRight className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="outline" asChild className="h-11 w-full rounded-xl text-[13px]">
        <Link href={detailHref}>
          View service details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  </div>
);

const Services = () => {
  return (
    <section id="services" className="relative py-16 md:py-20 bg-gradient-soft overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-accent/15 blur-[110px] pointer-events-none" aria-hidden />
      <div className="absolute bottom-20 -right-20 h-80 w-80 rounded-full bg-primary/15 blur-[120px] pointer-events-none" aria-hidden />

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Desktop layout */}
        <div className="hidden md:block">
          {/* Section label */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-brand-soft border border-primary/20 px-4 py-1.5 text-xs font-bold text-primary-deep uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              Babysitter & Nanny
            </span>
          </div>

          {/* Featured service — two-column split */}
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Left — service details */}
            <div>
              {/* Tag + title */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand-soft border border-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </div>
                {service.tag && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                    <Sparkles className="h-3 w-3" />
                    {service.tag}
                  </span>
                )}
              </div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.2rem] font-extrabold text-primary-deep leading-[1.05] tracking-tight text-balance">
                {service.title}
              </h2>

              <p className="mt-5 text-lg text-foreground/70 leading-relaxed max-w-lg">
                One service for families in Hinjewadi, Wakad, and Baner — babysitter and nanny care, matched to your routine.
              </p>

              {/* Service points */}
              <ul className="mt-8 space-y-4">
                {service.points.map((p, idx) => (
                  <li key={p} className="flex items-start gap-4 group">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      0{idx + 1}
                    </span>
                    <span className="text-foreground/80 font-medium leading-snug group-hover:text-primary-deep transition-colors">{p}</span>
                  </li>
                ))}
              </ul>

              {/* Pricing badge */}
              <div className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-secondary bg-secondary/60 px-5 py-2.5">
                <span className="text-base font-bold text-accent">₹</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground/60">Indicative range</p>
                  <p className="text-sm font-bold text-primary-deep">{service.priceRange}</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="hero" size="lg" asChild className="group">
                  <a href={homeSection("enquiry")}>
                    <ShieldCheck className="h-4 w-4" />
                    Book Nanny in Hinjewadi
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href={detailHref}>
                    View full details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Location chips */}
              <div className="mt-6 flex items-center gap-2 flex-wrap">
                <MapPin className="h-4 w-4 text-primary/60 shrink-0" />
                {["Hinjewadi", "Wakad", "Baner", "Megapolis", "Marunji"].map((area) => (
                  <span key={area} className="text-xs font-semibold text-foreground/60 after:content-['·'] after:ml-2 after:text-foreground/30 last:after:hidden">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — photo collage */}
            <div className="relative">
              {/* Halo glow */}
              <div className="absolute -inset-8 bg-primary/5 rounded-[3rem] blur-[60px] pointer-events-none" aria-hidden />

              {/* Main photo */}
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-elevated border border-primary/10">
                <img
                  src={baby2}
                  alt="Trusted nanny with infant — KalyaniCare Hinjewadi Pune"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />

                {/* Rating badge */}
                <div className="absolute top-5 right-5 flex items-center gap-2 rounded-2xl border border-white/25 bg-white/90 backdrop-blur-sm px-3 py-2 shadow-sm">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <div>
                    <p className="text-xs font-bold text-primary-deep leading-none">4.9 / 5</p>
                    <p className="text-[10px] text-foreground/60">Family rating</p>
                  </div>
                </div>

                {/* Verified badge */}
                <div className="absolute top-5 left-5 flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary px-3 py-1.5 shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-white" />
                  <span className="text-xs font-bold text-white">Verified</span>
                </div>

                {/* Service label at bottom */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="rounded-2xl border border-white/20 bg-dark/70 px-4 py-3 backdrop-blur-md">
                    <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">Available in Hinjewadi</p>
                    <p className="text-sm font-bold text-white">Babysitter & Nanny</p>
                  </div>
                </div>
              </div>

              {/* Secondary photo - floating accent */}
              <div
                className="absolute -left-8 bottom-16 w-36 overflow-hidden rounded-2xl border-2 border-white shadow-elevated animate-float"
                style={{ animationDuration: "7s", animationDelay: "1s" }}
              >
                <img
                  src={baby1}
                  alt="Baby care Hinjewadi"
                  className="w-full h-28 object-cover"
                />
              </div>
            </div>
          </div>

       

        </div>
        {/* /Desktop layout */}

        {/* Mobile layout */}
        <MobileServices />
        {/* /Mobile layout */}
      </div>
    </section>
  );
};

export default Services;
