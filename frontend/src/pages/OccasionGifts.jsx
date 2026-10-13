import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import NotFound from "@/pages/NotFound";
import { useSEO } from "@/lib/seo";
import { EASE, viewportOnce, fadeUp } from "@/lib/motion";
import { GIFT_OCCASIONS, productsForOccasion } from "@/data/catalog";

export default function OccasionGifts() {
  const { key } = useParams();

  const occ = GIFT_OCCASIONS.find((o) => o.key === key);

  useSEO({
    title: occ ? occ.label : "Gifts by Occasion",
    description: occ?.blurb,
    path: `/gifts/${key}`,
    image: occ?.image,
  });

  if (key === "corporate") return <Navigate to="/corporate-gifting" replace />;

  if (!occ) return <NotFound />;

  const products = productsForOccasion(key);
  const others = GIFT_OCCASIONS.filter((o) => o.key !== key);

  return (
    <div data-testid={`gifts-${key}-page`}>
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-16 pb-10 sm:pt-20">
        <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink/45 mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-ink" data-testid="breadcrumb-home">Home</Link>
          <ChevronRight size={12} />
          <span className="text-ink/70">{occ.label}</span>
        </nav>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="text-[11px] uppercase tracking-[0.3em] text-royal mb-5"
        >
          Gifts by Occasion
        </motion.p>
        <h1 className="font-display text-[13vw] sm:text-6xl lg:text-[76px] leading-[0.98] tracking-tight text-ink" data-testid="occasion-title">
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            >
              {occ.label}
            </motion.span>
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
          className="mt-7 max-w-2xl text-[15px] leading-relaxed text-ink/60"
        >
          {occ.blurb}
        </motion.p>
      </section>

      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pb-20">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink/40 mb-8" data-testid="occasion-count">
          {products.length} {products.length === 1 ? "piece" : "pieces"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 border border-sand bg-white p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          data-testid="occasion-enquiry-panel"
        >
          <div>
            <h2 className="font-display text-3xl text-ink">Not sure where to start?</h2>
            <p className="mt-2 text-[14px] text-ink/55 max-w-lg">
              Tell us the person and the moment — we'll shortlist pieces and
              share current pricing and availability.
            </p>
          </div>
          <WhatsAppButton
            context="general"
            label="Enquire on WhatsApp"
            variant="solid"
            className="shrink-0"
            testid={`gifts-${key}-whatsapp-btn`}
          />
        </motion.div>

        <div className="mt-20">
          <h2 className="font-display text-3xl text-ink mb-8">Shopping for another occasion?</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {others.map((o, i) => (
              <motion.div
                key={o.key}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.07 }}
              >
                <Link to={o.page} className="group block" data-testid={`occasion-crosslink-${o.key}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-white border border-sand">
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
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to="/corporate-gifting" className="group block" data-testid="occasion-crosslink-corporate">
                <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-display italic text-2xl text-cream/80 px-6 text-center">
                      Gifting at scale →
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-ink/70 group-hover:text-terra transition-colors duration-300">
                  Corporate Gifting
                </p>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}