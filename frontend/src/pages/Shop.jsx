import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import { useSEO } from "@/lib/seo";
import { viewportOnce, fadeUp } from "@/lib/motion";
import {
  PRODUCTS,
  OCCASIONS,
  OCCASION_LABELS,
  newArrivals,
  bestsellers,
} from "@/data/catalog";

const MODES = {
  all: {
    title: "The Complete Catalogue",
    eyebrow: "Shop All",
    path: "/shop",
    description:
      "Browse the full Nivoram catalogue — silver-tone décor, spiritual pieces, accents and keepsakes. Filter by occasion or enquire directly.",
    intro:
      "Every piece in the active Nivoram catalogue — browse the full edit, or filter by the occasion you're shopping for.",
  },
  new: {
    title: "New Arrivals",
    eyebrow: "Shop",
    path: "/shop/new-arrivals",
    description: "The latest pieces to join the Nivoram collection.",
    intro: "The latest pieces to join the collection.",
  },
  bestsellers: {
    title: "Bestsellers",
    eyebrow: "Shop",
    path: "/shop/bestsellers",
    description: "The most-loved Nivoram pieces, as marked by the studio.",
    intro: "The pieces our customers return for, again and again.",
  },
};

const EmptyEdit = ({ mode }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={viewportOnce}
    className="border border-sand bg-white p-10 sm:p-14 text-center max-w-2xl mx-auto"
    data-testid={`shop-${mode}-empty`}
  >
    <p className="text-[11px] uppercase tracking-[0.24em] text-terra mb-4">Edit refreshing</p>
    <h2 className="font-display text-3xl text-ink">Nothing marked here yet.</h2>
    <p className="mt-3 text-[14px] leading-relaxed text-ink/55">
      {mode === "new"
        ? "New Arrivals appear here once the studio marks new pieces in the catalogue — no piece is labelled new until it's confirmed."
        : "Bestsellers appear here once a piece is explicitly marked as a bestseller — we don't label sales status we can't verify."}
    </p>
    <Link
      to="/shop"
      data-testid={`shop-${mode}-empty-cta`}
      className="mt-8 inline-flex items-center border border-ink bg-ink text-cream text-[11px] uppercase tracking-[0.2em] px-8 h-12 hover:bg-transparent hover:text-ink transition-colors duration-300"
    >
      Shop All Instead
    </Link>
  </motion.div>
);

export default function Shop({ mode = "all" }) {
  const [occasion, setOccasion] = useState("all");
  const meta = MODES[mode];

  const base =
    mode === "new" ? newArrivals() : mode === "bestsellers" ? bestsellers() : PRODUCTS;

  const products = useMemo(
    () =>
      occasion === "all" ? base : base.filter((p) => p.occasions.includes(occasion)),
    [base, occasion]
  );

  useSEO({
    title: meta.title,
    description: meta.description,
    path: meta.path,
    image: PRODUCTS[0]?.image,
  });

  const showFilters = mode === "all" || base.length > 0;

  return (
    <div data-testid={`shop-${mode}-page`}>
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-16 pb-10 sm:pt-20">
        <SectionHeading eyebrow={meta.eyebrow} title={meta.title} intro={meta.intro} />
      </section>

      {showFilters && (
        <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pb-10">
          <div className="flex flex-wrap items-center gap-3" data-testid="shop-filters">
            <span className="text-[10px] uppercase tracking-[0.22em] text-ink/40 mr-2">
              Filter by occasion
            </span>
            {[["all", "All"], ...OCCASIONS.map((o) => [o.key, OCCASION_LABELS[o.key] || o.label])].map(
              ([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setOccasion(key)}
                  data-testid={`shop-filter-${key}`}
                  className={`text-[11px] uppercase tracking-[0.16em] px-4 py-2 border transition-colors duration-300 ${
                    occasion === key
                      ? "border-ink bg-ink text-cream"
                      : "border-sand text-ink/60 hover:border-ink hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              )
            )}
          </div>
        </section>
      )}

      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pb-24">
        {base.length === 0 ? (
          <EmptyEdit mode={mode} />
        ) : (
          <>
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink/40 mb-8" data-testid="shop-count">
              {products.length} {products.length === 1 ? "piece" : "pieces"}
            </p>
            {products.length === 0 ? (
              <div className="border border-sand bg-white p-10 text-center" data-testid="shop-filter-empty">
                <p className="text-[14px] text-ink/55">
                  No pieces match this occasion yet — try another filter, or browse everything.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}