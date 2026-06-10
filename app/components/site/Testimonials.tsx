import { Quote, Star } from "lucide-react";

const baby1 = "/assets/baby_imgs/1.jpg";
const baby4 = "/assets/baby_imgs/4.jpg";

const items = [
  {
    name: "Priya S.",
    location: "Megapolis, Hinjewadi Phase 3",
    text: "Found a warm daytime nanny through KalyaniCare within 2 days. Our toddler settled faster than we expected.",
  },
  {
    name: "Rahul M.",
    location: "Blue Ridge, Phase 1",
    text: "When our babysitter became unavailable, KalyaniCare arranged replacement options quickly. Lifesaver for a working couple.",
  },
  {
    name: "Anjali K.",
    location: "Hinjewadi Phase 2",
    text: "Loved the personal touch. They actually listen to what we need and don't just send anyone. Truly local and trustworthy.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-10 md:py-16 bg-background overflow-hidden">
      {/* Warm accent orbs */}
      <div className="absolute top-0 -left-32 h-64 w-64 rounded-full bg-secondary/60 blur-[100px] pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 -right-32 h-64 w-64 rounded-full bg-accent/15 blur-[100px] pointer-events-none" aria-hidden />

      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="grid md:grid-cols-[auto_1fr] gap-5 md:gap-10 items-center mb-10 md:mb-14 max-w-5xl mx-auto text-center md:text-left">
          {/* Baby image - desktop only */}
          <div className="hidden md:block relative shrink-0">
            <div className="relative w-52 lg:w-64 overflow-hidden rounded-[2rem] shadow-card border border-border">
              <img
                src={baby1}
                alt="Happy family using KalyaniCare nanny services"
                className="w-full h-52 object-cover animate-float"
                style={{ animationDuration: "8s" }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/10" />
              {/* Floating rating badge on photo */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-1.5 rounded-xl bg-white/90 backdrop-blur-sm py-1.5 px-2 shadow-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                ))}
                <span className="text-[11px] font-bold text-primary-deep ml-1">4.9</span>
              </div>
            </div>
          </div>

          <div>
            <span className="inline-block rounded-full bg-gradient-brand-soft px-3.5 md:px-4 py-1 text-[10px] md:text-xs font-bold text-primary-deep uppercase tracking-[0.18em] md:tracking-wider">
              Real Stories
            </span>
            <h2 className="mt-3 md:mt-4 font-display text-[1.9rem] leading-tight sm:text-4xl md:text-5xl md:leading-tight font-extrabold text-primary-deep text-balance">
              What <span className="text-primary">Hinjewadi families</span> say
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Trusted experiences from families across Phase 1, Phase 2, and nearby communities.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {items.map((t, idx) => (
            <div
              key={t.name}
              className="group relative rounded-2xl md:rounded-3xl bg-card/95 border border-border p-5 sm:p-6 md:p-7 shadow-soft hover:shadow-card transition-smooth md:hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 h-28 w-28 md:h-32 md:w-32 rounded-full bg-gradient-brand opacity-10 md:opacity-0 md:group-hover:opacity-10 blur-2xl transition-smooth" aria-hidden />
              <Quote className="absolute top-4 right-4 md:top-6 md:right-6 h-7 w-7 md:h-9 md:w-9 text-accent/35 md:text-accent/40" />
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 md:h-4 md:w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="mt-3.5 md:mt-4 text-sm md:text-base text-foreground/80 md:text-foreground/75 leading-relaxed">
                {`\u201C${t.text}\u201D`}
              </p>
              <div className="mt-5 md:mt-6 pt-4 md:pt-5 border-t border-border flex items-center gap-3">
                {/* Avatar - use baby photo for last card, initials for others */}
                {idx === 2 ? (
                  <div className="h-10 w-10 md:h-11 md:w-11 overflow-hidden rounded-full border-2 border-accent/30 shadow-sm shrink-0">
                    <img src={baby4} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="grid h-10 w-10 md:h-11 md:w-11 place-items-center rounded-full bg-gradient-brand text-white text-sm md:text-base font-bold shrink-0">
                    {t.name[0]}
                  </div>
                )}
                <div>
                  <p className="font-bold text-sm md:text-base text-primary-deep">{t.name}</p>
                  <p className="text-[11px] md:text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
