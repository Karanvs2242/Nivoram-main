import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, PenLine } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useSEO } from "@/lib/seo";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { JOURNAL } from "@/data/catalog";
import FramedImage from "@/components/FramedImage";

export default function Journal() {
  useSEO({
    title: "Journal & Inspiration",
    description:
      "Gifting guides, styling notes and care tips from the Nivoram studio.",
    path: "/journal",
  });

  return (
    <div data-testid="journal-page">
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-10">
        <SectionHeading
          eyebrow="Journal"
          title="Inspiration & Guides."
          intro="Gifting guides, styling notes and care tips — written the way we think about pieces."
        />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 border border-sand bg-white p-5 flex items-start gap-3"
          data-testid="journal-draft-notice"
        >
          <PenLine size={16} className="text-royal shrink-0 mt-0.5" />
          <p className="text-[13px] leading-relaxed text-ink/60">
            <strong className="text-ink/80 font-medium">Editorial drafts.</strong> These
            pieces are being refined with the Nivoram team and will publish once
            verified. Nothing here makes product or policy claims.
          </p>
        </motion.div>
      </section>

      <section className="bg-warmwhite border-y border-sand py-14">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12">
            {JOURNAL.map((a, i) => (
              <motion.article
                key={a.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
                className="group"
                data-testid={`journal-card-${a.slug}`}
              >
                <Link to={`/journal/${a.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-white border border-sand">
                    <FramedImage
                      src={a.image}
                      alt={a.title}
                      className="h-full w-full"
                      imgClassName="transition-transform duration-700 group-hover:scale-[1.045]"
                    />
                    <span className="absolute top-3 left-3 bg-ink text-cream text-[9px] uppercase tracking-[0.2em] px-2.5 py-1.5">
                      Draft
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4 pt-4">
                    <div>
                      <h2 className="font-display text-2xl sm:text-[28px] text-ink leading-snug group-hover:text-terra transition-colors duration-300">
                        {a.title}
                      </h2>
                      <p className="mt-2 text-[14px] leading-relaxed text-ink/55 max-w-lg">{a.excerpt}</p>
                      <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-ink/40">
                        {a.readingTime}
                      </p>
                    </div>
                    <span className="mt-1 shrink-0 inline-flex h-9 w-9 items-center justify-center border border-sand text-ink/60 group-hover:bg-ink group-hover:text-cream group-hover:border-ink transition-all duration-300">
                      <ArrowUpRight size={15} strokeWidth={1.8} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}