import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { viewportOnce, fadeUp } from "@/lib/motion";

export default function ProductCard({ product, index = 0 }) {
  const handleQuickEnquire = (e) => {
    e.preventDefault();
    const href = waLink({ productName: product.name, sku: product.sku });
    if (href) window.open(href, "_blank", "noopener,noreferrer");
    else
      toast.info("Our official WhatsApp number is being set up. DM @nivoram.shop on Instagram meanwhile.", {
        duration: 6000,
      });
  };

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ duration: 0.7, delay: (index % 4) * 0.07 }}
      className="group bg-white border border-sand hover:border-transparent hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(234,58,46,0.35),0_18px_40px_-22px_rgba(224,74,54,0.3)] transition-all duration-300 flex flex-col"
      data-testid={`product-card-${product.slug}`}
    >
      <Link to={`/products/${product.slug}`} className="block relative overflow-hidden aspect-square" aria-label={product.name}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={product.pos ? { objectPosition: product.pos } : undefined}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {product.placeholder && (
          <span className="absolute top-3 left-3 bg-cream/90 text-ink/70 text-[9px] uppercase tracking-[0.2em] px-2.5 py-1.5">
            Sample imagery
          </span>
        )}
        {(product.isNew || product.isBestseller) && (
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5" data-testid={`product-badges-${product.slug}`}>
            {product.isNew && (
              <span className="bg-flame text-white text-[9px] uppercase tracking-[0.2em] px-2.5 py-1.5 shadow-[0_6px_16px_-8px_rgba(224,74,54,0.7)]">
                New Arrival
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-royal text-white text-[9px] uppercase tracking-[0.2em] px-2.5 py-1.5 shadow-[0_6px_16px_-8px_rgba(172,47,203,0.7)]">
                Bestseller
              </span>
            )}
          </div>
        )}
      </Link>
      <div className="p-5 flex flex-col flex-1 border-t border-sand">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl leading-snug text-ink">
              <Link to={`/products/${product.slug}`} className="link-underline">
                {product.name}
              </Link>
            </h3>
            <p className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-ink/40">
              {product.sku}
            </p>
          </div>
          <button
            type="button"
            onClick={handleQuickEnquire}
            data-testid={`product-quick-enquire-${product.slug}`}
            aria-label={`Enquire about ${product.name} on WhatsApp`}
            className="shrink-0 inline-flex h-9 w-9 items-center justify-center border border-sand text-ink/60 hover:bg-wa hover:border-wa hover:text-white transition-colors duration-300"
          >
            <MessageCircle size={15} strokeWidth={1.8} />
          </button>
        </div>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-[12px] text-royal">Price on enquiry</span>
          <Link
            to={`/products/${product.slug}`}
            className="text-[10px] uppercase tracking-[0.22em] text-ink/60 hover:text-ink transition-colors duration-300"
            data-testid={`product-details-link-${product.slug}`}
          >
            Details →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}