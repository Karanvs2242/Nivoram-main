import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "@/components/Logo";
import NavDropdown from "@/components/NavDropdown";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeaderSearch from "@/components/HeaderSearch";
import { COLLECTIONS, GIFT_OCCASIONS } from "@/data/catalog";
import { SITE_CONFIG } from "@/config/site";
import { EASE } from "@/lib/motion";

const SHOP_ITEMS = [
  { label: "Shop All", to: "/shop", desc: "The complete active catalogue" },
  { label: "New Arrivals", to: "/shop/new-arrivals", desc: "Freshly added pieces" },
  { label: "Bestsellers", to: "/shop/bestsellers", desc: "The most-loved pieces" },
];

const COLLECTION_ITEMS = COLLECTIONS.map((c) => ({
  label: c.name,
  to: `/collections/${c.slug}`,
  desc: c.short,
}));

const GIFTING_ITEMS = [
  { label: "Gift Finder", to: "/gift-finder", desc: "Three questions, lovely matches" },
  ...GIFT_OCCASIONS.map((o) => ({ label: o.label, to: o.page })),
  { label: "Corporate Gifting", to: "/corporate-gifting", desc: "Bulk & business enquiries" },
];

const ABOUT_ITEMS = [
  { label: "Our Story", to: "/our-story", desc: "Objects that make moments meaningful" },
  { label: "Why Nivoram", to: "/why-nivoram", desc: "What guides every choice" },
  { label: "Craftsmanship", to: "/craftsmanship", desc: "Our approach to finish & detail" },
];

const CONTACT_ITEMS = [
  { label: "Enquiries", to: "/contact", desc: "WhatsApp, email & enquiry form" },
  { label: "Custom Orders", to: "/contact/custom-orders", desc: "Tell us what you have in mind" },
  { label: "FAQs", to: "/faqs", desc: "Honest answers, no fine print" },
];

const MOBILE_SECTIONS = [
  { label: "Shop", items: SHOP_ITEMS, testid: "mobile-shop" },
  { label: "Collections", items: COLLECTION_ITEMS, testid: "mobile-collections" },
  { label: "Gifting", items: GIFTING_ITEMS, testid: "mobile-gifting" },
  { label: "About Us", items: ABOUT_ITEMS, testid: "mobile-about" },
  { label: "Contact", items: CONTACT_ITEMS, testid: "mobile-contact" },
];

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenSection(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const path = location.pathname;
  const isActive = (to) => path === to;
  const sectionActive = (items) =>
    items.some((it) => path === it.to || (it.to !== "/" && path.startsWith(it.to)));

  return (
    <>
      <header
        data-testid="site-header"
        className={`sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b transition-colors duration-300 ${
          scrolled ? "border-sand shadow-[0_10px_30px_-24px_rgba(48,43,50,0.35)]" : "border-transparent"
        }`}
      >
        {/* Main nav bar */}
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 h-[70px] flex items-center justify-between gap-6">
          <Logo />

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            <Link
              to="/"
              className="nav-link text-[12px] uppercase tracking-[0.18em] text-ink/75 hover:text-ink"
              data-active={isActive("/")}
              data-testid="nav-home"
            >
              Home
            </Link>
            <NavDropdown label="Shop" items={SHOP_ITEMS} active={sectionActive(SHOP_ITEMS)} testid="nav-shop" />
            <NavDropdown label="Collections" items={COLLECTION_ITEMS} active={sectionActive(COLLECTION_ITEMS)} testid="nav-collections" />
            <NavDropdown label="Gifting" items={GIFTING_ITEMS} active={sectionActive(GIFTING_ITEMS)} testid="nav-gifting" />
            <NavDropdown label="About Us" items={ABOUT_ITEMS} active={sectionActive(ABOUT_ITEMS)} testid="nav-about" />
            <NavDropdown label="Contact" items={CONTACT_ITEMS} active={sectionActive(CONTACT_ITEMS)} testid="nav-contact" />
          </nav>

          <div className="flex items-center gap-3">
            <HeaderSearch />
            <WhatsAppButton
              context="general"
              label="Enquire"
              variant="flame"
              compact
              className="hidden md:inline-flex"
              testid="header-whatsapp-btn"
            />
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              data-testid="mobile-menu-open"
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center border border-sand text-ink hover:bg-ink hover:text-cream transition-colors duration-300"
            >
              <Menu size={18} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Slim supporting message — edit in src/config/site.js */}
        <div className="bg-royal text-white" data-testid="support-strip">
          <p className="max-w-[1240px] mx-auto px-5 sm:px-8 py-[7px] text-center text-[9.5px] uppercase tracking-[0.22em]">
            {SITE_CONFIG.supportMessage}
          </p>
        </div>
      </header>

      {/* Mobile / tablet drawer — rendered OUTSIDE the blurred header so
          position:fixed covers the whole viewport */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] lg:hidden"
            data-testid="mobile-menu"
            id="mobile-menu"
          >
            <div
              className="absolute inset-0 bg-ink/40"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
              data-testid="mobile-menu-backdrop"
            />
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
              animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: reduceMotion ? 0.2 : 0.35, ease: EASE }}
              className="absolute right-0 top-0 h-full w-full max-w-[400px] bg-cream flex flex-col border-l border-sand shadow-[-24px_0_60px_-30px_rgba(48,43,50,0.4)]"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <div className="h-[70px] px-5 flex items-center justify-between border-b border-sand shrink-0">
                <Logo compact />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  data-testid="mobile-menu-close"
                  className="inline-flex h-10 w-10 items-center justify-center border border-sand text-ink hover:bg-ink hover:text-cream transition-colors"
                >
                  <X size={18} strokeWidth={1.8} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-4 overscroll-contain" aria-label="Mobile">
                <HeaderSearch variant="inline" />
                <Link
                  to="/"
                  className="block py-3.5 font-display text-[26px] text-ink border-b border-sand"
                  data-testid="mobile-nav-home"
                >
                  Home
                </Link>
                {MOBILE_SECTIONS.map((s) => {
                  const open = openSection === s.label;
                  return (
                    <div key={s.label} className="border-b border-sand" data-testid={s.testid}>
                      <button
                        type="button"
                        onClick={() => setOpenSection(open ? null : s.label)}
                        aria-expanded={open}
                        aria-controls={`${s.testid}-panel`}
                        data-testid={`${s.testid}-trigger`}
                        className="w-full flex items-center justify-between py-3.5 text-left"
                      >
                        <span className="font-display text-[26px] text-ink">{s.label}</span>
                        <ChevronDown
                          size={18}
                          className={`text-ink/50 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            id={`${s.testid}-panel`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4">
                              {s.items.map((it) => (
                                <Link
                                  key={it.to}
                                  to={it.to}
                                  className="block py-2 text-[14px] text-ink/70 hover:text-terra"
                                  data-testid={`${s.testid}-item-${it.to.replace(/\//g, "-").replace(/^-/, "")}`}
                                >
                                  {it.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              <div
                className="p-6 border-t border-sand shrink-0 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
              >
                <WhatsAppButton context="general" label="Enquire on WhatsApp" variant="solid" className="w-full" testid="mobile-whatsapp-btn" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}