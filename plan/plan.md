# Nivoram — Logo-Led Colour Reskin ("Mandala & Flame")

The website gets a full colour-finish reskin built from the official logo: a signature coral→orange flame gradient (from the letterforms) leads the eye, orchid purple and lavender (from the mandala) spark as secondary accents, and warm cream stays the dominant canvas. Same pages, same layouts — a richer, more logo-true skin over everything.

## Who it's for
Nivoram's visitors — gift buyers and décor browsers — who should feel the brand's logo colours carrying them from hero to footer; and the owner, who wants the site to visibly belong to the logo they supplied.

## Core features and experience
- **Flame gradient system**: the logo's red→orange ramp becomes a reusable accent — gradient text on chosen headline words (large display sizes only), gradient primary buttons with a hover shift, thin gradient divider rules between sections, gradient nav underlines.
- **Purple sparks**: orchid purple and lavender appear in eyebrow labels, chips and badges, focus rings, the marquee diamonds, and the "Price on enquiry" lines — always as small confident accents, never page backgrounds.
- **Tinted alternating sections**: white sections gain a barely-warm wash so cream/white bands alternate with more rhythm; the charcoal corporate band and footer gain a thin flame top rule and lavender-tinted headings.
- **Restyled cards**: product and collection cards get warm-tinted hover shadows and a subtle gradient border on hover; the New Arrival / Bestseller badges restyle (flame gradient / orchid).
- **Header**: cream nav stays; the active/hover underline becomes the flame gradient; the support strip keeps charcoal; WhatsApp buttons keep their recognisable green.

## User flow
Unchanged — every page, menu, product page, form and the Gift Finder behave exactly as today. The reskin is a colour-and-finish layer over the existing structure; nothing moves, nothing is removed.

## UI/UX feel
Warm, celebratory, still editorial. The logo reads as the source of truth: flame leads, purple sparks, cream breathes. Gradient text is reserved for short words in large headings so contrast and readability stay strong; body text remains charcoal; motion and reduced-motion behaviour are untouched.

## Implementation phases
**Phase 1 — MVP (built now)**
1. Add the flame-gradient tokens and utility styles (gradient text, gradient button, gradient rule, hover-border) alongside the existing coral/orchid tokens.
2. Apply the primary-button gradient, hero and section-heading accent words, section divider rules, marquee upgrade, card hover accents + restyled badges, footer/header accents.
3. Verify desktop + mobile rendering, contrast on all gradient text, and that no page or flow changed.

**Phase 2 (later)**
- Deeper tinted alternating section backgrounds, gradient-framed collection banners, Gift Finder steps restyled to match, image-hover glow treatment.

**Phase 3 (later)**
- Festive/seasonal colour mode, subtle animated gradient moments, optional dark-charcoal theme exploration.

## Assumptions
- Gradient endpoints are sampled from the logo letterforms (≈ #EA3A2E → #F98140); orchid #AC2FCB and lavender #C77FEA stay as extracted from the mandala; cream #F8F3EB, charcoal #302B32, sand borders and white cards are unchanged.
- "Full reskin" is interpreted as a colour/finish layer on the current design — no layout restructuring, no new pages, no dependency additions.
- The earlier flat coral/orchid accents are absorbed into this system so no old styling lingers inconsistently.
- WhatsApp green is preserved by brand requirement; body text and small labels stay charcoal for contrast.
- Only Phase 1 is built on approval; Phases 2–3 are listed for later approval.