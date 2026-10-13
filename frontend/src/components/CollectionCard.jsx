import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE, viewportOnce, fadeUp } from "@/lib/motion";

export default function CollectionCard({ collection, className = "", aspect = "aspect-[4/3]", index = 0 }) {
  const count = collection.count;
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ duration: 0.75, ease: EASE, delay: (index % 3) * 0.08 }}
      className={`group ${className}`}
      data-testid={`collection-card-${collection.slug}`}
    >
      <Link to={`/collections/${collection.slug}`} className="block" aria-label={`${collection.name} collection`}>
        <div className={`relative overflow-hidden bg-white border border-sand transition-shadow duration-500 group-hover:shadow-[0_0_0_1px_rgba(234,58,46,0.35),0_20px_44px_-26px_rgba(224,74,54,0.3)] ${aspect}`}>
          <img
            src={collection.image}
            alt={collection.alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />
          <div className="absolute inset-0 border border-ink/0 group-hover:border-cream/40 m-3 pointer-events-none transition-colors duration-500" />
        </div>
        <div className="flex items-start justify-between pt-4 gap-4">
          <div>
            <h3 className="font-display text-2xl text-ink leading-tight group-hover:text-terra transition-colors duration-300">
              {collection.name}
            </h3>
            <p className="mt-1 text-[13px] text-ink/55 leading-relaxed max-w-md">
              {collection.short}
            </p>
            {typeof count === "number" && (
              <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-ink/40">
                {count} {count === 1 ? "piece" : "pieces"}
              </p>
            )}
          </div>
          <span className="mt-1 shrink-0 inline-flex h-9 w-9 items-center justify-center border border-sand text-ink/60 group-hover:bg-ink group-hover:text-cream group-hover:border-ink transition-all duration-300">
            <ArrowUpRight size={15} strokeWidth={1.8} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}