import { useEffect } from "react";
import { SITE_CONFIG } from "@/config/site";

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const SHARE_IMAGE =
  "https://images.unsplash.com/photo-1771249729624-3c7dea2f7953?auto=format&fit=crop&w=1200&h=630&q=80";

/** Per-route meta. Canonical/og:url are emitted only once
 *  SITE_CONFIG.domainConfirmed is true — a placeholder canonical would
 *  silently de-index the live site, so it is omitted until then. */
export function useSEO({ title, description, path = "/", image, jsonLd } = {}) {
  useEffect(() => {
    const confirmed = SITE_CONFIG.domainConfirmed;
    const fullTitle = title ? `${title} — Nivoram` : "Nivoram — Timeless Elegance for Every Space & Celebration";
    const desc =
      description ||
      "999 silver-plated and gold & silver-coated décor, divine idols and thoughtful gifting for modern Indian homes.";
    const img = image || SHARE_IMAGE;

    document.title = fullTitle;
    setMeta("name", "description", desc);
    if (confirmed) upsertCanonical(`${SITE_CONFIG.siteUrl}${path}`);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Nivoram");
    setMeta("property", "og:image", img);
    if (confirmed) setMeta("property", "og:url", `${SITE_CONFIG.siteUrl}${path}`);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", desc);

    let script;
    if (jsonLd) {
      const clean = { ...jsonLd };
      if (!confirmed) {
        delete clean.url;
        delete clean.image;
      }
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "ld-json-page";
      script.text = JSON.stringify(clean);
      document.head.appendChild(script);
    }
    return () => {
      if (script) document.head.removeChild(script);
    };
  }, [title, description, path, image, jsonLd]);
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nivoram",
  slogan: "Timeless Elegance for Every Space & Celebration.",
  description:
    "Silver-coated home décor, decorative showpieces, spiritual décor and thoughtful gifting.",
  ...(SITE_CONFIG.domainConfirmed ? { url: SITE_CONFIG.siteUrl } : {}),
};