import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import EnquiryForm from "@/components/EnquiryForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useSEO } from "@/lib/seo";
import { EASE, viewportOnce, fadeUp } from "@/lib/motion";

export default function CustomOrders() {
  useSEO({
    title: "Custom Orders",
    description:
      "Tell Nivoram what you have in mind — quantities, pairings and budgets. Customisation is confirmed honestly, piece by piece.",
    path: "/contact/custom-orders",
  });

  return (
    <div data-testid="custom-orders-page">
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-14">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="text-[11px] uppercase tracking-[0.3em] text-terra mb-6"
        >
          Contact — Custom Orders
        </motion.p>
        <h1 className="font-display text-[13vw] sm:text-6xl lg:text-[84px] leading-[0.98] tracking-tight text-ink">
          {["Tell Us What", "You Have in Mind."].map((line, i) => (
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
          className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink/60"
        >
          Some gifts need a specific quantity, a particular pairing, or a
          budget to work within. Share the moment you're planning and we'll
          confirm — honestly — what's possible.
        </motion.p>
      </section>

      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            ["Curated selections", "A shortlist of pieces assembled around your budget and the person you're gifting."],
            ["Coordinated quantities", "Multiple pieces pulled together for weddings, festivals and return gifting — enquire with your count."],
            ["Customisation, confirmed piece by piece", "Customisation varies from product to product and isn't available across the catalogue. We'll confirm exactly what's possible for the pieces you like."],
          ].map(([t, d], i) => (
            <motion.div
              key={t}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-white border border-sand p-7"
              data-testid={`custom-order-card-${i}`}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center border border-sand text-terra mb-5">
                <Check size={17} strokeWidth={1.8} />
              </span>
              <h2 className="font-display text-xl text-ink">{t}</h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink/55">{d}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 border border-sand bg-white p-5 flex gap-3"
          data-testid="custom-orders-honesty-note"
        >
          <Info size={16} className="text-royal shrink-0 mt-0.5" />
          <p className="text-[13px] leading-relaxed text-ink/60">
            <strong className="text-ink/80 font-medium">Straight talk.</strong>{" "}
            We don't promise engraving, personalised packaging or bespoke
            manufacturing as standard — those options vary by piece and are
            confirmed during your enquiry, never assumed.
          </p>
        </motion.div>
      </section>

      <section className="bg-white border-t border-sand py-20 sm:py-24">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Custom Order Enquiry"
            title="Start the Conversation."
            intro="Tell us the occasion, the person and any specifics — we'll respond with what's possible and current pricing."
            className="mb-12"
          />
          <EnquiryForm variant="general" testidPrefix="custom" />
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t border-sand pt-8">
            <p className="text-[13px] text-ink/55">Prefer to talk it through?</p>
            <WhatsAppButton context="general" label="Message on WhatsApp" variant="outline" compact testid="custom-orders-whatsapp-btn" />
          </div>
        </div>
      </section>
    </div>
  );
}