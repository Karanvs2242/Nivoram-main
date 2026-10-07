import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { waLink } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const href = waLink({ context: "general" });

  const handleClick = (e) => {
    if (!href) {
      e.preventDefault();
      toast.info(
        "Our official WhatsApp number is being set up. Please use the enquiry form or email for now.",
        { duration: 5000 }
      );
    }
  };

  const shared = "flex h-[54px] w-[54px] items-center justify-center rounded-full bg-wa text-white shadow-[0_14px_30px_-12px_rgba(37,211,102,0.7)] transition-colors duration-300 hover:bg-[#1DA851]";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex items-center group"
      data-testid="floating-whatsapp"
    >
      <span className="mr-3 hidden sm:block translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
        <span className="block bg-ink text-cream text-[11px] tracking-wide px-3.5 py-2 whitespace-nowrap">
          Enquire on WhatsApp
        </span>
      </span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          aria-label="Enquire on WhatsApp (opens WhatsApp)"
          data-testid="floating-whatsapp-button"
          className={`${shared} wa-pulse`}
        >
          <MessageCircle size={24} strokeWidth={1.9} aria-hidden="true" />
        </a>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          aria-label="Enquire on WhatsApp"
          data-testid="floating-whatsapp-button"
          data-whatsapp-placeholder="true"
          className={`${shared} wa-pulse`}
        >
          <MessageCircle size={24} strokeWidth={1.9} aria-hidden="true" />
        </button>
      )}
    </motion.div>
  );
}