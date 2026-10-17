import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { searchProducts } from "@/lib/search";
import { EASE } from "@/lib/motion";

/**
 * HeaderSearch — live product search for the site header.
 * variant="panel"  → magnifier trigger + anchored dropdown (desktop header)
 * variant="inline" → bare input + results list (mobile drawer)
 */
export default function HeaderSearch({ variant = "panel" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const wrapRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 160);
    return () => clearTimeout(t);
  }, [query]);

  // close + clear whenever the visitor moves to another page
  useEffect(() => {
    setOpen(false);
    setQuery("");
    setDebounced("");
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const results = useMemo(() => searchProducts(debounced), [debounced]);
  const trimmed = debounced.trim();

  const onEnter = (e) => {
    if (e.key === "Enter" && results.length > 0) {
      navigate(`/products/${results[0].slug}`);
    }
  };

  const inputRow = (testid, autoFocus = false, placeholder = "Search pieces, SKUs…") => (
    <div className={`flex items-center gap-3 ${variant === "panel" ? "border-b border-sand px-5 h-[56px]" : "border border-sand bg-white px-4 h-11"}`}>
      <Search size={16} className="text-ink/40 shrink-0" />
      <input
        autoFocus={autoFocus}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onEnter}
        placeholder={placeholder}
        data-testid={testid}
        className="flex-1 bg-transparent outline-none text-[14px] text-ink placeholder:text-ink/40"
      />
      {query && (
        <button type="button" onClick={() => setQuery("")} aria-label="Clear search" data-testid="header-search-clear" className="text-ink/40 hover:text-ink transition-colors">
          <X size={15} />
        </button>
      )}
    </div>
  );

  const body = (
    <>
      {trimmed === "" ? (
        <p className="px-5 py-6 text-[13px] text-ink/50" data-testid="search-empty">
          Search by piece name, SKU or collection — try “Ganesha”.
        </p>
      ) : results.length === 0 ? (
        <div className="px-5 py-6" data-testid="search-no-results">
          <p className="text-[13px] text-ink/60">No pieces found for “{trimmed}”.</p>
          <Link to="/shop" className="link-underline inline-flex items-center gap-2 mt-3 text-[11px] uppercase tracking-[0.18em] text-terra">
            Browse the full catalogue <ArrowRight size={12} />
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-sand">
          {results.map((p) => (
            <li key={p.id}>
              <Link
                to={`/products/${p.slug}`}
                data-testid={`search-result-${p.slug}`}
                className="flex items-center gap-4 px-5 py-3 hover:bg-warmwhite transition-colors"
              >
                <img src={p.image} alt="" loading="lazy" className="h-12 w-12 object-cover border border-sand shrink-0" />
                <span className="flex-1 min-w-0">
                  <span className="block text-[14px] text-ink leading-snug">{p.name}</span>
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-ink/45 mt-0.5">{p.sku}</span>
                </span>
                <ArrowRight size={14} className="text-ink/40 shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );

  if (variant === "inline") {
    return (
      <div className="pt-1 pb-3 border-b border-sand" data-testid="drawer-search">
        {inputRow("drawer-search-input", false, "Search pieces…")}
        {trimmed !== "" && (
          <div className="mt-3 border border-sand bg-white">{body}</div>
        )}
      </div>
    );
  }

  return (
    <div className="relative hidden md:block" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Search pieces"
        aria-expanded={open}
        data-testid="header-search-open"
        className="inline-flex h-10 w-10 items-center justify-center border border-sand text-ink hover:bg-ink hover:text-cream transition-colors duration-300"
      >
        <Search size={17} strokeWidth={1.8} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute right-0 top-[calc(100%+12px)] w-[min(92vw,400px)] bg-white border border-sand shadow-[0_30px_60px_-30px_rgba(48,43,50,0.35)] z-20"
            data-testid="header-search-panel"
            onKeyDown={onEnter}
          >
            {inputRow("header-search-input", true)}
            <div className="max-h-[60vh] overflow-y-auto">{body}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
