import SectionHeading from "@/components/SectionHeading";
import { useSEO } from "@/lib/seo";

const SECTIONS = [
  ["Overview", "This Privacy Policy describes how Nivoram handles information submitted through this website. It is a working draft and will be finalised with Nivoram before launch — [placeholder: registered entity name and jurisdiction to be supplied]."],
  ["Information we collect", "When you submit an enquiry (general or bulk gifting), we collect the details you provide: your name, email address, phone number, and any information you choose to share about your requirement (company, occasion, quantity, budget, delivery preferences, product interests and your message)."],
  ["How we use it", "Your details are used solely to respond to your enquiry — to share product information, pricing and availability, and to correspond with you about your requirement. We do not sell or rent personal information."],
  ["Storage & sharing", "Enquiries are stored in the website's secured database and forwarded to the Nivoram team email for response. [Placeholder: data retention period and any third-party processors to be confirmed before launch.]"],
  ["Your choices", "You may ask us to correct or delete the details you submitted at any time by writing to the contact email on this site."],
  ["Updates", "This policy will be updated before launch with verified business details. The version published on the live site is the one that applies."],
];

export default function Privacy() {
  useSEO({
    title: "Privacy Policy",
    description: "How Nivoram handles information submitted through this website.",
    path: "/privacy-policy",
  });

  return (
    <div className="max-w-[760px] mx-auto px-5 sm:px-8 pt-16 pb-24" data-testid="privacy-page">
      <p className="text-[11px] uppercase tracking-[0.3em] text-terra mb-5">Legal</p>
      <h1 className="font-display text-5xl sm:text-6xl tracking-tight text-ink">Privacy Policy</h1>
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