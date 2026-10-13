import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Info } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import NotFound from "@/pages/NotFound";
import { useSEO } from "@/lib/seo";
import { EASE } from "@/lib/motion";
import { getProduct, getCollection, PRODUCTS } from "@/data/catalog";

const SPEC_ROWS = (product) => [
  ["Material", product.material],
  ["Coating / finish", product.coating],
  ["Dimensions", product.dimensions],
  ["Weight", product.weight],
  ["Care instructions", product.care],
  ["Availability", product.availability],
];

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const [active, setActive] = useState(0);

  useSEO({
    title: product ? product.name : "Product",
    description: product?.description,
    path: `/products/${slug}`,
    image: product?.image,
  });

  if (!product) return <NotFound />;

  const images = product.images?.length ? product.images : [product.image];
  const main = images[Math.min(active, images.length - 1)];

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.collections.some((c) => product.collections.includes(c))
  ).slice(0, 4);

  return (
    <div data-testid="product-detail-page">
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-10 pb-16">
        <nav className="flex items-center flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-ink/45 mb-10" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-ink">Home</Link>
          <ChevronRight size={12} />
          <Link to="/collections" className="hover:text-ink">Collections</Link>
          <ChevronRight size={12} />
          <Link
            to={`/collections/${product.collections[0]}`}
            className="hover:text-ink"
            data-testid="breadcrumb-product-collection"
          >
            {getCollection(product.collections[0])?.name}
          </Link>
          <ChevronRight size={12} />
          <span className="text-ink/70 normal-case">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <motion.div
              key={main}
              initial={{ opacity: 0.4, scale: 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative aspect-[4/5] sm:aspect-[5/4] bg-white border border-sand overflow-hidden"
              data-testid="product-gallery-main"
            >
              <img src={main} alt={product.name} className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" />
              {product.placeholder && (
                <span className="absolute top-3 left-3 bg-cream/90 text-ink/70 text-[9px] uppercase tracking-[0.2em] px-2.5 py-1.5">
                  Sample imagery
                </span>
              )}
            </motion.div>
            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1" data-testid="product-gallery-thumbs">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-current={active === i}
                    data-testid={`product-thumb-${i}`}
                    className={`relative shrink-0 w-20 h-20 border overflow-hidden transition-colors duration-300 ${
                      active === i ? "border-transparent shadow-[0_0_0_2px_#EA3A2E]" : "border-sand hover:border-ink/40"
                    }`}
                  >
                    <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.24em] text-royal mb-3" data-testid="product-sku">
              {product.sku}
            </p>
            {(product.isNew || product.isBestseller) && (
              <div className="flex flex-wrap gap-2 mb-4" data-testid="product-status-badges">
                {product.isNew && (
                  <span className="bg-flame text-white text-[9px] uppercase tracking-[0.2em] px-2.5 py-1.5">
                    New Arrival
                  </span>
                )}
                {product.isBestseller && (
                  <span className="bg-royal text-white text-[9px] uppercase tracking-[0.2em] px-2.5 py-1.5">
                    Bestseller
                  </span>
                )}
              </div>
            )}
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight text-ink" data-testid="product-name">
              {product.name}
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-ink/60" data-testid="product-description">
              {product.description}
            </p>

            {product.placeholder && (
              <div className="mt-6 border border-sand bg-white p-4 flex gap-3" data-testid="product-placeholder-note">
                <Info size={16} className="text-royal shrink-0 mt-0.5" />
                <p className="text-[13px] leading-relaxed text-ink/60">
                  <strong className="text-ink/80 font-medium">Sample listing.</strong> Verified
                  specifications, studio photographs and confirmed pricing will
                  replace these details before launch.
                </p>
              </div>
            )}

            {/* Specs */}
            <dl className="mt-8 border-t border-sand" data-testid="product-specs">
              {SPEC_ROWS(product).map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-6 py-3 border-b border-sand">
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-ink/45 shrink-0">{label}</dt>
                  <dd className="text-[14px] text-ink/75 text-right">
                    {value || <span className="text-ink/40">On request</span>}
                  </dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-6 py-3 border-b border-sand">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-ink/45 shrink-0">Price</dt>
                <dd className="text-[14px] text-royal">Price on enquiry</dd>
              </div>
            </dl>

            {/* Collections */}
            <div className="mt-6 flex flex-wrap gap-2">
              {product.collections.map((slug) => {
                const c = getCollection(slug);
                return c ? (
                  <Link
                    key={slug}
                    to={`/collections/${slug}`}
                    className="text-[10px] uppercase tracking-[0.18em] border border-sand px-3 py-2 text-ink/60 hover:border-royal hover:text-royal transition-colors duration-300"
                    data-testid={`product-collection-chip-${slug}`}
                  >
                    {c.name}
                  </Link>
                ) : null;
              })}
            </div>

            {/* Enquiry actions */}
            <div className="mt-9 flex flex-wrap gap-4">
              <WhatsAppButton
                productName={product.name}
                sku={product.sku}
                label="Enquire on WhatsApp"
                variant="solid"
                testid="product-whatsapp-btn"
              />
              {product.bulkEligible && (
                <Link
                  to="/corporate-gifting"
                  data-testid="product-bulk-link"
                  className="inline-flex items-center border border-ink/30 text-ink text-[11px] uppercase tracking-[0.2em] px-7 h-12 hover:border-ink hover:bg-ink hover:text-cream transition-colors duration-300"
                >
                  Bulk enquiry
                </Link>
              )}
            </div>
            <p className="mt-4 text-[12px] text-ink/45">
              Your WhatsApp enquiry will include the product name and SKU automatically.
            </p>
          </div>
        </div>
      </section>

      {/* Related — warm band */}
      {related.length > 0 && (
        <section className="bg-warmwhite border-t border-sand py-16">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <h2 className="font-display text-3xl text-ink mb-8" data-testid="related-products-heading">Related pieces</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}