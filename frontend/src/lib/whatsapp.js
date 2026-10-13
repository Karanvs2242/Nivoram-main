import { SITE_CONFIG } from "@/config/site";

const MESSAGES = {
  general:
    "Hi Nivoram, I'd like to enquire about your décor and gifting collections.",
  bulk:
    "Hi Nivoram, I'd like to discuss a bulk / corporate gifting requirement.",
};

export function waMessage({ productName, sku, context, custom } = {}) {
  if (custom) return custom;
  if (productName) {
    const skuPart = sku ? ` (SKU: ${sku})` : "";
    return `Hi Nivoram, I'm interested in ${productName}${skuPart}. Please share the current price, availability and product details.`;
  }
  return MESSAGES[context || "general"];
}

export function waLink(options) {
  const number = (SITE_CONFIG.whatsappNumber || "").replace(/[^0-9]/g, "");
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(waMessage(options))}`;
}

export const WHATSAPP_CONFIGURED = Boolean(
  (SITE_CONFIG.whatsappNumber || "").replace(/[^0-9]/g, "")
);