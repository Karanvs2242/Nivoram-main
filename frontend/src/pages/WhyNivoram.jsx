import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { ParallaxImage, Reveal } from "@/components/Reveal";
import { useSEO } from "@/lib/seo";
import { EASE, viewportOnce, fadeUp } from "@/lib/motion";
import { IMAGES } from "@/data/catalog";

const VALUES = [
  ["01", "Meaning first", "A piece must be worth keeping before it is worth selling. If it wouldn't stay on display, it doesn't enter the collection."],
  ["02", "Restraint is elegance", "No loud finishes, no ornament for ornament's sake. Silver plating, warm neutrals, and detail that rewards a second look."],
  ["03", "Accessible premium", "Good design shouldn't need a special-occasion budget. Our pricing keeps genuinely premium-feeling gifts within reach."],
  ["04", "Honesty over hype", "We publish only verified details — no invented purity claims, fake reviews or promised timelines. If something is unconfirmed, it says so."],
];

export default function WhyNivoram() {
  useSEO({
    title: "Why Nivoram",
    description:
      "What guides every Nivoram choice — gifting-led curation, contemporary Indian design, accessible premium and honest product information.",
    path: "/why-nivoram",
    image: IMAGES.craftElephants,
  });

  return (
    <div data-testid="why-nivoram-page">
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="text-[11px] uppercase tracking-[0.3em] text-terra mb-6"
        >
          About Us
        </motion.p>
        <h1 className="font-display text-[14vw] sm:text-7xl lg:text-[92px] leading-[0.98] tracking-tight text-ink">
          {["Why Nivoram."].map((line, i) => (
            <span key={i} className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.13 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
          className="mt-8 max-w-2xl text-[16px] leading-relaxed text-ink/60"
        >
          Because a gift says what a message can't — and the object you keep
          should be worthy of the person who gave it.
        </motion.p>
      </section>

      <section className="bg-white border-y border-sand py-20 sm:py-28">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <SectionHeading eyebrow="What Guides Every Choice" title="Four Things We Hold To." className="mb-14" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
            {VALUES.map(([n, t, d], i) => (
              <motion.div
                key={n}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="border-t-2 border-terra/50 pt-6"
                data-testid={`why-value-${n}`}
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-terra/80 mb-3">{n}</p>
                <h3 className="font-display text-2xl text-ink">{t}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink/55 max-w-md">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <SectionHeading
            eyebrow="The Gifting Approach"
            title="Chosen Like a Gift, Not a Product."
            intro="Every piece in the catalogue passes a simple test: would we hand this to someone who matters to us? If the answer is no, it doesn't matter how well it photographs."
          />
          <Reveal className="mt-6">
            <p className="text-[15px] leading-relaxed text-ink/60 max-w-xl">
              That's why the collection is deliberately small and why our
              product pages say "on request" more often than they say numbers —
              we'd rather confirm a detail than decorate a listing with one we
              can't verify.
            </p>
          </Reveal>
          <Reveal className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/shop"
              data-testid="why-explore-catalogue"
              className="btn-sweep btn-sweep-dark inline-flex items-center gap-3 border border-ink bg-ink text-cream text-[11px] uppercase tracking-[0.2em] px-8 h-12"
            >
              <span>Explore the Catalogue</span>
            </Link>
            <Link
              to="/craftsmanship"
              data-testid="why-craftsmanship-link"
              className="inline-flex items-center border border-ink/30 text-ink text-[11px] uppercase tracking-[0.2em] px-8 h-12 hover:border-ink hover:bg-ink hover:text-cream transition-colors duration-300"
            >
              Our Craftsmanship
            </Link>
          </Reveal>
        </div>
        <ParallaxImage
          src={IMAGES.craftElephants}
          alt="Silver-plated elephant pair with embossed detailing"
          className="relative aspect-[4/5] bg-white border border-sand"
          strength={50}
        />
      </section>
    </div>
  );
}