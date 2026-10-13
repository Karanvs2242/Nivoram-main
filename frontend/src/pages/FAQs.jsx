import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useSEO } from "@/lib/seo";
import { EASE, viewportOnce, fadeUp } from "@/lib/motion";
import { FAQS } from "@/data/catalog";

function Faq({ q, a, i }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sand" data-testid={`faq-item-${i}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-testid={`faq-trigger-${i}`}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
      >
        <span className="font-display text-xl text-ink group-hover:text-terra transition-colors duration-300">{q}</span>
        <span className="shrink-0 text-ink/50">
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 text-[14px] leading-relaxed text-ink/60">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQs() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  useSEO({
    title: "FAQs",
    description:
      "Honest answers about enquiring, silver-tone finishes, bulk gifting and how Nivoram product information works.",
    path: "/faqs",
    jsonLd,
  });

  return (
    <div data-testid="faqs-page">
      <section className="max-w-[900px] mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-8">
        <SectionHeading
          eyebrow="Contact — FAQs"
          title="Honest Answers."
          intro="No fine print and no promises we can't keep — if something depends on your requirement, we say so."
        />
      </section>

      <section className="max-w-[900px] mx-auto px-5 sm:px-8 pb-24">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="border-t border-sand" data-testid="faqs-list">
          {FAQS.map(([q, a], i) => (
            <Faq key={i} q={q} a={a} i={i} />
          ))}
        </motion.div>
        <p className="mt-8 text-[13px] text-ink/45">
          Still unsure? The general enquiry form or any WhatsApp button across
          the site reaches the team directly.
        </p>
      </section>
    </div>
  );
}