import { Users, TrendingUp, Repeat, Heart, ShieldCheck } from "lucide-react";

const babyImg = "/assets/baby_imgs/4.jpg";


const items = [
  { icon: Users, num: "Focused", title: "Nanny Network", desc: "A child-care focused network built for Hinjewadi IT Park families." },
  { icon: TrendingUp, num: "Weekly", title: "Growing Supply", desc: "New verified babysitters and nannies are added regularly." },
  { icon: Repeat, num: "24-48h", title: "Quick Replacement", desc: "Backup caregiver options arranged quickly when availability changes." },
  { icon: Heart, num: "100%", title: "Local Matching", desc: "Caregivers matched nearby for better reliability and punctuality." },
];

const mobileShortDesc: Record<string, string> = {
  "Nanny Network": "Child-care network built for Hinjewadi families.",
  "Growing Supply": "New verified caregivers added regularly.",
  "Quick Replacement": "Backup arranged within 24-48 hours.",
  "Local Matching": "Caregivers near your home.",
};

const MobileTrust = () => (
  <div className="md:hidden">
    {/* Heading */}
    <div className="mx-auto max-w-[26rem] text-left">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">
        <ShieldCheck className="h-3 w-3 text-accent" />
        Why KalyaniCare
      </span>
      <p className="mt-4 font-display text-[1.85rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
        Built on <span className="text-accent">trust</span>,
        <span className="block">run with care</span>
      </p>
      <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">
        Not a faceless app -your local nanny care partner in Hinjewadi.
      </p>

      {/* Hairline */}
      <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>

    {/* Trust cards -single column stack */}
    <div className="mx-auto mt-6 grid max-w-[26rem] grid-cols-1 gap-3">
      {items.map(({ icon: Icon, num, title }) => (
        <div
          key={title}
          className="relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
        >
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow">
            <Icon className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-[15px] font-bold leading-tight text-white">
                {title}
              </p>
              <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                {num}
              </span>
            </div>
            <p className="mt-1 text-[12.5px] leading-snug text-white/60">
              {mobileShortDesc[title]}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TrustSection = () => {
  return (
    <section className="relative py-12 bg-gradient-dark-radial overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-accent/20 blur-[120px] animate-glow-pulse pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-primary-glow/20 blur-[120px] animate-glow-pulse pointer-events-none" style={{ animationDelay: "2s" }} aria-hidden />
      <div className="absolute inset-0 bg-grid-light opacity-[0.06] pointer-events-none" aria-hidden />

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Desktop / tablet layout (md+) -preserved exactly */}
        <div className="hidden md:block">
          <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center mb-16 max-w-5xl mx-auto text-center md:text-left">
            <div className="hidden md:flex justify-start">
              <div className="relative w-64 lg:w-72 overflow-hidden rounded-[2rem] shadow-elevated border border-white/15 animate-float">
                <img
                  src={babyImg}
                  alt="Dependable child care and family support in Hinjewadi"
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />
              </div>
            </div>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full glass-strong border border-white/15 px-4 py-1.5 text-xs font-bold text-white uppercase tracking-wider">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                Why KalyaniCare
              </span>
              <h2 className="mt-5 font-display text-4xl md:text-6xl font-extrabold text-white text-balance leading-[1.05]">
                Built on <span className="text-accent">trust</span>,
                <br className="hidden sm:block" /> run with care
              </h2>
              <p className="mt-5 text-lg text-white/70 max-w-xl mx-auto md:mx-0">
                {"We're not a faceless app. We're your local nanny care partner in Hinjewadi."}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map(({ icon: Icon, num, title, desc }, i) => (
              <div
                key={title}
                className="group relative rounded-3xl glass border border-white/10 p-7 transition-all duration-500 hover:border-accent/40 hover:-translate-y-2 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gradient-brand opacity-0 group-hover:opacity-30 blur-3xl transition-all duration-700" aria-hidden />
                {/* Number watermark */}
                <div className="absolute -bottom-4 -right-2 font-display text-7xl font-extrabold text-white/[0.04] select-none pointer-events-none">
                  0{i + 1}
                </div>

                <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-glow">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="relative mt-5 font-display text-2xl font-extrabold text-accent">{num}</p>
                <h3 className="relative mt-1 font-display text-lg font-bold text-white">{title}</h3>
                <p className="relative mt-2 text-sm text-white/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* /Desktop / tablet layout */}

        {/* Mobile layout (<md) -minimal premium */}
        <MobileTrust />
        {/* /Mobile layout */}
      </div>
    </section>
  );
};

export default TrustSection;
