import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import CollectionCard from "@/components/CollectionCard";
import { useSEO } from "@/lib/seo";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";
import { COLLECTIONS, productsInCollection } from "@/data/catalog";

export default function Collections() {
  useSEO({
    title: "Collections",
    description:
      "Explore Nivoram collections — spiritual & pooja décor, statement home décor, auspicious living, thoughtful gifting and more.",
    path: "/collections",
  });

  return (
    <div data-testid="collections-page">
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-16 pb-10 sm:pt-20">
        <SectionHeading
          eyebrow="Collections"
          title="Explore the Nivoram Edit"
          intro="Seven edits, one point of view — silver-tone pieces for Indian homes, rituals and the people we gift them to. Products may appear in more than one collection where they belong."
        />
      </section>

      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-12">
          {COLLECTIONS.map((c, i) => {
            const pattern = [
              { span: "lg:col-span-7", aspect: "aspect-[16/11]" },
              { span: "lg:col-span-5", aspect: "aspect-[16/11]" },
              { span: "lg:col-span-4", aspect: "aspect-[4/3]" },
              { span: "lg:col-span-4", aspect: "aspect-[4/3]" },
              { span: "lg:col-span-4", aspect: "aspect-[4/3]" },
              { span: "lg:col-span-6", aspect: "aspect-[16/9]" },
              { span: "lg:col-span-6", aspect: "aspect-[16/9]" },
            ][i];
            return (
              <CollectionCard
                key={c.slug}
                index={i}
                collection={{ ...c, count: productsInCollection(c.slug).length }}
                className={pattern.span}
                aspect={pattern.aspect}
              />
            );
          })}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-20 border border-sand bg-white p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          data-testid="collections-enquiry-panel"
        >
          <div>
            <h2 className="font-display text-3xl text-ink">Looking for something specific?</h2>
            <p className="mt-2 text-[14px] text-ink/55 max-w-lg">
              Tell us the occasion, the person and the budget you have in mind —
              we'll shortlist pieces for you.
            </p>
          </div>
          <Link
            to="/contact"
            data-testid="collections-contact-link"
            className="shrink-0 inline-flex items-center border border-ink bg-ink text-cream text-[11px] uppercase tracking-[0.2em] px-8 h-12 hover:bg-transparent hover:text-ink transition-colors duration-300"
          >
            Contact Nivoram
          </Link>
        </motion.div>
      </section>
    </div>
  );
}