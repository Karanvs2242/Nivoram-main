import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";
import WhatsAppButton from "@/components/WhatsAppButton";
import { COLLECTIONS } from "@/data/catalog";
import { EASE } from "@/lib/motion";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Our Story", to: "/our-story" },
  { label: "Corporate Gifting", to: "/corporate-gifting" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDropOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isCollections = location.pathname.startsWith("/collections");

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b transition-colors duration-300 ${
        scrolled ? "border-sand shadow-[0_10px_30px_-24px_rgba(48,43,50,0.35)]" : "border-transparent"
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-6">
        <Logo />

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          <Link to="/" className="nav-link text-[12px] uppercase tracking-[0.18em] text-ink/75 hover:text-ink" data-testid="nav-home">
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setDropOpen(true)}
            onMouseLeave={() => setDropOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDropOpen((v) => !v)}
              onFocus={() => setDropOpen(true)}
              aria-expanded={dropOpen}
              aria-haspopup="true"
              data-testid="nav-collections-trigger"
              className={`nav-link flex items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] ${
                isCollections ? "text-ink" : "text-ink/75 hover:text-ink"
              }`}
              data-active={isCollections}
            >
              Collections
              <ChevronDown size={13} className={`transition-transform duration-300 ${dropOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {dropOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-4"
                  data-testid="collections-dropdown"
                >
                  <div className="bg-cream border border-sand shadow-[0_24px_60px_-30px_rgba(48,43,50,0.35)] p-2 grid grid-cols-1 w-[340px]">
                    {COLLECTIONS.map((c) => (
                      <Link
                        key={c.slug}
                        to={`/collections/${c.slug}`}
                        className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-white group"
                        data-testid={`dropdown-collection-${c.slug}`}
                      >
                        <span>
                          <span className="block text-[13px] text-ink group-hover:text-terra transition-colors duration-300">{c.name}</span>
                          <span className="block text-[11px] text-ink/45 mt-0.5">{c.short}</span>
                        </span>
                        <ArrowUpRight size={14} className="text-ink/30 group-hover:text-terra transition-colors" />
                      </Link>
                    ))}
                    <Link to="/collections" className="mt-1 border-t border-sand px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-terra hover:text-ink transition-colors" data-testid="dropdown-view-all">
                      View all collections
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="nav-link text-[12px] uppercase tracking-[0.18em] text-ink/75 hover:text-ink"
              data-testid={`nav-${n.to.replace(/\//g, "")}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <WhatsAppButton
            context="general"
            label="Enquire"
            variant="outline"
            compact
            className="hidden md:inline-flex hover:!text-cream"
            testid="header-whatsapp-btn"
          />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            data-testid="mobile-menu-open"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center border border-sand text-ink hover:bg-ink hover:text-cream transition-colors duration-300"
          >
            <Menu size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] lg:hidden bg-cream flex flex-col"
            data-testid="mobile-menu"
          >
            <div className="h-[72px] px-5 flex items-center justify-between border-b border-sand">
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
            <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Mobile">
              <motion.div
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
                className="flex flex-col"
              >
                {[{ label: "Home", to: "/" }, { label: "All Collections", to: "/collections" }, ...NAV.slice(1)].map((n) => (
                  <motion.div key={n.to} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}>
                    <Link
                      to={n.to}
                      className="block py-4 font-display text-3xl text-ink border-b border-sand"
                      data-testid={`mobile-nav-${n.to.replace(/\//g, "")}`}
                    >
                      {n.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.p variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }} className="mt-8 text-[10px] uppercase tracking-[0.26em] text-ink/40 mb-3">
                  Collections
                </motion.p>
                {COLLECTIONS.map((c) => (
                  <motion.div key={c.slug} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }}>
                    <Link
                      to={`/collections/${c.slug}`}
                      className="block py-2.5 text-[14px] text-ink/70 hover:text-terra"
                      data-testid={`mobile-collection-${c.slug}`}
                    >
                      {c.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </nav>
            <div className="p-6 border-t border-sand">
              <WhatsAppButton context="general" label="Enquire on WhatsApp" variant="solid" className="w-full" testid="mobile-whatsapp-btn" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}