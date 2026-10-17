import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import EnquiryForm from "@/components/EnquiryForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import CollectionCard from "@/components/CollectionCard";
import { useSEO } from "@/lib/seo";
import { EASE, viewportOnce, fadeUp } from "@/lib/motion";
import { IMAGES, getCollection, productsInCollection } from "@/data/catalog";

const USE_CASES = [
  { title: "Employee Recognition", desc: "Milestones, onboarding and long service — gifts people actually display.", image: IMAGES.recognition },
  { title: "Client & Partner Appreciation", desc: "Considered pieces that say thank you without saying marketing.", image: IMAGES.clientGift },
  { title: "Conferences & Events", desc: "Favours and mementos for weddings, summits and festive gatherings.", image: IMAGES.events },
  { title: "Festive Hampers", desc: "Diwali and festive gifting, curated and coordinated at scale.", image: IMAGES.hampers },
];

const STEPS = [
  ["Share your requirement", "Tell us the occasion, quantity, budget and timeline — via the form below or WhatsApp."],
  ["Receive a curated shortlist", "We respond with selected pieces, visuals and a tailored quote for your quantity."],
  ["Confirm your order", "Once you approve the shortlist and quote, we align on packaging and delivery details."],
];

const FAQS = [
  ["Do you have a minimum order quantity?", "Minimums vary by piece and season. Share your approximate quantity in the enquiry form and our team will confirm current requirements for your selection."],
  ["Is logo customisation or engraving available?", "Customisation options differ from piece to piece and are not confirmed for all products. We will confirm exactly what is possible for your chosen selection when you enquire."],
  ["How are delivery timelines handled?", "Delivery timelines are confirmed for each order during quoting, based on quantity and destination. We don't promise blanket delivery dates before confirming your requirement."],
  ["How is bulk pricing calculated?", "Bulk pricing is shared as a tailored quote based on the pieces selected and the quantity. Enquire with your budget range and we'll curate options within it."],
];

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

export default function CorporateGifting() {
  useSEO({
    title: "Corporate & Bulk Gifting",
    description:
      "Considered 999 silver-plated gifting for teams, clients and events. Request a tailored bulk quote from Nivoram.",
    path: "/corporate-gifting",
    image: IMAGES.corporateGift,
  });

  return (
    <div data-testid="corporate-gifting-page">
      {/* Hero */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-14">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="text-[11px] uppercase tracking-[0.3em] text-royal mb-6"
        >
          Corporate &amp; Bulk Gifting
        </motion.p>
        <h1 className="font-display text-[12vw] sm:text-6xl lg:text-[84px] leading-[0.98] tracking-tight text-ink max-w-4xl">
          {["Thoughtful Gifting for", "Meaningful Connections."].map((line, i) => (
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
          For businesses, teams, clients and events — gifting that feels personal
          at any quantity. Share your requirement and we'll curate a shortlist
          with a tailored quote.
        </motion.p>
      </section>

      {/* Use cases */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {USE_CASES.map((u, i) => (
            <motion.div
              key={u.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="group bg-white border border-sand"
              data-testid={`use-case-${i}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={u.image} alt={u.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
              </div>
              <div className="p-5 border-t border-sand">
                <h3 className="font-display text-xl text-ink">{u.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink/55">{u.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pb-20">
        <SectionHeading eyebrow="Gifting Collections" title="Where Bulk Gifting Begins." className="mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {["thoughtful-gifting", "divine-grace", "auspicious-living"].map((slug, i) => (
            <CollectionCard
              key={slug}
              index={i}
              collection={{ ...getCollection(slug), count: productsInCollection(slug).length }}
              image={getCollection(slug).cardImage}
              cover={!!getCollection(slug).cardImage}
            />
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink text-cream py-20 sm:py-24">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <SectionHeading dark eyebrow="How It Works" title="A Simple Enquiry Process." className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {STEPS.map(([t, d], i) => (
              <motion.div
                key={t}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border-t border-cream/20 pt-6"
                data-testid={`process-step-${i}`}
              >
                <p className="font-display text-3xl text-terra/80 mb-3">0{i + 1}</p>
                <h3 className="font-display text-2xl text-cream">{t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-cream/55">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[900px] mx-auto px-5 sm:px-8 py-20 sm:py-24">
        <SectionHeading eyebrow="FAQ" title="Common Questions." className="mb-10" />
        <div className="border-t border-sand">
          {FAQS.map(([q, a], i) => (
            <Faq key={i} q={q} a={a} i={i} />
          ))}
        </div>
        <p className="mt-6 text-[13px] text-ink/45">
          Answers above reflect our enquiry-led approach — final policies for
          your requirement are confirmed during quoting.
        </p>
      </section>

      {/* Bulk form */}
      <section className="bg-warmwhite border-t border-sand py-20 sm:py-28" id="bulk-enquiry">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Bulk Enquiry"
            title="Request a Bulk Quote."
            intro="Tell us what you're planning — we'll respond with curated options, availability and pricing for your quantity."
            className="mb-12"
          />
          <EnquiryForm variant="bulk" testidPrefix="bulk" />
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t border-sand pt-8">
            <p className="text-[13px] text-ink/55">Prefer to talk it through first?</p>
            <WhatsAppButton context="bulk" label="Discuss on WhatsApp" variant="outline" compact testid="corporate-whatsapp-btn" />
          </div>
        </div>
      </section>
    </div>
  );
}