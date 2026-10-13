import { Link } from "react-router-dom";

/** Official supplied Nivoram logo (public/logo.png) — used as-is,
 *  never recoloured or distorted. The dark variant sits on a cream chip
 *  so the white logo background reads cleanly on the charcoal footer. */
export default function Logo({ dark = false, compact = false }) {
  return (
    <Link
      to="/"
      data-testid="logo-link"
      className={`flex items-center group ${dark ? "bg-cream px-3.5 py-2.5" : ""}`}
      aria-label="Nivoram — Inspired Decor, Thoughtful Gifting"
    >
      <img
        src={`${process.env.PUBLIC_URL}/logo.png`}
        alt="Nivoram — Inspired Decor | Thoughtful Gifting"
        className={`w-auto transition-opacity duration-300 group-hover:opacity-80 ${
          compact ? "h-7 sm:h-8" : dark ? "h-11" : "h-8 sm:h-10"
        }`}
        fetchPriority="high"
      />
    </Link>
  );
}

/** The mandala motif from the logo centre — used as a small decorative mark. */
export const MandalaMark = ({ size = 40, className = "" }) => (
  <img
    src={`${process.env.PUBLIC_URL}/mandala.png`}
    alt=""
    aria-hidden="true"
    width={size}
    height={size}
    className={`inline-block ${className}`}
  />
);