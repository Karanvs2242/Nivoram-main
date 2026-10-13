import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center" data-testid="not-found-page">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[11px] uppercase tracking-[0.3em] text-royal mb-6"
        >
          404 — Page Not Found
        </motion.p>
        <h1 className="font-display text-[16vw] sm:text-8xl leading-none tracking-tight text-ink overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            Nothing here — yet.
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
          className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/60"
        >
          The page you're looking for has moved or never existed. The
          collections are a good place to start again.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <Link
            to="/"
            data-testid="notfound-home-btn"
            className="btn-sweep btn-sweep-dark inline-flex items-center border border-ink bg-ink text-cream text-[11px] uppercase tracking-[0.2em] px-8 h-12"
          >
            <span>Back to Home</span>
          </Link>
          <Link
            to="/collections"
            data-testid="notfound-collections-btn"
            className="inline-flex items-center border border-ink/30 text-ink text-[11px] uppercase tracking-[0.2em] px-8 h-12 hover:border-ink hover:bg-ink hover:text-cream transition-colors duration-300"
          >
            Explore Collections
          </Link>
        </motion.div>
      </div>
    </div>
  );
}