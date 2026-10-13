/**
 * NIVORAM — central site configuration.
 *
 * ── LAUNCH CHECKLIST (business must supply) ─────────────────────────────
 *  whatsappNumber : official WhatsApp business number in international
 *                   format without "+", e.g. "919876543210". Currently a
 *                   PLACEHOLDER — buttons show an honest fallback until set.
 *  instagramUrl   : official Instagram profile URL.
 *  contactEmail   : official business email.
 *  siteUrl + domainConfirmed : final production domain. Once the domain is
 *                   live, set siteUrl to it and flip domainConfirmed to true
 *                   (this enables canonical/og:url tags) and update
 *                   public/robots.txt + public/sitemap.xml.
 *  supportMessage : the slim strip beneath the navigation — edit here only.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const SITE_CONFIG = {
  brand: "Nivoram",
  tagline: "Elegance That Lasts.",
  siteUrl: "https://nivoram.com", // PLACEHOLDER — final domain
  domainConfirmed: false, // flip to true once the production domain is live
  supportMessage: "Thoughtfully Selected Décor & Meaningful Gifts | India & UAE Enquiries",
  whatsappNumber: "", // PLACEHOLDER — official WhatsApp business number
  instagramUrl: "", // PLACEHOLDER — official Instagram URL
  instagramHandle: "@nivoram", // PLACEHOLDER — official handle
  contactEmail: "hello@nivoram.com", // PLACEHOLDER — official business email
};