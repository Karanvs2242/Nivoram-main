/**
 * NIVORAM — central site configuration.
 *
 * ── LAUNCH CHECKLIST (business must supply) ─────────────────────────────
 *  whatsappNumber : official WhatsApp business number in international
 *                   format without "+", e.g. "919876543210". CONFIGURED —
 *                   all WhatsApp buttons across the site are live.
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
  tagline: "Timeless Elegance for Every Space & Celebration.",
  siteUrl: "https://nivoram.com", // PLACEHOLDER — final domain
  domainConfirmed: false, // flip to true once the production domain is live
  supportMessage: "Thoughtfully Selected Décor & Meaningful Gifts | India & UAE Enquiries",
  whatsappNumber: "917760511222", // official WhatsApp business number (+91 77605 11222)
  instagramUrl: "https://www.instagram.com/nivoram.shop", // official — from the catalogue
  instagramHandle: "@nivoram.shop", // official — from the catalogue
  contactEmail: "info@nivoram.com", // official business email
};