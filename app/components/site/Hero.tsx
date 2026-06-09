"use client";

import { Button } from "@/components/ui/button";
import { ShieldCheck, Clock, RefreshCw, MapPin, Phone, Sparkles as SparklesIcon, Star, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/app/components/site/WhatsAppIcon";
import { useMemo, useRef, useState } from "react";
import { homeSection } from "@/lib/siteNav";
import { WHATSAPP } from "@/lib/contact";

function openEnquiryPopup(e?: React.MouseEvent) {
  e?.preventDefault();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openEnquiryPopup"));
  }
}

const logo = "logo_both.png";
const bg1 = "assets/bg_vdos/1.mp4";
const bg2 = "assets/bg_vdos/2.mp4";
const bg3 = "assets/bg_vdos/3.mp4";

const baby1 = "/assets/baby_imgs/1.jpg";
const baby3 = "/assets/baby_imgs/3.jpg";
const baby4 = "/assets/baby_imgs/4.jpg";

const VIDEOS = [bg1, bg2, bg3];

const MobileHero = () => (
  <div className="md:hidden animate-fade-up">
    <div className="mx-auto max-w-[26rem]">
      {/* Eyebrow */}
      <div className="flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/75">
          <MapPin className="h-3 w-3 text-accent" />
          Hinjewadi · Pune
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-accent/35 bg-accent/10 px-2.5 py-1 text-[10px] font-bold text-accent">
          <Star className="h-3 w-3 fill-accent" /> 4.9
        </span>
      </div>

      {/* Headline — background video/image already provides the visual */}
      <div className="mt-6 rounded-3xl border border-white/12 bg-white/[0.04] px-4 py-5 backdrop-blur-sm">
        <p className="font-display text-white text-2xl font-bold leading-tight">
          Trusted Nannies for{" "}
          <span className="text-accent">Hinjewadi</span>{" "}
          families
        </p>
        <div className="mt-3 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-dark/50 px-2.5 py-1 backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            <span className="text-[10px] font-bold text-white">Verified</span>
          </span>
        </div>
      </div>

      {/* Subcopy */}
      <p className="mt-4 text-[13.5px] leading-relaxed text-white/70">
        A network of{" "}
        <span className="font-semibold text-white">verified babysitters and nannies</span>
        {" "}— matched to your child-care routine.
      </p>

      {/* CTA row */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button
          variant="hero"
          className="group h-12 w-full rounded-xl text-[13px] font-bold tracking-tight"
          onClick={openEnquiryPopup}
        >
          <SparklesIcon className="h-4 w-4" />
          Get Instant Match
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
        <Button
          variant="outline"
          asChild
          className="h-12 w-full rounded-xl border-white/20 bg-white/[0.04] text-[13px] font-semibold text-white backdrop-blur-md hover:border-white/35 hover:bg-white/[0.08] hover:text-white"
        >
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </Button>
      </div>

      {/* Meta strip */}
      <div className="mt-6 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] py-3 text-center">
        {[
          { icon: ShieldCheck, label: "Verified" },
          { icon: Clock, label: "Fast Match" },
          { icon: RefreshCw, label: "Replacement" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1 px-2">
            <Icon className="h-4 w-4 text-accent" aria-hidden />
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Areas note */}
      <p className="mt-5 text-center text-[11px] font-medium tracking-wide text-white/45">
        <span className="text-white/70">Areas</span>
        <span className="mx-2 text-white/25">·</span>
        Wakad · Baner · Marunji · Phase 1-3 · Megapolis
      </p>
    </div>
  </div>
);

const Hero = () => {
  const [active, setActive] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [failedVideos, setFailedVideos] = useState<number[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const allFailed = failedVideos.length >= VIDEOS.length;

  const activePlayableIndex = useMemo(() => {
    if (allFailed) return -1;
    for (let step = 0; step < VIDEOS.length; step += 1) {
      const candidate = (active + step) % VIDEOS.length;
      if (!failedVideos.includes(candidate)) return candidate;
    }
    return -1;
  }, [active, allFailed, failedVideos]);

  const nextPlayableIndex = (from: number) => {
    for (let step = 1; step <= VIDEOS.length; step += 1) {
      const candidate = (from + step) % VIDEOS.length;
      if (!failedVideos.includes(candidate)) return candidate;
    }
    return from;
  };

  const handleVideoEnded = () => {
    if (allFailed || activePlayableIndex < 0) return;
    setVideoReady(false);
    setActive(nextPlayableIndex(activePlayableIndex));
  };

  const handleVideoError = () => {
    if (activePlayableIndex < 0) return;
    setFailedVideos((prev) => (prev.includes(activePlayableIndex) ? prev : [...prev, activePlayableIndex]));
    setVideoReady(false);
    setActive(nextPlayableIndex(activePlayableIndex));
  };

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden min-h-[100svh] flex items-center pt-24 pb-12 md:pt-32 md:pb-14"
    >
      {/* Background layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-dark-radial" aria-hidden />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,hsl(var(--primary-glow)/0.5),transparent_55%),radial-gradient(ellipse_at_85%_80%,hsl(var(--accent-deep)/0.35),transparent_55%),radial-gradient(ellipse_at_60%_40%,hsl(var(--accent)/0.2),transparent_60%)]"
          aria-hidden
        />

        {/* Fallback background when videos are loading or unavailable */}
        <img
          src={baby1}
          alt=""
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
            allFailed || !videoReady ? "opacity-60" : "opacity-0"
          }`}
        />

        {!allFailed && activePlayableIndex >= 0 && (
          <video
            key={VIDEOS[activePlayableIndex]}
            ref={videoRef}
            src={VIDEOS[activePlayableIndex]}
            autoPlay
            muted
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoReady(true)}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
              videoReady ? "opacity-60" : "opacity-0"
            }`}
            aria-hidden
          />
        )}

        {/* Readability overlays */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-black/5 transition-opacity duration-700"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55" aria-hidden />
        <div className="absolute inset-0 bg-grid-light opacity-[0.07]" aria-hidden />
      </div>

      {/* Floating accent orbs */}
      <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-accent/25 blur-[120px] animate-glow-pulse pointer-events-none" aria-hidden />
      <div className="absolute bottom-1/4 -right-20 h-80 w-80 rounded-full bg-primary-glow/25 blur-[120px] animate-glow-pulse pointer-events-none" aria-hidden style={{ animationDelay: "1.5s" }} />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <h1 className="sr-only">
          Trusted babysitter and nanny services in Hinjewadi, Pune for infant, toddler, and after-school care
        </h1>

        {/* Desktop / tablet layout (md+) */}
        <div className="hidden md:block">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
            {/* Left — content */}
            <div className="text-center lg:text-left animate-fade-up">
              {/* Status pill */}
              <div className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-2 text-xs font-semibold text-white border border-white/15 shadow-elevated">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <MapPin className="h-3.5 w-3.5 text-accent" />
                <span>Serving Hinjewadi IT Park, Pune</span>
                <span className="mx-1 h-3 w-px bg-white/20" />
                <span className="flex items-center gap-1 text-accent">
                  <Star className="h-3 w-3 fill-accent" /> 4.9
                </span>
              </div>

              {/* Headline */}
              <p className="mx-auto mt-6 max-w-[18ch] font-display text-3xl font-semibold leading-[1.08] tracking-[-0.015em] text-white sm:text-4xl lg:mx-0 lg:text-[3.2rem]">
                <span className="block text-white/85">Trusted Nannies for</span>
                <span className="mt-1 block font-extrabold text-white">
            <span className="text-accent">Hinjewadi families</span>
                </span>
              </p>

              <p className="mt-5 text-base md:text-lg text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Tap into a network of{" "}
                <span className="font-bold text-accent">background-verified child caregivers</span>{" "}
                for infants, toddlers and after-school supervision — matched to your family routine.
              </p>

              {/* CTAs */}
              <div id="book" className="mt-6 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button variant="hero" size="xl" className="group" onClick={openEnquiryPopup}>
                  <SparklesIcon className="h-4 w-4" /> Book Nanny in Hinjewadi
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="glass" size="xl" asChild>
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                </Button>
              </div>

              {/* Trust highlights */}
              <ul className="mt-10 mx-auto lg:mx-0 max-w-xl lg:max-w-2xl space-y-3 sm:flex sm:flex-row sm:items-stretch sm:gap-3 sm:space-y-0 list-none">
                {[
                  { icon: ShieldCheck, title: "Verified", detail: "ID & address screened" },
                  { icon: Clock, title: "Fast match", detail: "Often same day · local network" },
                  { icon: RefreshCw, title: "Replacement", detail: "24–48 hrs if needed" },
                ].map(({ icon: Icon, title, detail }) => (
                  <li
                    key={title}
                    className="relative flex flex-1 min-w-0 flex-row items-center gap-3.5 rounded-2xl glass border border-white/12 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-white/[0.04] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_12px_36px_-20px_rgba(0,0,0,0.6)] md:rounded-[1.25rem]"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/20 text-accent">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-sm font-extrabold tracking-tight text-white leading-snug">{title}</p>
                      <p className="mt-0.5 text-[11px] sm:text-xs text-white/58 leading-snug">{detail}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Areas served */}
              <p className="mt-6 text-xs font-medium text-white/50 tracking-wide">
                <span className="text-white/70">Areas:</span> Wakad · Bhumkar Chowk · Baner · Marunji · Phase 1-3 · Megapolis
              </p>
            </div>

            {/* Right — large logo with floating baby photos */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Halo rings */}
                <div className="absolute inset-0 bg-gradient-brand rounded-full blur-[100px] opacity-60 scale-90 animate-glow-pulse" aria-hidden />
                <div className="absolute inset-10 bg-accent/40 rounded-full blur-[70px] opacity-60" aria-hidden />
                <div className="absolute inset-0 rounded-full border border-white/10 scale-110" aria-hidden />

                <img
                  src={`/assets/${logo}`}
                  alt="KalyaniCare Nanny Services"
                  className="relative w-full max-w-md lg:max-w-lg mx-auto animate-float drop-shadow-2xl"
                  style={{ animationDuration: "7s" }}
                />

                {/* Floating mini photo cards */}
                <div
                  className="hidden md:block absolute -left-10 top-10 w-32 overflow-hidden rounded-2xl border-2 border-white/20 shadow-elevated animate-float"
                  style={{ animationDelay: "1s", animationDuration: "6s" }}
                >
                  <img
                    src={baby3}
                    alt="Toddler care Hinjewadi"
                    className="w-full h-28 object-cover"
                  />
                </div>

                <div
                  className="hidden md:block absolute -right-8 bottom-10 w-28 overflow-hidden rounded-2xl border-2 border-white/20 shadow-elevated animate-float"
                  style={{ animationDelay: "2s", animationDuration: "8s" }}
                >
                  <img
                    src={baby4}
                    alt="Babysitter with child in Pune"
                    className="w-full h-24 object-cover"
                  />
                </div>

                {/* Verified badge card */}
                <div className="hidden md:flex absolute -left-4 bottom-16 items-center gap-2 rounded-2xl glass-strong border border-white/15 px-3 py-2 shadow-elevated animate-float" style={{ animationDelay: "0.8s" }}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] text-white/60 leading-none">Background</div>
                    <div className="text-sm font-bold text-white leading-tight">Verified Care</div>
                  </div>
                </div>

                {/* Rating badge */}
                <div className="hidden md:flex absolute -right-2 top-8 items-center gap-2 rounded-2xl glass-strong border border-white/15 px-3 py-2 shadow-elevated animate-float" style={{ animationDelay: "1.6s" }}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <Star className="h-4 w-4 fill-accent" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] text-white/60 leading-none">Rated</div>
                    <div className="text-sm font-bold text-white leading-tight">4.9 / 5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Desktop layout */}

        {/* Mobile layout (<md) */}
        <MobileHero />
        {/* /Mobile layout */}
      </div>
    </section>
  );
};

export default Hero;
