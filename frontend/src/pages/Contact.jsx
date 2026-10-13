import { motion } from "framer-motion";
import { Mail, Instagram, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import EnquiryForm from "@/components/EnquiryForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useSEO } from "@/lib/seo";
import { EASE, viewportOnce, fadeUp } from "@/lib/motion";
import { SITE_CONFIG } from "@/config/site";

export default function Contact() {
  useSEO({
    title: "Contact",
    description:
      "Reach Nivoram for décor and gifting enquiries — WhatsApp, email or the general enquiry form.",
    path: "/contact",
  });

  const cards = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      body: SITE_CONFIG.whatsappNumber
        ? "Message us directly — we usually respond during business hours."
        : "Our official WhatsApp number is being set up. The buttons across the site will activate as soon as it's connected.",
      action: <WhatsAppButton context="general" label="Open WhatsApp" variant="outline" compact testid="contact-whatsapp-btn" />,
    },
    {
      icon: Mail,
      title: "Email",
      body: (
        <>
          <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="link-underline text-ink" data-testid="contact-email-link">
            {SITE_CONFIG.contactEmail}
          </a>
          <span className="block mt-1 text-[12px] text-ink/40">(Placeholder address — official email coming soon)</span>
        </>
      ),
      action: null,
    },
    {
      icon: Instagram,
      title: "Instagram",
      body: SITE_CONFIG.instagramUrl
        ? `Follow ${SITE_CONFIG.instagramHandle} for styling notes and new pieces.`
        : "Our official Instagram profile link is being connected.",
      action: SITE_CONFIG.instagramUrl ? (
        <a
          href={SITE_CONFIG.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center border border-ink/30 text-ink text-[11px] uppercase tracking-[0.18em] px-5 h-10 hover:border-ink hover:bg-ink hover:text-cream transition-colors duration-300"
          data-testid="contact-instagram-link"
        >
          Open Instagram
        </a>
      ) : null,
    },
  ];

  return (
    <div data-testid="contact-page">
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-14">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="text-[11px] uppercase tracking-[0.3em] text-royal mb-6"
        >
          Contact
        </motion.p>
        <h1 className="font-display text-[13vw] sm:text-6xl lg:text-[84px] leading-[0.98] tracking-tight text-ink">
          {["We'd Love to", "Hear From You."].map((line, i) => (
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
          className="mt-8 max-w-xl text-[15px] leading-relaxed text-ink/60"
        >
          Whether it's a single gift or a room you're styling — tell us the
          moment, and we'll help you find the piece.
        </motion.p>
      </section>

      {/* Contact cards */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-white border border-sand p-7 flex flex-col"
              data-testid={`contact-card-${c.title.toLowerCase()}`}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center border border-sand text-terra mb-5">
                <c.icon size={18} strokeWidth={1.8} />
              </span>
              <h2 className="font-display text-2xl text-ink">{c.title}</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-ink/55 flex-1">{c.body}</p>
              {c.action && <div className="mt-5">{c.action}</div>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* General form — warm band */}
      <section className="bg-warmwhite border-t border-sand py-16">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="General Enquiry"
          title="Send Us a Note."
          intro="Share what you're looking for — a piece, a price, or a gift you're planning. We'll respond on the details you leave."
          className="mb-12"
        />
        <EnquiryForm variant="general" testidPrefix="contact" />
        </div>
      </section>
    </div>
  );
}