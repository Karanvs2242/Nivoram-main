import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 26,
  once = true,
  as = "div",
  ...rest
}) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration: 0.75, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function ParallaxImage({ src, alt, className = "", imgClassName = "", strength = 40, children }) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const small =
    typeof window !== "undefined" &&
    !window.matchMedia("(min-width: 1024px)").matches;

  if (reduced || small) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <img src={src} alt={alt} loading="lazy" className={`w-full h-full object-cover ${imgClassName}`} />
        {children}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <ParallaxInner src={src} alt={alt} strength={strength} imgClassName={imgClassName} />
      {children}
    </div>
  );
}

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

function ParallaxInner({ src, alt, strength, imgClassName }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  return (
    <div ref={ref} className="absolute inset-0 scale-[1.18]">
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y }}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  );
}