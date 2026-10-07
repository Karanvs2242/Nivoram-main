import { toast } from "sonner";
import { MessageCircle } from "lucide-react";
import { waLink, WHATSAPP_CONFIGURED } from "@/lib/whatsapp";

const VARIANTS = {
  solid:
    "bg-wa text-white hover:bg-[#1DA851] border border-transparent",
  outline:
    "bg-transparent text-ink border border-ink/30 hover:border-ink hover:bg-ink hover:text-cream",
  float: "bg-wa text-white shadow-lg",
};

export default function WhatsAppButton({
  productName,
  sku,
  context,
  label = "Enquire on WhatsApp",
  variant = "solid",
  className = "",
  testid = "whatsapp-btn",
  compact = false,
  rounded = false,
}) {
  const href = waLink({ productName, sku, context });

  const handleClick = (e) => {
    if (!href) {
      e.preventDefault();
      toast.info(
        "Our official WhatsApp number is being set up. Please use the enquiry form or email for now.",
        { duration: 5000 }
      );
    }
  };

  const base = compact
    ? "inline-flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.18em] px-4 h-10 transition-colors duration-300"
    : "inline-flex items-center justify-center gap-2.5 text-[11px] uppercase tracking-[0.18em] px-7 h-12 transition-colors duration-300";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        data-testid={testid}
        aria-label={`${label} (opens WhatsApp)`}
        className={`${base} ${VARIANTS[variant]} ${rounded ? "rounded-full" : ""} ${className}`}
      >
        <MessageCircle size={compact ? 14 : 16} strokeWidth={1.8} aria-hidden="true" />
        <span className="truncate">{label}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      data-testid={testid}
      data-whatsapp-placeholder="true"
      aria-label={label}
      className={`${base} ${VARIANTS[variant]} ${rounded ? "rounded-full" : ""} ${className}`}
    >
      <MessageCircle size={compact ? 14 : 16} strokeWidth={1.8} aria-hidden="true" />
      <span className="truncate">{label}</span>
    </button>
  );
}

export { WHATSAPP_CONFIGURED };