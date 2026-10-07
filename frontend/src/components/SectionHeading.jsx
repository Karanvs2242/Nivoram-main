import { motion } from "framer-motion";
import { EASE, viewportOnce, fadeUp, stagger } from "@/lib/motion";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  dark = false,
  className = "",
  titleClassName = "",
  children,
}) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col ${alignCls} ${className}`}>
      {eyebrow && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className={`text-[11px] uppercase tracking-[0.28em] mb-5 ${
            dark ? "text-cream/50" : "text-terra"
          }`}
        >
          {eyebrow}
        </motion.p>
      )}
      <div className="overflow-hidden">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className={`font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight ${
            dark ? "text-cream" : "text-ink"
          } ${titleClassName}`}
        >
          {title}
        </motion.h2>
      </div>
      {intro && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className={`mt-5 max-w-xl text-[15px] leading-relaxed ${
            dark ? "text-cream/60" : "text-ink/60"
          }`}
        >
          {intro}
        </motion.p>
      )}
      {children}
    </div>
  );
}

export { fadeUp, stagger };