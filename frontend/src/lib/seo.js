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

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO({ title, description, path = "/", image, jsonLd } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — Nivoram` : "Nivoram — Elegance That Lasts";
    const desc =
      description ||
      "Silver-coated home décor, decorative showpieces, spiritual pieces and thoughtful gifting.";
    const url = `${SITE_CONFIG.siteUrl}${path}`;
    const img =
      image ||
      "https://images.unsplash.com/photo-1771249729624-3c7dea2f7953?auto=format&fit=crop&w=1200&q=80";

    document.title = fullTitle;
    setMeta("name", "description", desc);
    setCanonical(url);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:image", img);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", desc);

    let script;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "ld-json-page";
      script.text = JSON.stringify(jsonLd);
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
  slogan: "Elegance That Lasts.",
  description:
    "Silver-coated home décor, decorative showpieces, spiritual décor and thoughtful gifting.",
  url: SITE_CONFIG.siteUrl,
};