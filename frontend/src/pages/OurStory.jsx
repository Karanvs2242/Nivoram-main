import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { ParallaxImage, Reveal } from "@/components/Reveal";
import { useSEO } from "@/lib/seo";
import { EASE, viewportOnce, fadeUp } from "@/lib/motion";
import { IMAGES, COLLECTIONS, productsInCollection } from "@/data/catalog";

export default function OurStory() {
  useSEO({
    title: "Our Story",
    description:
      "Objects That Make Moments Meaningful — the philosophy behind Nivoram's 999 silver-plated décor and gifting.",
    path: "/our-story",
    image: IMAGES.story,
  });

  return (
    <div data-testid="our-story-page">
      {/* Hero */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="text-[11px] uppercase tracking-[0.3em] text-royal mb-6"
        >
          Our Story
        </motion.p>
        <h1 className="font-display text-[13vw] sm:text-7xl lg:text-[92px] leading-[0.98] tracking-tight text-ink max-w-5xl">
          {["Objects That Make", "Moments Meaningful."].map((line, i) => (
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
          Nivoram brings together thoughtfully selected 999 silver-plated and
          gold &amp; silver-coated décor, divine idols and gifting pieces —
          for every celebration, and for every heart.
        </motion.p>
      </section>

      {/* Inspiration */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pb-20 sm:pb-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <ParallaxImage
          src={IMAGES.story}
          alt="Silver-plated Radha-Krishna pair from the Nivoram catalogue"
          className="relative aspect-[4/5] bg-white border border-sand"
          strength={50}
        />
        <div>
          <SectionHeading
            eyebrow="The Inspiration"
            title="For the Exchange, Not the Transaction."
            intro="Every Nivoram piece starts at the moment of exchange — a wedding, a housewarming, a festival, a thank-you that deserves more than a message. We ask one question of everything we choose: would someone keep this, display it, and think of the giver when they do?"
          />
          <Reveal className="mt-6">
            <p className="text-[15px] leading-relaxed text-ink/60 max-w-xl">
              Silver felt like the natural answer. It carries the auspiciousness
              Indian traditions associate with it, it sits comfortably in
              contemporary homes, and it photographs the way gifts deserve to
              be remembered.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-warmwhite border-y border-sand py-20 sm:py-28">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <SectionHeading eyebrow="What We Believe" title="Three Things Guide Every Choice." className="mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              ["Meaning first", "A piece must be worth keeping before it is worth selling. If it wouldn't stay on display, it doesn't enter the collection."],
              ["Restraint is elegance", "No loud finishes, no ornament for ornament's sake. Silver plating, warm neutrals, and detail that rewards a second look."],
              ["Accessible premium", "Good design shouldn't need a special occasion budget. Our pricing keeps genuinely premium-feeling gifts within reach."],
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
                <p className="text-[11px] uppercase tracking-[0.24em] text-terra/80 mb-3">0{i + 1}</p>
                <h3 className="font-display text-2xl text-ink">{t}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink/55">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections intro */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeading
          eyebrow="The Collections"
          title="Where to Begin."
          intro="Five edits organise the collection — by ritual, by room, and by the occasions that bring people together."
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {COLLECTIONS.slice(0, 3).map((c, i) => (
            <motion.div
              key={c.slug}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: i * 0.08 }}
            >
              <Link to={`/collections/${c.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden bg-white border border-sand">
                  <img src={c.image} alt={c.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.045]" />
                </div>
                <h3 className="mt-4 font-display text-2xl text-ink group-hover:text-terra transition-colors duration-300">{c.name}</h3>
                <p className="text-[12px] text-ink/40 mt-1">{productsInCollection(c.slug).length} pieces</p>
              </Link>
            </motion.div>
          ))}
        </div>
        <Reveal className="mt-14">
          <Link
            to="/collections"
            data-testid="story-explore-collections"
            className="btn-sweep btn-sweep-dark inline-flex items-center gap-3 border border-ink bg-ink text-cream text-[11px] uppercase tracking-[0.2em] px-8 h-12"
          >
            <span>Begin Exploring</span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}