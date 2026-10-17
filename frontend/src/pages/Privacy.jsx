import SectionHeading from "@/components/SectionHeading";
import { useSEO } from "@/lib/seo";

const SECTIONS = [
  ["Who we are", "Nivoram (“we”, “us”) operates the website nivoram.com — a showcase of 999 silver coated and gold coated décor, idols and gifting pieces. Enquiries are handled personally by our team for customers in India and the UAE. This policy explains what information we receive through the site and what we do with it."],
  ["Information we collect", "When you submit an enquiry — general, product, custom or bulk/corporate — we receive the details you provide: your name, email address, phone number and your message, along with anything you choose to tell us about your requirement (occasion, quantities, city, company name, delivery preferences and product interests). If you contact us on WhatsApp, those chats are handled under WhatsApp's own privacy terms as well as this policy. We do not offer accounts, logins or online checkout, so we do not collect payment details on this site."],
  ["How we use it", "Your details are used only to respond to your enquiry — to share product information, prices and availability, prepare quotations (including bulk and corporate quotes), and correspond with you about pieces you asked about. We may keep a record of the enquiry so our conversations stay consistent. We do not sell, rent or trade personal information, and we do not add you to marketing lists — you will hear from us only about the enquiry you made."],
  ["Service providers", "Enquiries submitted on the site are stored in the website's secured database and forwarded by an automated email delivery service to our team inbox (info@nivoram.com) so we can respond. These providers process the information only to store and deliver it. If you message us on WhatsApp, Meta processes that communication on its platform."],
  ["Storage, retention & security", "We keep enquiry records only as long as needed to handle your requirement and maintain a reasonable history of correspondence, after which they are deleted. Access is limited to the Nivoram team handling enquiries. You can ask us to delete your details sooner at any time."],
  ["Cookies & tracking", "The website does not run advertising trackers or profiling cookies. Standard, short-lived technical logs kept by the hosting platform are used only for security and reliability."],
  ["Your rights", "You may ask us for the details we hold about you, request corrections, or ask us to delete them — write to info@nivoram.com and we will act on reasonable requests promptly. If you are unhappy with how we handled your information, tell us; we would like to make it right."],
  ["Children", "This site is intended for adults. We do not knowingly collect information from children."],
  ["Updates", "We may update this policy as the business grows — the version published here, with its last-updated date, is the one that applies."],
  ["Contact", "Questions about privacy: email info@nivoram.com or message us on WhatsApp at +91 77605 11222."],
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
