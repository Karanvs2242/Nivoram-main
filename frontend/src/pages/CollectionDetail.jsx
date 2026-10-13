import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CollectionCard from "@/components/CollectionCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import NotFound from "@/pages/NotFound";
import { useSEO } from "@/lib/seo";
import { EASE, viewportOnce, fadeUp } from "@/lib/motion";
import { OCCASION_LABELS } from "@/data/catalog";
import { COLLECTIONS, getCollection, productsInCollection } from "@/data/catalog";

export default function CollectionDetail() {
  const { slug } = useParams();
  const collection = getCollection(slug);
  const [occasion, setOccasion] = useState("all");

  useSEO({
    title: collection ? collection.name : "Collection",
    description: collection?.description,
    path: `/collections/${slug}`,
    image: collection?.image,
  });

  const products = useMemo(
    () => (collection ? productsInCollection(collection.slug) : []),
    [collection]
  );

  const occasionOptions = useMemo(() => {
    const set = new Set();
    products.forEach((p) => p.occasions.forEach((o) => set.add(o)));
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(
    () =>
      occasion === "all"
        ? products
        : products.filter((p) => p.occasions.includes(occasion)),
    [products, occasion]
  );

  if (!collection) return <NotFound />;

  const related = COLLECTIONS.filter((c) => c.slug !== collection.slug).slice(0, 3);

  return (
    <div data-testid="collection-detail-page">
      {/* Banner — gradient framed */}
      <section className="relative">
        <div className="p-[2px] bg-flame" data-testid="collection-banner-frame">
          <div className="relative h-[38vh] min-h-[300px] overflow-hidden bg-white">
            <motion.img
              src={collection.image}
              alt={collection.alt}
              initial={{ scale: 1.08, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: EASE }}
              className="absolute inset-0 w-full h-full object-cover"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* Heading */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink/45 mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-ink" data-testid="breadcrumb-home">Home</Link>
          <ChevronRight size={12} />
          <Link to="/collections" className="hover:text-ink" data-testid="breadcrumb-collections">Collections</Link>
          <ChevronRight size={12} />
          <span className="text-ink/70">{collection.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-ink"
              data-testid="collection-title"
            >
              {collection.name}
            </motion.h1>
          </div>
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
              className="text-[15px] leading-relaxed text-ink/60"
            >
              {collection.description}
            </motion.p>
          </div>
        </div>

        {/* Filters */}
        {occasionOptions.length > 1 && (
          <div className="mt-10 flex flex-wrap items-center gap-3" data-testid="collection-filters">
            <span className="text-[10px] uppercase tracking-[0.22em] text-ink/40 mr-2">Filter by occasion</span>
            {[["all", "All"], ...occasionOptions.map((o) => [o, OCCASION_LABELS[o] || o])].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setOccasion(key)}
                data-testid={`collection-filter-${key}`}
                className={`text-[11px] uppercase tracking-[0.16em] px-4 py-2 border transition-colors duration-300 ${
                  occasion === key
                    ? "border-transparent bg-flame text-white"
                    : "border-sand text-ink/60 hover:border-ink hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Products — warm band */}
      <section className="bg-warmwhite border-y border-sand py-14">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink/40 mb-8" data-testid="collection-count">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
          {filtered.length === 0 ? (
            <div className="border border-sand bg-white p-10 text-center">
              <p className="text-[14px] text-ink/55">
                No pieces match this filter yet — try another occasion, or enquire directly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}

          {/* Enquiry CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-16 border border-sand bg-white p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            data-testid="collection-enquiry-panel"
          >
            <div>
              <h2 className="font-display text-3xl text-ink">Enquire about this collection</h2>
              <p className="mt-2 text-[14px] text-ink/55 max-w-lg">
                Share the piece or occasion you have in mind — we'll respond with
                current pricing, availability and details.
              </p>
            </div>
            <WhatsAppButton
              context="general"
              label="Enquire on WhatsApp"
              variant="solid"
              className="shrink-0"
              testid="collection-whatsapp-btn"
            />
          </motion.div>
        </div>
      </section>

      {/* Related collections */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 mt-16 pb-24">
        <h2 className="font-display text-3xl text-ink mb-8">You may also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {related.map((c, i) => (
            <CollectionCard key={c.slug} collection={c} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}