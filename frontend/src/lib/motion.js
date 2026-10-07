export const EASE = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const staggerSlow = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

export const clipReveal = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  show: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 1.0, ease: EASE },
  },
};

export const lineMask = {
  hidden: { y: "110%" },
  show: (i = 0) => ({
    y: "0%",
    transition: { duration: 0.9, ease: EASE, delay: 0.25 + i * 0.13 },
  }),
};

export const viewportOnce = { once: true, amount: 0.15 };