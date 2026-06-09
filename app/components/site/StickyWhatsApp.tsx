import { WHATSAPP } from "@/lib/contact";
import { WhatsAppIcon } from "@/app/components/site/WhatsAppIcon";

const StickyWhatsApp = () => {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with KalyaniCare Nanny Services on WhatsApp"
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+5.25rem)] right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-elevated transition-bounce hover:scale-110 animate-pulse-ring md:bottom-5 md:right-5"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
};

export default StickyWhatsApp;
