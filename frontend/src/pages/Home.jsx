import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, Star } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CollectionCard from "@/components/CollectionCard";
import ProductCard from "@/components/ProductCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ParallaxImage, Reveal } from "@/components/Reveal";
import { useSEO, organizationJsonLd } from "@/lib/seo";
import { EASE, lineMask, viewportOnce, fadeUp } from "@/lib/motion";
import { COLLECTIONS, PRODUCTS, OCCASIONS, IMAGES, productsInCollection } from "@/data/catalog";

const HERO_LINES = ["Timeless", "Elegance"];
const HERO_SUBLINK = "for Every Space & Celebration.";

// SAMPLE reviews (placeholder content — replace with verified customer feedback)
const REVIEWS = [
  { quote: "The idol finish is beautiful — our pooja corner finally feels complete.", name: "Meera S.", city: "Bengaluru" },
  { quote: "Ordered 25 return gifts for Diwali. Everyone asked where they were from.", name: "Rohit K.", city: "Delhi" },
  { quote: "Elegant, well-packed and right on time. A perfect housewarming gift.", name: "Ananya P.", city: "Mumbai" },
];

// "Why Choose Nivoram?" value points — copy supplied by the owner
const WHY_POINTS = [
  { title: "Silver-Coated Elegance", desc: "Beautifully finished pieces with the brilliance of 999 pure silver coating." },
  { title: "Meaningful Gifting", desc: "Thoughtful gifts for celebrations and cherished moments." },
  { title: "Timeless Designs", desc: "Traditional beauty with a contemporary touch." },
  { title: "Beautiful Living", desc: "Décor that adds character and warmth to every space." },
  { title: "Every Occasion", desc: "Curated for weddings, festivals, housewarmings and more." },
  { title: "Thoughtfully Curated", desc: "Distinctive creations selected with care and attention to detail." },
];

export default function Home() {
  useSEO({
    title: "Nivoram — Timeless Elegance for Every Space & Celebration",
    description:
      "999 silver-plated and gold & silver-coated décor, divine idols and thoughtful gifting for modern Indian homes. Explore collections and enquire directly.",
    path: "/",
    jsonLd: organizationJsonLd,
  });

  const heroImgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroImgRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 6);

  return (
    <div data-testid="home-page">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" data-testid="hero-section">
        <div className="relative max-w-[1240px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[calc(100vh-170px)] py-14 lg:py-0">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
              className="text-[11px] uppercase tracking-[0.3em] text-royal mb-6"
            >
              999 Silver Coated &amp; Gold Coated Decor
            </motion.p>
            <h1 className="font-display text-[17vw] sm:text-7xl lg:text-[104px] leading-[0.95] tracking-tight text-ink">
              {HERO_LINES.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-1">
                  <motion.span
                    className={`block ${i === 1 ? "text-flame" : ""}`}
                    custom={i}
                    variants={lineMask}
                    initial="hidden"
                    animate="show"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
              <span className="block overflow-hidden pb-1 mt-2">
                <motion.span
                  className="block text-[6.4vw] sm:text-3xl lg:text-[42px] leading-tight text-ink/80"
                  custom={2}
                  variants={lineMask}
                  initial="hidden"
                  animate="show"
                >
                  {HERO_SUBLINK}
                </motion.span>
              </span>
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
                className="btn-flame inline-flex items-center gap-3 border border-transparent text-[11px] uppercase tracking-[0.2em] px-8 h-12"
              >
                <span className="relative z-[1]">Explore Collections</span>
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
                  image={c.cardImage}
                  cover={!!c.cardImage}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-20 sm:py-28 bg-warmwhite border-y border-sand" data-testid="home-bestsellers">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SectionHeading eyebrow="Bestsellers" title="Loved in Many Homes" />
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
              <Link to="/shop/bestsellers" className="nav-link inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink/70 hover:text-ink pb-1" data-testid="home-bestsellers-view-all">
                Shop bestsellers <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestsellers.map((p, i) => (
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
            highlight="Shopping For?"
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

      {/* ── GIFT FINDER BANNER ── */}
      <section className="py-14 sm:py-20" data-testid="home-gift-finder-banner">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="bg-white border border-sand grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 sm:p-12 hover:shadow-[0_24px_60px_-36px_rgba(48,43,50,0.35)] transition-shadow duration-500"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-royal mb-4 flex items-center gap-2">
                <Sparkles size={13} /> Gift Finder
              </p>
              <h2 className="font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight text-ink">
                Three Questions. One Lovely Match.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/60 max-w-md">
                Tell us the moment, the person and the budget — the Gift Finder
                curates a shortlist from the collection in under a minute.
              </p>
              <Link
                to="/gift-finder"
                data-testid="home-gift-finder-cta"
                className="mt-7 btn-flame inline-flex items-center gap-3 border border-transparent text-[11px] uppercase tracking-[0.2em] px-8 h-12"
              >
                <span className="relative z-[1]">Find the Perfect Gift</span>
                <ArrowRight size={14} className="relative z-[1]" />
              </Link>
            </div>
            <div className="bg-cream border border-sand p-7 sm:p-8">
              {[
                ["01", "The occasion", "Weddings, Diwali, housewarmings — or no occasion at all"],
                ["02", "The recipient", "Couples, elders, friends, clients and hosts"],
                ["03", "The budget", "Mindful keepsakes, premium statements, or surprise us"],
              ].map(([n, t, d], i) => (
                <div
                  key={n}
                  className={`flex items-start gap-5 py-4 ${i > 0 ? "border-t border-sand" : ""}`}
                  data-testid={`gf-banner-step-${i}`}
                >
                  <span className="font-display text-lg text-terra/80 shrink-0">{n}</span>
                  <div>
                    <p className="font-display text-xl text-ink leading-snug">{t}</p>
                    <p className="text-[13px] text-ink/50 mt-0.5">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY NIVORAM ── */}
      <section className="bg-warmwhite border-y border-sand py-20 sm:py-28" data-testid="home-why-nivoram">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Why Nivoram"
            title="Why Choose Nivoram?"
            highlight="Nivoram?"
            intro="A celebration of timeless elegance, meaningful traditions, and thoughtful gifting."
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {WHY_POINTS.map(({ title, desc }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
                className="border-t-2 border-terra/50 pt-6"
                data-testid={`why-point-${i}`}
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-royal/80 mb-3">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-display text-2xl text-ink">{title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/55">{desc}</p>
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

      {/* ── CORPORATE ── */}
      <section className="bg-ink text-cream py-20 sm:py-28" data-testid="home-corporate">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeading
              dark
              eyebrow="Corporate & Bulk Gifting"
              title="Make Every Celebration Extraordinary with Nivoram."
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
            src={IMAGES.clientGift}
            alt="Silver-plated peacock finial keepsake box"
            className="relative aspect-[4/3] border border-cream/20"
            strength={40}
          />
        </div>
      </section>

      {/* ── CUSTOMER REVIEWS (sample reviews — replace with verified feedback) ── */}
      <section className="py-20 sm:py-28" data-testid="home-reviews">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Customer Reviews"
            title="Loved by Homes Like Yours"
            intro="A few words from customers who made Nivoram part of their celebrations."
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <motion.figure
                key={r.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-white border border-sand p-8 flex flex-col gap-5 h-full"
                data-testid={`review-card-${i}`}
              >
                <div className="flex gap-1 text-flamered" aria-label="Rated 5 out of 5">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="text-[15px] leading-relaxed text-ink/80 flex-1">
                  “{r.quote}”
                </blockquote>
                <figcaption className="text-[11px] uppercase tracking-[0.18em] text-ink/50">
                  {r.name} · {r.city}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 sm:py-32" data-testid="home-closing-cta">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="rule-flame mb-16" aria-hidden="true" />
          <div className="text-center">
            <SectionHeading
              align="center"
              eyebrow="Nivoram"
              title="Find Something Meaningful."
              highlight="Meaningful."
              titleClassName="mx-auto max-w-3xl"
              intro="Whether it's a gift for someone specific or a piece for your own space — start with the catalogue, or simply tell us what the moment is."
            />
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/shop"
                data-testid="closing-explore-catalogue"
                className="btn-flame inline-flex items-center gap-3 border border-transparent text-[11px] uppercase tracking-[0.2em] px-8 h-12"
              >
                <span className="relative z-[1]">Explore the Catalogue</span>
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
        </div>
      </section>
    </div>
  );
}