"use client";

import {
  BUSINESS_ADDRESS_DISPLAY,
  GOOGLE_MAPS_DIRECTIONS_URL,
  GOOGLE_MAPS_EMBED_SRC,
} from "@/lib/contact";

type BusinessMapProps = {
  className?: string;
  title?: string;
};

/** Crawlable address + Google Maps embed for local SEO. */
export function BusinessMap({ className, title = "SakhiHome office location on Google Maps" }: BusinessMapProps) {
  return (
    <div className={className}>
      <h3 className="sr-only">Office location</h3>
      <address className="not-italic">
        <p className="text-[10px] font-bold uppercase tracking-wider text-dark-muted">Visit us</p>
        <a
          href={GOOGLE_MAPS_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 block text-sm font-semibold leading-snug transition-smooth hover:text-accent"
        >
          {BUSINESS_ADDRESS_DISPLAY}
        </a>
      </address>
      <div className="mt-4 overflow-hidden rounded-xl md:rounded-2xl border border-white/10 shadow-sm ring-1 ring-black/5">
        <iframe
          src={GOOGLE_MAPS_EMBED_SRC}
          title={title}
          width="600"
          height="450"
          className="h-[200px] w-full sm:h-[240px] md:h-[280px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
}
