import { Link } from "react-router-dom";
import Logo, { LogoMark } from "@/components/Logo";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_CONFIG } from "@/config/site";

const explore = [
  { label: "Home", to: "/" },
  { label: "Our Story", to: "/our-story" },
  { label: "Corporate Gifting", to: "/corporate-gifting" },
  { label: "Contact", to: "/contact" },
  { label: "Journal", to: "/journal" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream" data-testid="footer">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-5">
            <Logo dark />
            <p className="mt-6 text-[14px] leading-relaxed text-cream/60 max-w-sm">
              Silver-coated home décor, decorative showpieces, spiritual pieces
              and thoughtful gifting — designed for modern Indian homes and
              the moments that matter.
            </p>
            <div className="mt-7">
              <WhatsAppButton
                context="general"
                label="Enquire on WhatsApp"
                variant="solid"
                compact
                testid="footer-whatsapp-btn"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-[10px] uppercase tracking-[0.26em] text-cream/40 mb-5">Explore</h3>
            <ul className="space-y-3">
              {explore.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[14px] text-cream/75 hover:text-cream link-underline"
                    data-testid={`footer-link-${l.to.replace(/\//g, "-") || "home"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-[10px] uppercase tracking-[0.26em] text-cream/40 mb-5">Collections</h3>
            <ul className="space-y-3">
              {[
                "spiritual-pooja-decor",
                "statement-home-decor",
                "auspicious-living",
                "thoughtful-gifting",
                "wedding-anniversary-gifts",
                "festive-occasion-gifts",
                "corporate-bulk-gifting",
              ].map((slug, i) => (
                <li key={slug}>
                  <Link
                    to={`/collections/${slug}`}
                    className="text-[14px] text-cream/75 hover:text-cream link-underline"
                    data-testid={`footer-collection-${slug}`}
                  >
                    {["Spiritual & Pooja Décor","Statement Home Décor","Auspicious Living","Thoughtful Gifting","Wedding & Anniversary Gifts","Festive & Occasion Gifts","Corporate & Bulk Gifting"][i]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-[10px] uppercase tracking-[0.26em] text-cream/40 mb-5">Contact</h3>
            <ul className="space-y-3 text-[14px] text-cream/75">
              <li>
                <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="hover:text-cream link-underline" data-testid="footer-email-link">
                  {SITE_CONFIG.contactEmail}
                </a>
              </li>
              <li>
                {SITE_CONFIG.instagramUrl ? (
                  <a href={SITE_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cream link-underline" data-testid="footer-instagram-link">
                    Instagram {SITE_CONFIG.instagramHandle}
                  </a>
                ) : (
                  <span className="text-cream/40">Instagram — link coming soon</span>
                )}
              </li>
              <li>
                <Link to="/contact" className="hover:text-cream link-underline" data-testid="footer-contact-link">
                  General enquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-cream/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[12px] text-cream/40">
            © {new Date().getFullYear()} Nivoram. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[12px] text-cream/50">
            <Link to="/privacy-policy" className="hover:text-cream" data-testid="footer-privacy-link">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-cream" data-testid="footer-terms-link">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}