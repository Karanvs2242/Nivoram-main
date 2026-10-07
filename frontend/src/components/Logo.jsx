import { Link } from "react-router-dom";
import { SITE_CONFIG } from "@/config/site";

export const LogoMark = ({ size = 34, dark = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
    className="shrink-0"
  >
    <path d="M32 8 L54 32 L32 56 L10 32 Z" stroke={dark ? "#E5DCD0" : "#302B32"} strokeWidth="1.5" />
    <path d="M23 44 V20 L41 44 V20" stroke={dark ? "#F8F3EB" : "#302B32"} strokeWidth="3" strokeLinecap="square" />
  </svg>
);

export default function Logo({ dark = false, compact = false }) {
  return (
    <Link
      to="/"
      data-testid="logo-link"
      className="flex items-center gap-3 group"
      aria-label="Nivoram — home"
    >
      <LogoMark dark={dark} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-semibold text-[19px] sm:text-[21px] tracking-[0.34em] uppercase ${
            dark ? "text-cream" : "text-ink"
          }`}
          style={{ marginRight: "-0.34em" }}
        >
          {SITE_CONFIG.brand}
        </span>
        {!compact && (
          <span
            className={`mt-1 text-[8px] tracking-[0.3em] uppercase font-sans ${
              dark ? "text-cream/50" : "text-ink/50"
            }`}
            style={{ marginRight: "-0.3em" }}
          >
            Elegance That Lasts
          </span>
        )}
      </span>
    </Link>
  );
}