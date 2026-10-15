import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, PenLine } from "lucide-react";
import NotFound from "@/pages/NotFound";
import { useSEO } from "@/lib/seo";
import { EASE, viewportOnce, fadeUp } from "@/lib/motion";
import { getArticle, COLLECTIONS } from "@/data/catalog";
import FramedImage from "@/components/FramedImage";

export default function JournalArticle() {
  const { slug } = useParams();
  const article = getArticle(slug);

  useSEO({
    title: article ? article.title : "Journal",
    description: article?.excerpt,
    path: `/journal/${slug}`,
    image: article?.image,
  });

  if (!article) return <NotFound />;

  return (
    <div data-testid="journal-article-page">
      <article className="max-w-[760px] mx-auto px-5 sm:px-8 pt-14 pb-24">
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink/50 hover:text-ink mb-10"
          data-testid="journal-back-link"
        >
          <ArrowLeft size={13} /> Back to Journal
        </Link>

        <motion.div variants={fadeUp} initial="hidden" animate="show" viewport={viewportOnce}>
          <span className="inline-flex items-center gap-2 bg-ink text-cream text-[9px] uppercase tracking-[0.2em] px-2.5 py-1.5 mb-6">
            <PenLine size={11} /> Draft — unpublished
          </span>
          <h1 className="font-display text-4xl sm:text-6xl leading-[1.02] tracking-tight text-ink">
            {article.title}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/60">{article.excerpt}</p>
          <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-ink/40">
            {article.readingTime}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.3 }}
          className="mt-10 relative aspect-[16/9] bg-white border border-sand overflow-hidden"
        >
          <FramedImage src={article.image} alt={article.title} className="h-full w-full" eager />
        </motion.div>

        <div className="mt-10 space-y-6">
          {article.body.map((para, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="text-[16px] leading-[1.8] text-ink/75"
            >
              {para}
            </motion.p>
          ))}
        </div>

        <div className="mt-16 border-t border-sand pt-8" data-testid="journal-article-related">
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink/40 mb-4">Explore while you're here</p>
          <div className="flex flex-wrap gap-2">
            {COLLECTIONS.slice(0, 4).map((c) => (
              <Link
                key={c.slug}
                to={`/collections/${c.slug}`}
                className="text-[11px] uppercase tracking-[0.16em] border border-sand px-4 py-2.5 text-ink/60 hover:border-ink hover:text-ink transition-colors duration-300"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}