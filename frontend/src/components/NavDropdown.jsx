import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EASE } from "@/lib/motion";

/**
 * Desktop dropdown: opens on hover (pointer-fine devices), toggles on
 * click/Enter (keyboard + touch), closes on Escape and outside click.
 */
export default function NavDropdown({ label, items, active = false, testid }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const canHover = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => canHover.current && setOpen(true)}
      onMouseLeave={() => canHover.current && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        data-testid={testid}
        data-active={active}
        className={`nav-link flex items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] transition-colors duration-300 ${
          active ? "text-ink" : "text-ink/75 hover:text-ink"
        }`}
      >
        {label}
        <ChevronDown
          size={13}
          strokeWidth={1.8}
          aria-hidden="true"
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-10"
            data-testid={`${testid}-panel`}
          >
            <div className="bg-cream border border-sand shadow-[0_24px_60px_-30px_rgba(48,43,50,0.35)] p-2 w-[290px]">
              {items.map((it) => (
                <Link
                  key={it.to}
                  to={it.to}
                  onClick={() => setOpen(false)}
                  data-testid={`${testid}-item-${it.to.replace(/\//g, "-").replace(/^-/, "")}`}
                  className="block px-4 py-3 hover:bg-white group transition-colors duration-200"
                >
                  <span className="block text-[13px] text-ink group-hover:text-terra transition-colors duration-300">
                    {it.label}
                  </span>
                  {it.desc && (
                    <span className="block text-[11px] text-ink/45 mt-0.5 leading-snug">
                      {it.desc}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}