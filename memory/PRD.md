# NIVORAM — Brand Showcase Website (PRD)

## Original problem statement
Build a complete, responsive, production-ready brand showcase website for NIVORAM — a brand specialising in silver-coated home décor, decorative showpieces, spiritual décor and thoughtful gifting. Enquiry-led catalogue (not a transactional store), animated luxury editorial experience, strict warm-cream/charcoal/terracotta/purple palette, WhatsApp enquiry flows, functional forms, SEO, accessibility, and a centralised product data source. No invented business facts, testimonials or product claims.

## Architecture
- **Palette (2026-10-13, logo-derived)**: cream #F8F3EB, charcoal #302B32, white, sand #E5DCD0 unchanged; accents re-tuned to the official logo — coral-red #E04A36 (letterform red-orange family, replaces terracotta #C87560), orchid #AC2FCB (mandala core, replaces royal #6B2D91), plus coral #F4744A and lavender #C77FEA as supporting tones (marquee separators, hovers).
- **Frontend**: React 19 (CRA + craco), Tailwind CSS 3.4 design tokens, react-router-dom v7, framer-motion v11 (scroll reveals, masked line-by-line hero, staggered grids), Lenis smooth scrolling (disabled for prefers-reduced-motion), sonner toasts, lucide-react icons. Custom SVG logo mark + favicon.
- **Backend**: FastAPI + Motor/MongoDB. `POST /api/enquiries` (general + bulk) with Pydantic validation, honeypot spam trap, per-IP rate limit (8/min), ObjectId-safe document model, email delivery via Emergent-managed Resend proxy (fixed server-side template, G2–G5 guardrails enforced).
- **Data**: centralised catalogue in `src/data/catalog.js` (7 collections, 14 products, 5 occasions, 4 journal drafts); site config in `src/config/site.js`.
- **SEO**: per-page titles/descriptions/canonical/OG via `useSEO`, Organization JSON-LD, robots.txt, sitemap.xml, semantic headings, image alt text.

## Implemented (2026-10-07)
- Home (kinetic hero with masked line reveal + parallax image, editorial marquee, 6-collection bento, featured products, philosophy, occasions, corporate teaser, social section, closing CTA, footer)
- Collections overview + 7 collection pages (occasion filters, enquiry CTA, related collections)
- Product detail template (gallery + thumbnails, specs with "On request" placeholders, SKU-aware WhatsApp enquiry, related pieces)
- Our Story, Corporate Gifting (use cases, process, FAQ, bulk form), Contact (form + cards)
- Journal index + article template (clearly labelled drafts), Privacy, Terms, custom 404
- Floating WhatsApp button, header/dropdown/mobile drawer navigation, animated nav underlines
- Working forms: client + server validation, loading/success/error states, honeypot; enquiries stored in MongoDB `enquiries` collection AND emailed via Resend

## User personas
- Gift buyers (weddings, anniversaries, festivals, housewarming) browsing collections → product → WhatsApp enquiry
- Corporate/bulk gifting teams submitting structured bulk quotes
- Studio owner maintaining catalogue via one data file; owner receiving enquiries by email

## Launch requirements still pending (business to supply)
1. Official WhatsApp business number (`src/config/site.js`)
2. Real product photography + verified specifications/prices (replace sample entries)
3. Owner email inbox (backend `ENQUIRY_EMAIL` — currently a test address)
4. Official Instagram URL, contact email, final domain (update sitemap/robots/siteUrl)
5. Journal article approvals; legal page finalisation

## Restructure (2026-10-13)
- Navigation rebuilt: Home · Shop▾ (Shop All / New Arrivals / Bestsellers) · Collections▾ (Sacred Elegance, Statement Décor, Timeless Accents, Frames & Keepsakes, Auspicious Living, Thoughtful Gifting) · Gifting▾ (Wedding/Housewarming/Festive/Return gifts pages + Corporate) · About Us▾ (Our Story / Why Nivoram / Craftsmanship) · Contact▾ (Enquiries / Custom Orders / FAQs). Slim support strip beneath nav, editable in SITE_CONFIG.supportMessage.
- Catalogue re-mapped: 6 curated collections, occasion tags (weddings/housewarming/festive/return/corporate), isNew/isBestseller flags (false until studio confirms — Shop pages show honest empty states).
- New pages: /shop (+ new-arrivals, bestsellers), /gifts/:key ×4, /why-nivoram, /craftsmanship, /contact/custom-orders, /faqs (with FAQPage JSON-LD).
- Old collection routes redirect (spiritual-pooja-decor→sacred-elegance etc.).
- Mobile/tablet header (2026-10-13): menu drawer moved outside the blurred sticky header (backdrop-filter was trapping position:fixed, collapsing the drawer to a header-height strip); it is now a full-height slide-in panel (max-w-400px, dimmed backdrop, Escape/backdrop/link close, aria-controls/role=dialog, safe-area bottom padding) — full-screen on phones, side drawer on tablets.
- SEO per farm-seo-setup skill: canonical/og:url gated behind domainConfirmed flag, upgraded robots.txt (AI crawler groups + /api/ disallow), sitemap.xml with all new routes, llms.txt, static OG tags + noscript fallback in index.html, per-route titles.
- Logo (2026-10-13): official supplied Nivoram logo integrated as-is in header + footer with its white background removed (transparent PNG, AA de-fringed), so it reads directly on cream and charcoal. Mandala motif isolated from the logo centre for favicon.ico / favicon.png / apple-touch-icon.png (also transparent) and the footer mark. Share image (og:image) still uses photography until the production domain is confirmed.

- Real catalogue swap (2026-10-13): official catalogue PDF parsed — 49 real products across the catalogue's 5 collections (Sacred Elegance, Statement Décor, Auspicious Living, Divine Grace, Thoughtful Gifting; the placeholder-only "Timeless Accents"/"Frames & Keepsakes" edits were retired with redirects). 89 product photos extracted from the PDF into /public/products/ (optimised JPEG, max 1400px). Verified facts now on site: 999 silver-plated & gold/silver-coated materials, @nivoram.shop Instagram (linked in social section/contact/footer), collection copy from the catalogue. Product names are descriptive of photographed pieces; SKUs NVR-2xx are generated pending official codes; all specs stay "On request"; prices stay "on enquiry"; isNew/isBestseller still false until confirmed. Stock imagery remains only in the corporate-gifting WhatsApp fallback text context — all page imagery (hero, story, occasions, use-cases, social) now uses real catalogue photos.

## Backlog
- **P0**: Replace ENQUIRY_EMAIL + WhatsApp number before launch
- **P1**: Real catalogue data + photography; Instagram link; domain + sitemap update
- **P2**: Instagram feed embed, gift-finder quiz, CMS-backed catalogue, multi-image zoom lightbox