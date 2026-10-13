import { Link } from "react-router-dom";

/** Official supplied Nivoram logo (public/logo.png, transparent background)
 *  — used as-is, never recoloured or distorted. Reads directly on the
 *  cream header and the charcoal footer. */
export default function Logo({ dark = false, compact = false }) {
  return (
    <Link
      to="/"
      data-testid="logo-link"
      className="flex items-center group"
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