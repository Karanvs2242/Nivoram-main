import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CollectionCard from "@/components/CollectionCard";
import ProductCard from "@/components/ProductCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useSEO } from "@/lib/seo";
import { EASE, viewportOnce, fadeUp } from "@/lib/motion";
import { PRODUCTS, GIFT_OCCASIONS, OCCASION_LABELS, getCollection } from "@/data/catalog";

const STEPS = [
  {
    key: "occasion",
    title: "What's the occasion?",
    options: [
      { key: "weddings", label: "Wedding or Anniversary", desc: "A blessing for the newly united" },
      { key: "housewarming", label: "Housewarming", desc: "Something with a place ready for it" },
      { key: "festive", label: "A Festive Celebration", desc: "Diwali and the season of gifts" },
      { key: "return", label: "Return Gifts & Favours", desc: "Thank-you pieces for guests" },
      { key: "corporate", label: "Corporate Gifting", desc: "Teams, clients and events" },
      { key: "personal", label: "No Occasion at All", desc: "Just a beautiful surprise" },
    ],
  },
  {
    key: "recipient",
    title: "Who is it for?",
    options: [
      { key: "couple", label: "A Couple", desc: "Partnership, blessing and togetherness" },
      { key: "elders", label: "Parents & Elders", desc: "Devotion, tradition and reverence" },
      { key: "friend", label: "A Friend", desc: "Personal, warm and considered" },
      { key: "colleague", label: "Clients & Colleagues", desc: "Professional, tasteful, memorable" },
      { key: "host", label: "Hosts & Hostesses", desc: "Pieces that earn their table" },
    ],
  },
  {
    key: "budget",
    title: "What feels right?",
    options: [
      { key: "mindful", label: "Mindful", desc: "Smaller keepsakes and favours" },
      { key: "premium", label: "Premium", desc: "Statement idols and centrepieces" },
      { key: "open", label: "No Budget in Mind", desc: "Show me beautiful things" },
    ],
  },
];

const RECIPIENT_WEIGHTS = {
  couple: { "sacred-elegance": 2, "thoughtful-gifting": 2 },
  elders: { "divine-grace": 3, "sacred-elegance": 1 },
  friend: { "thoughtful-gifting": 2, "statement-decor": 1, "auspicious-living": 1 },
  colleague: { "thoughtful-gifting": 1, "statement-decor": 1 },
  host: { "thoughtful-gifting": 2, "auspicious-living": 1 },
};

function recommend({ occasion, recipient, budget }) {
  const scored = PRODUCTS.map((p) => {
    let s = 0;
    if (occasion === "personal") {
      if (p.collections.includes("thoughtful-gifting")) s += 2;
    } else if (p.occasions.includes(occasion)) {
      s += 3;
    }
    const weights = RECIPIENT_WEIGHTS[recipient] || {};
    p.collections.forEach((c) => { s += weights[c] || 0; });
    if (budget === "mindful" && p.bulkEligible) s += 2;
    if (budget === "premium" && !p.bulkEligible) s += 2;
    if (p.featured) s += 0.5;
    return { product: p, score: s };
  }).sort((a, b) => b.score - a.score);

  const collectionScores = {};
  scored.forEach(({ product, score }) => {
    product.collections.forEach((c, i) => {
      collectionScores[c] = (collectionScores[c] || 0) + score * (i === 0 ? 1 : 0.6);
    });
  });
  const topCollections = Object.entries(collectionScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([slug]) => getCollection(slug))
    .filter(Boolean);

  // diverse picks: alternate across collections, keep first four
  const picks = [];
  const pool = scored.slice(0, 10);
  const seen = new Set();
  for (let round = 0; round < 4; round++) {
    for (const { product } of pool) {
      if (picks.length >= 4) break;
      if (seen.has(product.id)) continue;
      if (round > 0 && product.collections[0] === picks[picks.length - 1]?.collections[0] && pool.length > 4) continue;
      picks.push(product);
      seen.add(product.id);
      break;
    }
  }
  return { collections: topCollections, products: picks };
}

export default function GiftFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const reduce = useReducedMotion();
  const done = step >= STEPS.length;

  useSEO({
    title: "Gift Finder",
    description:
      "Three gentle questions — occasion, recipient and budget — and Nivoram recommends collections and pieces for your moment.",
    path: "/gift-finder",
  });

  const result = useMemo(
    () => (done ? recommend(answers) : null),
    [done, answers]
  );

  const pick = (stepKey, optionKey) => {
    setAnswers((a) => ({ ...a, [stepKey]: optionKey }));
    if (!reduce) {
      setTimeout(() => setStep((s) => s + 1), 220);
    } else {
      setStep((s) => s + 1);
    }
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  const occasionLabel =
    answers.occasion === "personal"
      ? "a Beautiful Surprise"
      : OCCASION_LABELS[answers.occasion] ||
        GIFT_OCCASIONS.find((o) => o.key === answers.occasion)?.label ||
        "Your Moment";

  const waCustom = result
    ? `Hi Nivoram, I used your Gift Finder — I'm looking for ${occasionLabel.toLowerCase()} gift ideas${
        answers.budget === "mindful" ? " (smaller keepsakes)" : answers.budget === "premium" ? " (statement pieces)" : ""
      }. Please suggest some pieces.`
    : undefined;

  const current = STEPS[step];

  return (
    <div className="min-h-[70vh]" data-testid="gift-finder-page">
      <section className="max-w-[900px] mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-24">
        <div className="flex items-center justify-between mb-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-royal flex items-center gap-2">
            <Sparkles size={13} /> Gift Finder
          </p>
          <p className="text-[11px] uppercase tracking-[0.22em] text-ink/40" data-testid="gf-progress">
            {done ? "Complete" : `0${step + 1} / 03`}
          </p>
        </div>
        <div className="h-px bg-sand relative overflow-hidden mb-12" aria-hidden="true">
          <motion.div
            className="absolute inset-y-0 left-0 bg-flame"
            initial={false}
            animate={{ width: `${(Math.min(step, 3) / 3) * 100}%` }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </div>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
            >
              <h1 className="font-display text-4xl sm:text-6xl tracking-tight text-ink mb-10" data-testid="gf-question">
                {current.title}
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {current.options.map((o) => (
                  <button
                    key={o.key}
                    type="button"
                    onClick={() => pick(current.key, o.key)}
                    data-testid={`gf-option-${o.key}`}
                    className={`text-left border p-6 transition-all duration-300 group ${
                      answers[current.key] === o.key
                        ? "border-ink bg-ink text-cream"
                        : "border-sand bg-white text-ink hover:border-ink/40 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-20px_rgba(48,43,50,0.35)]"
                    }`}
                  >
                    <span className={`block font-display text-2xl ${answers[current.key] === o.key ? "text-cream" : "text-ink"}`}>
                      {o.label}
                    </span>
                    <span className={`block mt-1.5 text-[13px] ${answers[current.key] === o.key ? "text-cream/60" : "text-ink/50"}`}>
                      {o.desc}
                    </span>
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink/50 hover:text-ink"
                  data-testid="gf-back"
                >
                  <ArrowLeft size={13} /> Back
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
              data-testid="gf-result"
            >
              <SectionHeading
                eyebrow="Your Matches"
                title={`Gifts for ${occasionLabel}`}
                intro="Based on your answers — a starting point from the collection. Every piece is enquired individually, so consider this a curated shortlist rather than a checkout."
                className="mb-12"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
                {result.collections.map((c, i) => (
                  <CollectionCard key={c.slug} collection={{ ...c, count: undefined }} index={i} />
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {result.products.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>

              <div className="border border-sand bg-white p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h2 className="font-display text-2xl text-ink">Share your shortlist</h2>
                  <p className="mt-2 text-[14px] text-ink/55 max-w-md">
                    We'll respond with current availability, pricing and details for the pieces you like.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <WhatsAppButton
                    custom={waCustom}
                    label="Ask on WhatsApp"
                    variant="solid"
                    testid="gf-whatsapp-btn"
                  />
                  <Link
                    to="/shop"
                    data-testid="gf-browse-all"
                    className="inline-flex items-center border border-ink/30 text-ink text-[11px] uppercase tracking-[0.2em] px-6 h-12 hover:border-ink hover:bg-ink hover:text-cream transition-colors duration-300"
                  >
                    Browse Everything
                  </Link>
                </div>
              </div>

              <button
                type="button"
                onClick={restart}
                data-testid="gf-restart"
                className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink/50 hover:text-ink link-underline"
              >
                <RotateCcw size={13} /> Start the quiz again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}