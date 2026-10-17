import { Link } from "react-router-dom";
import Logo, { MandalaMark } from "@/components/Logo";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_CONFIG } from "@/config/site";

const SHOP = [
  ["Shop All", "/shop"],
  ["New Arrivals", "/shop/new-arrivals"],
  ["Bestsellers", "/shop/bestsellers"],
];

const COLLECTIONS = [
  ["Sacred Elegance", "sacred-elegance"],
  ["Statement Décor", "statement-decor"],
  ["Auspicious Living", "auspicious-living"],
  ["Divine Grace", "divine-grace"],
  ["Thoughtful Gifting", "thoughtful-gifting"],
];

const GIFTING = [
  ["Gift Finder", "/gift-finder"],
  ["Wedding Gifts", "/gifts/weddings"],
  ["Housewarming Gifts", "/gifts/housewarming"],
  ["Festive Gifts", "/gifts/festive"],
  ["Return Gifts", "/gifts/return"],
  ["Corporate Gifting", "/corporate-gifting"],
];

const ABOUT = [
  ["Our Story", "/our-story"],
  ["Why Nivoram", "/why-nivoram"],
  ["Craftsmanship", "/craftsmanship"],
];

const CONTACT = [
  ["Enquiries", "/contact"],
  ["Custom Orders", "/contact/custom-orders"],
  ["FAQs", "/faqs"],
  ["Journal", "/journal"],
];

const Col = ({ title, links, testidPrefix }) => (
  <div>
    <h3 className="text-[10px] uppercase tracking-[0.26em] text-lav/80 mb-5">{title}</h3>
    <ul className="space-y-2.5">
      {links.map(([label, to]) => (
        <li key={to}>
          <Link
            to={to}
            className="text-[13.5px] text-cream/75 hover:text-cream link-underline"
            data-testid={`footer-${testidPrefix}-${to.replace(/\//g, "-").replace(/^-/, "")}`}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-ink text-cream" data-testid="footer">
      <div className="h-[3px] bg-flame" aria-hidden="true" />
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          <div className="col-span-2 md:col-span-4">
            <Logo dark />
            <p className="mt-6 text-[14px] leading-relaxed text-cream/60 max-w-sm">
              999 silver-plated and gold &amp; silver-coated décor, divine
              idols and thoughtful gifts — designed for modern Indian homes
              and the moments that matter.
            </p>
            <div className="mt-7 flex flex-col items-start gap-4">
              <WhatsAppButton
                context="general"
                label="Enquire on WhatsApp"
                variant="solid"
                compact
                testid="footer-whatsapp-btn"
              />
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="text-[13.5px] text-cream/75 hover:text-cream link-underline"
                data-testid="footer-email-link"
              >
                {SITE_CONFIG.contactEmail}
              </a>
              {SITE_CONFIG.instagramUrl ? (
                <a
                  href={SITE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13.5px] text-cream/75 hover:text-cream link-underline"
                  data-testid="footer-instagram-link"
                >
                  Instagram {SITE_CONFIG.instagramHandle}
                </a>
              ) : (
                <span className="text-[13.5px] text-cream/40">Instagram — link coming soon</span>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <Col title="Shop" links={SHOP} testidPrefix="shop" />
          </div>
          <div className="md:col-span-3">
            <Col title="Collections" links={COLLECTIONS} testidPrefix="collection" />
          </div>
          <div className="md:col-span-3">
            <Col title="Gifting" links={GIFTING} testidPrefix="gifting" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 mt-12 pt-10 border-t border-cream/10">
          <div className="md:col-span-4">
            <Col title="About Us" links={ABOUT} testidPrefix="about" />
          </div>
          <div className="md:col-span-4">
            <Col title="Contact" links={CONTACT} testidPrefix="contact" />
          </div>
          <div className="md:col-span-4 flex md:justify-end items-start">
            <div className="hidden md:block">
              <MandalaMark size={44} />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-cream/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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