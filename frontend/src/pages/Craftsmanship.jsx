import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { ParallaxImage, Reveal } from "@/components/Reveal";
import { useSEO } from "@/lib/seo";
import { EASE, viewportOnce, fadeUp } from "@/lib/motion";
import { IMAGES } from "@/data/catalog";

export default function Craftsmanship() {
  useSEO({
    title: "Craftsmanship",
    description:
      "Nivoram's approach to 999 silver-plated and gold & silver-coated finishes, design detail and care — described honestly.",
    path: "/craftsmanship",
    image: IMAGES.finish,
  });

  return (
    <div data-testid="craftsmanship-page">
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="text-[11px] uppercase tracking-[0.3em] text-royal mb-6"
        >
          About Us
        </motion.p>
        <h1 className="font-display text-[13vw] sm:text-7xl lg:text-[92px] leading-[0.98] tracking-tight text-ink">
          {["Craftsmanship,", "Considered."].map((line, i) => (
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
          transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
          className="mt-8 max-w-2xl text-[16px] leading-relaxed text-ink/60"
        >
          Our approach to finish, form and detail — and how to live with
          silver-plated pieces once they're yours.
        </motion.p>
      </section>

      {/* The finish */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pb-20 sm:pb-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <ParallaxImage
          src={IMAGES.finish}
          alt="Silver-plated peacock-rimmed bowl with fine detailing"
          className="relative aspect-[4/5] bg-white border border-sand order-2 lg:order-1"
          strength={50}
        />
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="The Finish"
            title="999 Silver-Plated, Honestly Described."
            intro="Nivoram specialises in 999 silver-plated and gold & silver-coated décor — a finish we choose deliberately. It carries the auspicious feel Indian traditions associate with silver, suits contemporary interiors, and keeps genuinely premium-feeling pieces within reach."
          />
          <Reveal className="mt-6">
            <p className="text-[15px] leading-relaxed text-ink/60 max-w-xl">
              We never describe a plated piece as solid silver, and we don't
              publish purity claims beyond what's verified. Each piece's exact
              material and coating are confirmed during your enquiry — and one
              message gets you the answer.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The details */}
      <section className="bg-warmwhite border-y border-sand py-20 sm:py-28">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <SectionHeading eyebrow="The Details" title="What We Look For." className="mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              ["Embossing & relief", "Detail that rewards a second look — raised motifs and fine carving-style work on idols, boxes and accents."],
              ["Weight & balance", "Pieces should feel settled in the hand and steady on a surface. Forms are chosen to sit quietly, not to wobble through a festival dinner."],
              ["Gift-ready presentation", "Pieces are shortlisted with gifting in mind, so they present well the moment they're handed over."],
            ].map(([t, d], i) => (
              <motion.div
                key={t}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="border-t-2 border-terra/50 pt-6"
              >
                <h3 className="font-display text-2xl text-ink">{t}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink/55">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Care */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Living With It"
              title="Caring for Silver-Plated Décor."
              intro="Plated and coated décor asks for very little: a soft, dry cloth after dusting; no abrasive scrubs, harsh chemicals or long soaks; and a spot away from direct humidity where possible. For detailed pieces, a soft brush reaches what cloth cannot."
            />
            <Reveal className="mt-6">
              <p className="text-[15px] leading-relaxed text-ink/60 max-w-xl">
                Product-specific care instructions are published on each
                product page as they're verified by the studio.
              </p>
            </Reveal>
            <Reveal className="mt-8">
              <Link
                to="/journal/caring-for-silver-plated-decor"
                data-testid="craftsmanship-care-journal"
                className="nav-link inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink/70 hover:text-ink pb-1"
              >
                Read the care journal piece →
              </Link>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal className="border border-sand bg-white p-6 flex gap-3" data-testid="craftsmanship-honesty-note">
              <Info size={16} className="text-royal shrink-0 mt-0.5" />
              <p className="text-[13px] leading-relaxed text-ink/60">
                <strong className="text-ink/80 font-medium">A note on provenance.</strong>{" "}
                Detailed process, artisan and origin documentation is being
                prepared with the studio and will be added here as it's
                verified. We'd rather show you less than tell you more than we
                know.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 border-t border-sand">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 text-center">
          <SectionHeading
            align="center"
            title="See the Finish for Yourself."
            titleClassName="mx-auto"
          />
          <Reveal className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              data-testid="craftsmanship-shop-cta"
              className="btn-sweep btn-sweep-dark inline-flex items-center border border-ink bg-ink text-cream text-[11px] uppercase tracking-[0.2em] px-8 h-12"
            >
              <span>Explore the Catalogue</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}