import { useSEO } from "@/lib/seo";

const SECTIONS = [
  ["About these terms", "These Terms & Conditions apply to the use of the website nivoram.com, operated by Nivoram — a showcase of 999 silver coated and gold coated décor, idols and gifting pieces. By using the site or submitting an enquiry, you accept these terms. If you do not agree, please contact us directly instead of using the site."],
  ["Nature of this website", "The website is an enquiry-led catalogue. Nothing on the site is an offer to sell; all pieces are price-on-enquiry and a purchase is concluded only when our team confirms your order directly with you. We serve enquiries from India and the UAE."],
  ["Products, finishes & imagery", "Nivoram pieces carry 999 silver coated and gold coated (silver-tone) finishes — they are not articles of solid silver, and product pages state material details only where verified; specifications not yet confirmed are shown as “on request”. Product pages show each piece's actual catalogue photograph. Some surrounding artwork — the hero image, collection banners and collection cards — is digitally created illustrative imagery made for presentation and may not depict exact products, sizes or arrangements. Colour and finish may vary slightly with photography, screens and handmade variation."],
  ["Pricing, availability & orders", "Prices are shared on enquiry and may change without notice. Placing an enquiry does not reserve a piece; availability is confirmed when we respond. An order exists only after we confirm it to you in writing (including over email or WhatsApp), along with the agreed price, delivery timeline and any applicable taxes."],
  ["Enquiries & bulk quotations", "Enquiry and bulk/corporate quote submissions are invitations to discuss a requirement. Quotes are prepared per requirement — minimum quantities, customisation, timelines and taxes are confirmed during quoting. A quote is not an order until confirmed."],
  ["Delivery & care", "Delivery arrangements, packaging and costs are confirmed with you when your order is confirmed. Silver-tone pieces are finished with care and last best with gentle handling — soft dry cleaning, avoiding abrasives and prolonged moisture. Care guidance is shared with orders and on our craftsmanship page."],
  ["Returns & replacements", "Return, replacement or warranty terms, if any, are as agreed in writing in your order confirmation, and nothing here limits rights you may have under applicable law. If a piece reaches you damaged or incorrect, contact us immediately — we will make it right."],
  ["Intellectual property", "The Nivoram name, logo, site design, text and imagery — including the illustrative artwork described above — belong to Nivoram and may not be reproduced or used commercially without our written permission. Product photography originates from Nivoram's catalogue."],
  ["Limitation of liability", "The website is provided as a showcase “as is”. To the extent permitted by law, Nivoram is not liable for indirect or consequential losses arising from use of the site. Our obligations towards any purchase are those stated in your order confirmation."],
  ["Governing law", "These terms are governed by the laws of India, and disputes arising from use of the website will be subject to the jurisdiction of Indian courts."],
  ["Contact", "Questions about these terms: email info@nivoram.com or message us on WhatsApp at +91 77605 11222."],
];

export default function Terms() {
  useSEO({
    title: "Terms & Conditions",
    description: "Terms governing the use of the Nivoram website.",
    path: "/terms-conditions",
  });

  return (
    <div className="max-w-[760px] mx-auto px-5 sm:px-8 pt-16 pb-24" data-testid="terms-page">
      <p className="text-[11px] uppercase tracking-[0.3em] text-terra mb-5">Legal</p>
      <h1 className="font-display text-5xl sm:text-6xl tracking-tight text-ink">Terms &amp; Conditions</h1>
      <p className="mt-4 text-[13px] text-ink/50 border-l-2 border-terra/50 pl-4">
        Last updated: 17 October 2026
      </p>
      <div className="mt-12 space-y-10">
        {SECTIONS.map(([title, body]) => (
          <section key={title}>
            <h2 className="font-display text-2xl text-ink mb-3">{title}</h2>
            <p className="text-[15px] leading-[1.8] text-ink/70">{body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
