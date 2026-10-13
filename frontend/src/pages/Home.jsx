import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Instagram } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CollectionCard from "@/components/CollectionCard";
import ProductCard from "@/components/ProductCard";
import Marquee from "@/components/Marquee";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ParallaxImage, Reveal } from "@/components/Reveal";
import { useSEO, organizationJsonLd } from "@/lib/seo";
import { EASE, lineMask, viewportOnce, fadeUp } from "@/lib/motion";
import { COLLECTIONS, PRODUCTS, OCCASIONS, IMAGES, productsInCollection } from "@/data/catalog";
import { SITE_CONFIG } from "@/config/site";

const HERO_LINES = ["Elegance", "That Lasts."];

export default function Home() {
  useSEO({
    title: "Nivoram — Elegance That Lasts",
    description:
      "999 silver-plated and gold & silver-coated décor, divine idols and thoughtful gifting for modern Indian homes. Explore collections and enquire directly.",
    path: "/",
    jsonLd: organizationJsonLd,
  });

  const heroImgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroImgRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 6);

  return (
    <div data-testid="home-page">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" data-testid="hero-section">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[calc(100vh-170px)] py-14 lg:py-0">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
              className="text-[11px] uppercase tracking-[0.3em] text-terra mb-6"
            >
              999 Silver-Plated &amp; Gold-Coated Décor
            </motion.p>
            <h1 className="font-display text-[17vw] sm:text-7xl lg:text-[104px] leading-[0.95] tracking-tight text-ink">
              {HERO_LINES.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-1">
                  <motion.span
                    className="block"
                    custom={i}
                    variants={lineMask}
                    initial="hidden"
                    animate="show"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
              className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/60"
            >
              Thoughtfully chosen décor and meaningful gifts for the moments
              and spaces that matter.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/collections"
                data-testid="hero-explore-collections"
                className="btn-sweep btn-sweep-dark inline-flex items-center gap-3 border border-ink bg-ink text-cream text-[11px] uppercase tracking-[0.2em] px-8 h-12"
              >
                <span>Explore Collections</span>
                <ArrowRight size={14} className="relative z-[1]" />
              </Link>
              <Link
                to="/gift-finder"
                data-testid="hero-find-perfect-gift"
                className="inline-flex items-center border border-ink/30 text-ink text-[11px] uppercase tracking-[0.2em] px-8 h-12 hover:border-ink hover:bg-ink hover:text-cream transition-colors duration-300"
              >
                Find the Perfect Gift
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2" ref={heroImgRef}>
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
              className="relative"
            >
              <div className="absolute -inset-3 sm:-inset-4 border border-sand pointer-events-none" aria-hidden="true" />
              <div className="relative aspect-[4/5] bg-white overflow-hidden">
                <motion.img
                  src={IMAGES.hero}
                  alt={IMAGES.heroAlt}
                  style={reduced ? undefined : { y: imgY }}
                  className="absolute inset-0 w-full h-[115%] object-cover"
                  fetchPriority="high"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee items={["999 Silver-Plated", "Gold & Silver Coated", "Divine Idols", "Thoughtful Gifting", "Made for Indian Homes"]} />

      {/* ── SHOP BY COLLECTION ── */}
      <section className="py-20 sm:py-28" data-testid="home-collections">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="Shop by Collection"
              title="Curated for Every Corner & Occasion"
              className="sm:max-w-xl"
            />
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
              <Link
                to="/shop"
                className="nav-link inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink/70 hover:text-ink pb-1"
                data-testid="home-shop-all-link"
              >
                Shop all pieces <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-12">
            {COLLECTIONS.map((c, i) => {
              const pattern = [
                { span: "lg:col-span-7", aspect: "aspect-[16/11]" },
                { span: "lg:col-span-5", aspect: "aspect-[16/11]" },
                { span: "lg:col-span-4", aspect: "aspect-[4/3]" },
                { span: "lg:col-span-4", aspect: "aspect-[4/3]" },
                { span: "lg:col-span-4", aspect: "aspect-[4/3]" },
              ][i] || { span: "lg:col-span-6", aspect: "aspect-[16/9]" };
              return (
                <CollectionCard
                  key={c.slug}
                  index={i}
                  collection={{ ...c, count: productsInCollection(c.slug).length }}
                  className={pattern.span}
                  aspect={pattern.aspect}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-20 sm:py-28 bg-white border-y border-sand" data-testid="home-featured">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SectionHeading eyebrow="Featured Pieces" title="Currently in Focus" />
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
              <Link to="/shop" className="nav-link inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink/70 hover:text-ink pb-1" data-testid="home-featured-view-all">
                Browse everything <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOP BY OCCASION ── */}
      <section className="py-20 sm:py-28" data-testid="home-occasions">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Shop by Occasion"
            title="What Are You Shopping For?"
            intro="Two ways to explore Nivoram — by collection, or by the occasion you're shopping for."
            className="mb-12"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {OCCASIONS.map((o, i) => (
              <motion.div
                key={o.key}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.07 }}
              >
                <Link to={o.page} className="group block" data-testid={`occasion-card-${o.key}`}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-white border border-sand">
                    <img
                      src={o.image}
                      alt={o.label}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <span className="absolute top-3 right-3 h-7 w-7 inline-flex items-center justify-center bg-cream/90 text-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                  <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-ink/70 group-hover:text-terra transition-colors duration-300">
                    {o.label}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY NIVORAM ── */}
      <section className="bg-white border-y border-sand py-20 sm:py-28" data-testid="home-why-nivoram">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Why Nivoram"
            title="Thoughtful Details. Meaningful Moments."
            intro="Every piece is shortlisted with one question — would you keep this gift? Three things guide the answer."
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              ["01", "Gifting-led", "Every piece is chosen to be kept, displayed and remembered — not merely sold."],
              ["02", "Contemporary Indian design", "Familiar motifs in 999 silver-plated and gold & silver-coated finishes, made for how homes look today."],
              ["03", "Affordable premium", "Considered craftsmanship and detailing, without the premium-brand markup."],
            ].map(([n, t, d], i) => (
              <motion.div
                key={n}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="border-t-2 border-terra/50 pt-6"
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-terra/80 mb-3">{n}</p>
                <h3 className="font-display text-2xl text-ink">{t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/55">{d}</p>
              </motion.div>
            ))}
          </div>
          <Reveal className="mt-12">
            <Link
              to="/why-nivoram"
              data-testid="home-why-nivoram-link"
              className="nav-link inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink/70 hover:text-ink pb-1"
            >
              Read why Nivoram <ArrowRight size={13} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── BRAND STORY ── */}
      <section className="py-20 sm:py-28" data-testid="home-brand-story">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ParallaxImage
            src={IMAGES.story}
            alt="Silver-plated Radha-Krishna pair from the Nivoram catalogue"
            className="relative aspect-[4/5] bg-white border border-sand order-2 lg:order-1"
            strength={50}
          />
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Brand Story"
              title="Born From the Exchange."
              intro="Nivoram began with a simple observation: the gifts people remember are rarely the expensive ones — they are the ones that stayed. We choose 999 silver-plated and gold & silver-coated pieces that carry that meaning into modern Indian homes."
            />
            <Reveal className="mt-6">
              <p className="text-[15px] leading-relaxed text-ink/60 max-w-xl">
                Silver carried the auspiciousness Indian traditions associate
                with it, sat comfortably in contemporary homes, and
                photographed the way gifts deserve to be remembered.
              </p>
            </Reveal>
            <Reveal className="mt-9">
              <Link
                to="/our-story"
                data-testid="home-discover-story"
                className="btn-sweep btn-sweep-dark inline-flex items-center gap-3 border border-ink text-[11px] uppercase tracking-[0.2em] px-8 h-12 text-ink"
              >
                <span>Read Our Story</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CORPORATE ── */}
      <section className="bg-ink text-cream py-20 sm:py-28" data-testid="home-corporate">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeading
              dark
              eyebrow="Corporate & Bulk Gifting"
              title="Thoughtful Gifting, Made Personal."
              intro="For teams, clients, conferences and celebrations at scale — we help businesses give gifts that feel considered rather than corporate. Share your requirement and we'll curate options with a tailored quote."
            />
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/corporate-gifting"
                data-testid="home-corporate-quote-btn"
                className="btn-sweep btn-sweep-light inline-flex items-center gap-3 border border-cream bg-cream text-ink text-[11px] uppercase tracking-[0.2em] px-8 h-12"
              >
                <span>Request a Bulk Quote</span>
              </Link>
            </motion.div>
          </div>
          <ParallaxImage
            src={IMAGES.corporateGift}
            alt="Ornate silver-plated keepsake box"
            className="relative aspect-[4/3] border border-cream/20"
            strength={40}
          />
        </div>
      </section>

      {/* ── SOCIAL ── */}
      <section className="py-20 sm:py-28" data-testid="home-social">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Social Inspiration"
            title="Follow the Studio"
            intro="Styling notes, festive edits and new pieces — straight from @nivoram.shop."
            className="mb-10"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {IMAGES.socialGrid.map((src, i) => (
              <motion.a
                key={i}
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="group relative aspect-square overflow-hidden bg-white border border-sand"
                aria-label="Open Instagram"
                data-testid={`social-tile-${i}`}
              >
                <img src={src} alt="Nivoram styling inspiration" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                <span className="absolute inset-0 flex items-center justify-center bg-ink/0 group-hover:bg-ink/25 transition-colors duration-300">
                  <Instagram size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 sm:py-32 border-t border-sand" data-testid="home-closing-cta">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 text-center">
          <SectionHeading
            align="center"
            eyebrow="Nivoram"
            title="Find Something Meaningful."
            titleClassName="mx-auto max-w-3xl"
            intro="Whether it's a gift for someone specific or a piece for your own space — start with the catalogue, or simply tell us what the moment is."
          />
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              data-testid="closing-explore-catalogue"
              className="btn-sweep btn-sweep-dark inline-flex items-center gap-3 border border-ink bg-ink text-cream text-[11px] uppercase tracking-[0.2em] px-8 h-12"
            >
              <span>Explore the Catalogue</span>
            </Link>
            <Link
              to="/contact"
              data-testid="closing-contact-nivoram"
              className="inline-flex items-center border border-ink/30 text-ink text-[11px] uppercase tracking-[0.2em] px-8 h-12 hover:border-ink hover:bg-ink hover:text-cream transition-colors duration-300"
            >
              Contact Nivoram
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}