import { useSEO } from "@/lib/seo";

const SECTIONS = [
  ["About these terms", "These Terms & Conditions govern the use of the Nivoram website. This is a working draft and will be finalised with Nivoram before launch — [placeholder: registered entity name, address and jurisdiction to be supplied]."],
  ["Nature of this website", "The website is a brand showcase and enquiry-led catalogue. Products displayed are subject to availability, and pricing is shared on enquiry. Nothing on this site constitutes an offer to sell; a purchase is concluded only upon confirmation by the Nivoram team."],
  ["Product information", "Listings currently marked as sample entries are placeholders pending verified specifications and photography. Verified details — materials, finishes, dimensions and pricing — will be published once confirmed by the business."],
  ["Enquiries & quotations", "Enquiry and bulk-quote submissions are invitations to discuss a requirement. Quotes are prepared per requirement and confirmed directly with the customer; timelines, customisation options and minimum quantities are confirmed during quoting."],
  ["Intellectual property", "The Nivoram name, logo and site content belong to Nivoram. [Placeholder: trademark/registration status to be confirmed before launch.]"],
  ["Governing law", "[Placeholder: governing law and dispute resolution to be finalised with Nivoram before launch.]"],
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
        Draft — finalised with Nivoram before launch. Placeholders are marked in [brackets].
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