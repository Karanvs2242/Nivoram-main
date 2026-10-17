/**
 * NIVORAM — centralised catalogue.
 *
 * SOURCE OF TRUTH: the official Nivoram product catalogue PDF (uploaded
 * 2026-10-13). All product photography in /public/products/ is real
 * Nivoram catalogue imagery extracted from that PDF.
 *
 * HOW TO UPDATE (handover):
 *  - Add/edit products in PRODUCTS below. `image`/`images` take paths under
 *    /products/ or full URLs. Drop new photos into public/products/.
 *  - The catalogue supplied photos only: names are descriptive of the
 *    photographed piece, SKUs (NVR-2xx) are generated, and every detail
 *    field is intentionally null → the UI shows "On request" until the
 *    studio verifies it. Set placeholder: false now that photos are real.
 *  - Prices stay "Price on enquiry" by business decision.
 *  - isNew / isBestseller: flip to true ONLY on explicit studio confirmation.
 *  - Collections live in COLLECTIONS (the five edits from the catalogue);
 *    products may belong to several. Occasion tags (weddings, housewarming,
 *    festive, return, corporate) power the Gifting pages.
 */

const P = (f) => `/products/${f}`;

export const IMAGES = {
  hero: P("p06-x165.jpg"),
  heroAlt: "Silver-plated sculpture of hands cradling a peacock feather",
  philosophy: P("p11-x246.jpg"),
  story: P("p07-x173.jpg"),
  corporateGift: P("p25-x416.jpg"),
  finish: P("p10-x223.jpg"),
  craftElephants: P("p14-x282.jpg"),
  recognition: P("p26-x426.jpg"),
  clientGift: P("p25-x410.jpg"),
  events: P("p27-x432.jpg"),
  hampers: P("p27-x435.jpg"),
  socialGrid: [P("p06-x167.jpg"), P("p27-x432.jpg"), P("p26-x423.jpg"), P("p17-x323.jpg")],
  corporateBox: "https://images.unsplash.com/photo-1780744871777-fec13139d281?auto=format&fit=crop&w=1200&q=80",
  weddings: P("p21-x375.jpg"),
  housewarming: P("p17-x323.jpg"),
  festive: P("p27-x435.jpg"),
  returnGifts: P("p25-x416.jpg"),
  corporate: P("p25-x410.jpg"),
};

/* ── Curated collections (from the official catalogue) ── */
export const COLLECTIONS = [
  {
    slug: "sacred-elegance",
    name: "Sacred Elegance",
    short: "Divine idols and accents that embody devotion and inner peace.",
    description:
      "Our Sacred Elegance collection brings together meaningful pieces that embody devotion, strength, protection, abundance and inner peace. Designed to add serenity and spiritual warmth to your space, each creation is a beautiful reminder of faith, positivity and the values we hold close.",
    image: P("p06-x167.jpg"),
    alt: "Silver-plated Ganesha idol cradled in hands with flowers",
    bannerImage: "/images/banners/sacred-elegance.jpg",
    cardImage: "/images/cards/sacred-elegance.jpg",
  },
  {
    slug: "statement-decor",
    name: "Statement Décor",
    short: "Distinctive designs that transform spaces with presence.",
    description:
      "Distinctive designs that transform spaces with presence. Each piece is chosen to elevate everyday interiors with character, sophistication, refined detailing and an effortless touch of luxury.",
    image: P("p12-x254.jpg"),
    alt: "Ornate silver-plated wall clock styled in a living room",
    bannerImage: "/images/banners/statement-decor.jpg",
    cardImage: "/images/cards/statement-decor.jpg",
  },
  {
    slug: "auspicious-living",
    name: "Auspicious Living",
    short: "Tradition and symbolism for prosperous, harmonious homes.",
    description:
      "Thoughtfully curated with pieces inspired by tradition and auspicious symbolism — associated with inviting prosperity, positivity, harmony and abundance into the home. A blend of tradition, intention and timeless décor for homes that celebrate both beauty and auspicious living.",
    image: P("p18-x344.jpg"),
    alt: "Silver-plated elephant pair presented on a tray",
    bannerImage: "/images/banners/auspicious-living.jpg",
    cardImage: "/images/cards/auspicious-living.jpg",
  },
  {
    slug: "divine-grace",
    name: "Divine Grace",
    short: "A celebration of devotion, serenity and timeless beauty.",
    description:
      "A celebration of devotion, serenity and timeless beauty. Each piece reflects the grace, symbolism and warmth associated with divine presence — blending meaningful artistry with refined craftsmanship for spaces that feel peaceful, uplifting and deeply connected to tradition.",
    image: P("p20-x365.jpg"),
    alt: "Set of four silver-plated seated deities with lanterns",
    bannerImage: "/images/banners/divine-grace.jpg",
    cardImage: "/images/cards/divine-grace.jpg",
  },
  {
    slug: "thoughtful-gifting",
    name: "Thoughtful Gifting",
    short: "For weddings, housewarmings, festivals and every heart.",
    description:
      "Curated for life's most meaningful celebrations — from weddings and housewarmings to festivals and special occasions. Each piece is chosen to make gifting feel personal, elegant and memorable, made to be cherished long after the occasion has passed.",
    image: P("p27-x432.jpg"),
    alt: "Silver-plated floral tray styled with flowers and floating candles",
    bannerImage: "/images/banners/thoughtful-gifting.jpg",
  },
];

/* ── Occasion-led gifting pages (navigation: Gifting dropdown) ── */
export const GIFT_OCCASIONS = [
  {
    key: "weddings",
    label: "Wedding Gifts",
    page: "/gifts/weddings",
    image: IMAGES.weddings,
    blurb:
      "For weddings, anniversaries and the milestones around them — divine idols, keepsakes and table pieces made to be kept, used and remembered.",
  },
  {
    key: "housewarming",
    label: "Housewarming Gifts",
    page: "/gifts/housewarming",
    image: IMAGES.housewarming,
    blurb:
      "Moving in is chaotic — the best housewarming gifts already have a place ready for them. Planters, idols and accents that go to work on day one.",
  },
  {
    key: "festive",
    label: "Festive Gifts",
    page: "/gifts/festive",
    image: IMAGES.festive,
    blurb:
      "For the festivals that bring everyone home — diyas, urli bowls and celebration pieces with a warm, restrained sense of occasion.",
  },
  {
    key: "return",
    label: "Return Gifts",
    page: "/gifts/return",
    image: IMAGES.returnGifts,
    blurb:
      "Considered favours for guests and gatherings — keepsake boxes, frames and small pieces that say thank you beautifully, for ten guests or a hundred.",
  },
];

/* Home occasion strip = four gifting pages + corporate page */
export const OCCASIONS = [
  { key: "weddings", label: "Weddings & Anniversaries", page: "/gifts/weddings", image: IMAGES.weddings },
  { key: "housewarming", label: "Housewarming", page: "/gifts/housewarming", image: IMAGES.housewarming },
  { key: "festive", label: "Festive Celebrations", page: "/gifts/festive", image: IMAGES.festive },
  { key: "return", label: "Return Gifts", page: "/gifts/return", image: IMAGES.returnGifts },
  { key: "corporate", label: "Corporate Gifting", page: "/corporate-gifting", image: IMAGES.corporate },
];

export const OCCASION_LABELS = {
  weddings: "Weddings",
  housewarming: "Housewarming",
  festive: "Festive",
  return: "Return gifts",
  corporate: "Corporate",
};

/* ── Products — real Nivoram catalogue photography ── */
export const PRODUCTS = [
  /* ── SACRED ELEGANCE ── */
  {
    id: "nvr-201", sku: "NVR-201", slug: "ganesha-idol-display-stand",
    name: "Ganesha Idol on Display Stand",
    description: "A silver-plated Ganesha idol with fine detailing, presented on a display stand — a considered piece for a pooja shelf, console or entryway.",
    image: P("p08-x185.jpg"), images: [P("p08-x185.jpg"), P("p06-x167.jpg")],
    collections: ["sacred-elegance", "divine-grace"], occasions: ["weddings", "housewarming", "festive"],
    featured: true, bulkEligible: false, placeholder: false, isNew: false, isBestseller: true,
  },
  {
    id: "nvr-202", sku: "NVR-202", slug: "krishna-with-flute",
    name: "Krishna with Flute",
    description: "A silver-plated Krishna idol with his flute, finished with intricate detailing on face and attire — photographed in the Nivoram studio collection.",
    image: P("p06-x163.jpg"), images: [P("p06-x163.jpg"), P("p05-x151.jpg")],
    collections: ["sacred-elegance"], occasions: ["weddings", "festive", "housewarming"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-203", sku: "NVR-203", slug: "krishna-with-flute-gold-silver",
    name: "Krishna with Flute — Gold & Silver",
    description: "A Krishna idol finished in both gold and silver tones, presented on a black display stand with a peacock feather — a striking devotional accent.",
    image: P("p05-x159.jpg"), images: [P("p05-x159.jpg")],
    collections: ["sacred-elegance"], occasions: ["weddings", "festive", "housewarming"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-204", sku: "NVR-204", slug: "ornate-vishnu-idol",
    name: "Ornate Vishnu Idol",
    description: "A silver-plated Vishnu idol with an elaborate headdress and finely detailed attire — a piece of presence for a pooja niche or statement shelf.",
    image: P("p05-x154.jpg"), images: [P("p05-x154.jpg"), P("p07-x178.jpg")],
    collections: ["sacred-elegance"], occasions: ["festive", "housewarming", "weddings"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-205", sku: "NVR-205", slug: "radha-krishna-pair",
    name: "Radha-Krishna Pair",
    description: "A silver-plated Radha-Krishna pair with intricate detailing — a classic blessing for weddings, anniversaries and festive gifting.",
    image: P("p07-x173.jpg"), images: [P("p07-x173.jpg"), P("p08-x189.jpg")],
    collections: ["sacred-elegance", "thoughtful-gifting"], occasions: ["weddings", "festive"],
    featured: true, bulkEligible: false, placeholder: false, isNew: false, isBestseller: true,
  },
  {
    id: "nvr-206", sku: "NVR-206", slug: "feather-in-hand-sculpture",
    name: "Feather-in-Hand Sculpture",
    description: "An artistic silver sculpture of hands cradling a peacock feather — an evocative, contemporary devotional piece for styled interiors.",
    image: P("p06-x165.jpg"), images: [P("p06-x165.jpg"), P("p06-x167.jpg")],
    collections: ["sacred-elegance", "statement-decor"], occasions: ["decor", "housewarming", "weddings"],
    featured: false, bulkEligible: false, placeholder: false, isNew: true, isBestseller: false,
  },
  {
    id: "nvr-207", sku: "NVR-207", slug: "carved-shankha",
    name: "Carved Shankha",
    description: "A silver-plated conch shell with deity carvings and a detailed finish — a sacred accent for pooja rituals and gifting.",
    image: P("p07-x176.jpg"), images: [P("p07-x176.jpg"), P("p07-x180.jpg")],
    collections: ["sacred-elegance"], occasions: ["festive", "return"],
    featured: false, bulkEligible: true, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-208", sku: "NVR-208", slug: "lakshmi-charan",
    name: "Lakshmi Charan",
    description: "Silver-plated Lakshmi feet with gold-tone accents and ornate detailing — an auspicious piece for entrances, poojas and Diwali gifting.",
    image: P("p07-x171.jpg"), images: [P("p07-x171.jpg")],
    collections: ["sacred-elegance", "thoughtful-gifting"], occasions: ["festive", "return", "weddings"],
    featured: false, bulkEligible: true, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-209", sku: "NVR-209", slug: "divine-musicians-set",
    name: "Divine Musicians Set",
    description: "A set of silver-plated figurines on a wooden base — a sculptural group piece that brings warmth to consoles and living spaces.",
    image: P("p08-x187.jpg"), images: [P("p08-x187.jpg")],
    collections: ["sacred-elegance", "statement-decor"], occasions: ["decor", "housewarming", "return"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },

  /* ── STATEMENT DÉCOR ── */
  {
    id: "nvr-210", sku: "NVR-210", slug: "swan-on-pedestal",
    name: "Swan on Pedestal",
    description: "A silver-plated swan with an elegant posture, set on a wooden pedestal — quiet presence for consoles and corners.",
    image: P("p10-x220.jpg"), images: [P("p10-x220.jpg"), P("p11-x241.jpg")],
    collections: ["statement-decor"], occasions: ["decor", "housewarming", "weddings"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-211", sku: "NVR-211", slug: "peacock-rimmed-bowl",
    name: "Peacock-Rimmed Bowl",
    description: "A silver-plated bowl with peacock detailing along the rim — for dry fruits, flowers or simply as a sculptural centrepiece.",
    image: P("p10-x223.jpg"), images: [P("p10-x223.jpg")],
    collections: ["statement-decor", "thoughtful-gifting"], occasions: ["decor", "weddings", "festive"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-212", sku: "NVR-212", slug: "relief-carved-vase-pair",
    name: "Relief-Carved Vase Pair",
    description: "A pair of silver-plated vases with intricate relief carvings — styled beautifully with flowers, books or on their own.",
    image: P("p10-x229.jpg"), images: [P("p10-x229.jpg"), P("p11-x239.jpg"), P("p11-x246.jpg")],
    collections: ["statement-decor"], occasions: ["decor", "weddings", "housewarming"],
    featured: true, bulkEligible: false, placeholder: false, isNew: false, isBestseller: true,
  },
  {
    id: "nvr-213", sku: "NVR-213", slug: "tall-figural-vase",
    name: "Tall Figural Vase",
    description: "A tall silver-plated vase with detailed figures and motifs — a statement piece for entryways and statement corners.",
    image: P("p11-x236.jpg"), images: [P("p11-x236.jpg")],
    collections: ["statement-decor"], occasions: ["decor", "housewarming", "weddings"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-214", sku: "NVR-214", slug: "peacock-pair-with-vases",
    name: "Peacock Pair with Vases",
    description: "A pair of silver-plated peacocks standing beside carved vases — a coordinated statement for consoles and sideboards.",
    image: P("p10-x232.jpg"), images: [P("p10-x232.jpg")],
    collections: ["statement-decor"], occasions: ["decor", "housewarming", "weddings"],
    featured: false, bulkEligible: false, placeholder: false, isNew: true, isBestseller: false,
  },
  {
    id: "nvr-215", sku: "NVR-215", slug: "swan-figurine",
    name: "Swan Figurine",
    description: "A single silver-plated swan with graceful lines on a dark wooden base — understated elegance for desks and shelves.",
    image: P("p11-x241.jpg"), images: [P("p11-x241.jpg")],
    collections: ["statement-decor"], occasions: ["decor", "housewarming", "return"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-216", sku: "NVR-216", slug: "swan-pair",
    name: "Swan Pair",
    description: "A pair of silver-plated swans on individual bases — a traditional symbol of partnership, and a natural wedding gift.",
    image: P("p15-x303.jpg"), images: [P("p15-x303.jpg")],
    collections: ["statement-decor", "thoughtful-gifting"], occasions: ["decor", "weddings", "return"],
    featured: false, bulkEligible: true, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-217", sku: "NVR-217", slug: "ornate-wall-clock",
    name: "Ornate Wall Clock",
    description: "A round wall clock framed in intricate silverwork — a functional piece that holds a living room wall with presence.",
    image: P("p12-x257.jpg"), images: [P("p12-x257.jpg"), P("p12-x254.jpg")],
    collections: ["statement-decor"], occasions: ["decor", "housewarming", "weddings"],
    featured: true, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-218", sku: "NVR-218", slug: "divine-dial-clock",
    name: "Divine-Dial Clock",
    description: "A silver-plated wall clock with divine figures arranged around the dial — devotional detailing for everyday moments.",
    image: P("p12-x259.jpg"), images: [P("p12-x259.jpg")],
    collections: ["statement-decor"], occasions: ["decor", "housewarming", "festive"],
    featured: false, bulkEligible: false, placeholder: false, isNew: true, isBestseller: false,
  },
  {
    id: "nvr-219", sku: "NVR-219", slug: "starburst-wall-clock",
    name: "Starburst Wall Clock",
    description: "A wall clock with a starburst silver frame — sculptural, light-catching and at home in modern interiors.",
    image: P("p12-x263.jpg"), images: [P("p12-x263.jpg")],
    collections: ["statement-decor"], occasions: ["decor", "housewarming", "weddings"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-220", sku: "NVR-220", slug: "peacock-table-clock",
    name: "Peacock Table Clock",
    description: "A table clock flanked by silver-plated peacock motifs — a desk or mantel piece that makes time-keeping feel occasion-worthy.",
    image: P("p12-x265.jpg"), images: [P("p12-x265.jpg")],
    collections: ["statement-decor", "thoughtful-gifting"], occasions: ["decor", "weddings", "return", "corporate"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-221", sku: "NVR-221", slug: "hanuman-frame",
    name: "Hanuman Frame",
    description: "An ornate silver-plated frame carrying an image of Lord Hanuman — devotional art presented the way it deserves.",
    image: P("p13-x275.jpg"), images: [P("p13-x275.jpg")],
    collections: ["statement-decor", "thoughtful-gifting"], occasions: ["decor", "festive", "return"],
    featured: false, bulkEligible: true, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-222", sku: "NVR-222", slug: "radha-krishna-frame",
    name: "Radha-Krishna Frame",
    description: "A silver-plated frame with Radha-Krishna imagery and ornate silverwork — a blessing piece for home shrines and gifting.",
    image: P("p13-x277.jpg"), images: [P("p13-x277.jpg"), P("p13-x270.jpg")],
    collections: ["statement-decor", "thoughtful-gifting"], occasions: ["decor", "weddings", "return", "festive"],
    featured: false, bulkEligible: true, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-223", sku: "NVR-223", slug: "elephant-lotus-frame",
    name: "Elephant & Lotus Frame",
    description: "An ornate silver-plated frame featuring two elephants and a lotus — auspicious imagery for photographs worth keeping.",
    image: P("p13-x272.jpg"), images: [P("p13-x272.jpg"), P("p13-x268.jpg")],
    collections: ["statement-decor"], occasions: ["decor", "housewarming", "return", "weddings"],
    featured: false, bulkEligible: true, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-224", sku: "NVR-224", slug: "elephant-fruit-bowl",
    name: "Elephant-Supported Fruit Bowl",
    description: "A silver-plated bowl held aloft by elephant figures — a festive-table centrepiece for dry fruits and celebrations.",
    image: P("p14-x280.jpg"), images: [P("p14-x280.jpg")],
    collections: ["statement-decor", "thoughtful-gifting"], occasions: ["decor", "weddings", "festive", "housewarming"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-225", sku: "NVR-225", slug: "embossed-elephant-pair",
    name: "Embossed Elephant Pair",
    description: "A pair of silver-plated elephants with detailed embossing — an auspicious classic for entryways and living spaces.",
    image: P("p14-x282.jpg"), images: [P("p14-x282.jpg")],
    collections: ["statement-decor", "auspicious-living"], occasions: ["decor", "housewarming", "weddings"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-226", sku: "NVR-226", slug: "silver-sitar-replica",
    name: "Silver Sitar Replica",
    description: "An ornate silver-plated sitar replica on a clear stand — a musical, cultural accent for studies and styled shelves.",
    image: P("p14-x284.jpg"), images: [P("p14-x284.jpg")],
    collections: ["statement-decor"], occasions: ["decor", "housewarming", "corporate"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-227", sku: "NVR-227", slug: "engraved-keepsakes-pair",
    name: "Engraved Keepsakes, Pair",
    description: "A pair of silver-plated keepsake pieces with engraved script — a meaningful accent presented on gold fabric.",
    image: P("p14-x288.jpg"), images: [P("p14-x288.jpg")],
    collections: ["statement-decor", "thoughtful-gifting"], occasions: ["return", "corporate", "festive"],
    featured: false, bulkEligible: true, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-228", sku: "NVR-228", slug: "ornate-chowki-stand",
    name: "Ornate Chowki Stand",
    description: "A silver-plated chowki platform with ornate legs and an inlaid top — for pooja setups, idols and festive displays.",
    image: P("p15-x295.jpg"), images: [P("p15-x295.jpg"), P("p15-x299.jpg")],
    collections: ["statement-decor", "sacred-elegance"], occasions: ["festive", "return"],
    featured: false, bulkEligible: true, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-229", sku: "NVR-229", slug: "swastika-pooja-mat",
    name: "Swastika Pooja Mat",
    description: "A decorative pooja mat with an auspicious silver pattern — a small piece that completes any ritual setup.",
    image: P("p15-x297.jpg"), images: [P("p15-x297.jpg")],
    collections: ["statement-decor", "sacred-elegance"], occasions: ["festive", "return"],
    featured: false, bulkEligible: true, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-230", sku: "NVR-230", slug: "mother-of-pearl-box",
    name: "Mother-of-Pearl Keepsake Box",
    description: "A square silver-plated box with mother-of-pearl inlay — for jewellery, keepsakes and elegant gifting.",
    image: P("p15-x301.jpg"), images: [P("p15-x301.jpg")],
    collections: ["statement-decor", "thoughtful-gifting"], occasions: ["weddings", "return", "corporate"],
    featured: false, bulkEligible: true, placeholder: false, isNew: false, isBestseller: false,
  },

  /* ── AUSPICIOUS LIVING ── */
  {
    id: "nvr-231", sku: "NVR-231", slug: "cow-and-calf-idol",
    name: "Cow & Calf Idol",
    description: "A silver-plated cow with her calf on a wooden base — a symbol of nourishment and abundance, offered in silver and gold-tone finishes.",
    image: P("p17-x325.jpg"), images: [P("p17-x325.jpg"), P("p18-x332.jpg"), P("p16-x310.jpg")],
    collections: ["auspicious-living"], occasions: ["housewarming", "festive"],
    featured: true, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-232", sku: "NVR-232", slug: "auspicious-turtle-pair",
    name: "Auspicious Turtle Pair",
    description: "Two silver-plated turtles with textured shells — traditionally associated with stability and long-lasting fortune.",
    image: P("p17-x320.jpg"), images: [P("p17-x320.jpg")],
    collections: ["auspicious-living"], occasions: ["housewarming", "return"],
    featured: false, bulkEligible: true, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-233", sku: "NVR-233", slug: "ornate-planter",
    name: "Ornate Planter",
    description: "A silver-plated planter with carved detailing, styled here with greenery — for plants, flowers or as a standalone bowl.",
    image: P("p17-x323.jpg"), images: [P("p17-x323.jpg")],
    collections: ["auspicious-living", "statement-decor"], occasions: ["decor", "housewarming", "corporate"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-234", sku: "NVR-234", slug: "vishnu-idol-on-base",
    name: "Vishnu Idol on Base",
    description: "A silver-plated Vishnu idol with detailed finishing on a dark base — quiet devotion for everyday spaces.",
    image: P("p17-x329.jpg"), images: [P("p17-x329.jpg")],
    collections: ["auspicious-living", "sacred-elegance"], occasions: ["festive", "housewarming"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-235", sku: "NVR-235", slug: "fish-sculpture",
    name: "Fish Sculpture",
    description: "A silver-plated fish sculpture — a symbol of abundance and flow, styled beautifully on consoles and cabinets.",
    image: P("p18-x342.jpg"), images: [P("p18-x342.jpg")],
    collections: ["auspicious-living"], occasions: ["decor", "housewarming"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-236", sku: "NVR-236", slug: "elephant-pair-on-tray",
    name: "Elephant Pair on Tray",
    description: "Ornate carved elephants presented together on a tray — an auspicious, gift-ready statement for entryways.",
    image: P("p18-x344.jpg"), images: [P("p18-x344.jpg")],
    collections: ["auspicious-living", "thoughtful-gifting"], occasions: ["decor", "housewarming", "weddings"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-237", sku: "NVR-237", slug: "ornate-urli-tray",
    name: "Ornate Urli Tray",
    description: "A silver-plated tray with a central bowl depression — for flowers, floating blooms or festive styling.",
    image: P("p18-x340.jpg"), images: [P("p18-x340.jpg")],
    collections: ["auspicious-living", "statement-decor"], occasions: ["decor", "festive", "housewarming"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-238", sku: "NVR-238", slug: "tiered-conical-accent",
    name: "Tiered Conical Accent",
    description: "A tiered silver-plated piece with a conical top — a sculptural accent with a strong sense of craft.",
    image: P("p17-x318.jpg"), images: [P("p17-x318.jpg")],
    collections: ["auspicious-living"], occasions: ["decor", "festive", "return"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },

  /* ── DIVINE GRACE ── */
  {
    id: "nvr-239", sku: "NVR-239", slug: "lakshmi-on-lotus",
    name: "Lakshmi on Lotus",
    description: "A silver-plated Lakshmi seated on the lotus, finished with colourful adornments — grace and abundance for the pooja shelf.",
    image: P("p19-x356.jpg"), images: [P("p19-x356.jpg")],
    collections: ["divine-grace", "sacred-elegance"], occasions: ["festive", "weddings"],
    featured: true, bulkEligible: false, placeholder: false, isNew: false, isBestseller: true,
  },
  {
    id: "nvr-240", sku: "NVR-240", slug: "rama-darbar-idol-set",
    name: "Rama Darbar Idol Set",
    description: "A silver-plated set of Rama, Sita and Lakshmana on a wooden base — a dignified devotional group for the home shrine.",
    image: P("p20-x363.jpg"), images: [P("p20-x363.jpg")],
    collections: ["divine-grace"], occasions: ["festive", "weddings", "housewarming"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-241", sku: "NVR-241", slug: "four-seated-deities",
    name: "Four Seated Deities Set",
    description: "A set of four silver-plated seated deities, styled with lanterns — a coordinated devotional arrangement with presence.",
    image: P("p20-x365.jpg"), images: [P("p20-x365.jpg")],
    contain: true, // very wide photo (2.78) — card shows the full set over a blurred self-fill
    collections: ["divine-grace"], occasions: ["festive", "housewarming"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-242", sku: "NVR-242", slug: "bal-krishna-with-pot",
    name: "Bal Krishna with Pot",
    description: "A silver-plated Bal Krishna holding his pot of butter — playful, endearing and made for gifting.",
    image: P("p20-x367.jpg"), images: [P("p20-x367.jpg")],
    collections: ["divine-grace", "thoughtful-gifting"], occasions: ["festive", "return"],
    featured: false, bulkEligible: true, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-243", sku: "NVR-243", slug: "ganesha-idol-divine-grace",
    name: "Ganesha Idol — Divine Grace",
    description: "A silver-plated Ganesha with gentle colour accents on the pedestal — a warm blessing for new homes and new beginnings.",
    image: P("p20-x369.jpg"), images: [P("p20-x369.jpg"), P("p21-x375.jpg")],
    collections: ["divine-grace", "sacred-elegance"], occasions: ["weddings", "festive", "housewarming"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-244", sku: "NVR-244", slug: "ganesha-on-ornate-platform",
    name: "Ganesha on Ornate Platform",
    description: "A silver-plated Ganesha seated on a detailed platform — a devotional piece with a strong sense of craftsmanship.",
    image: P("p22-x384.jpg"), images: [P("p22-x384.jpg"), P("p22-x386.jpg")],
    collections: ["divine-grace"], occasions: ["weddings", "festive", "housewarming"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-245", sku: "NVR-245", slug: "standing-krishna-with-flute",
    name: "Standing Krishna with Flute",
    description: "A silver-plated Krishna standing with his flute on a patterned base — serene presence for pooja corners and consoles.",
    image: P("p22-x388.jpg"), images: [P("p22-x388.jpg")],
    collections: ["divine-grace", "sacred-elegance"], occasions: ["festive", "housewarming"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-246", sku: "NVR-246", slug: "lakshmi-vishnu-seated-pair",
    name: "Lakshmi-Vishnu Seated Pair",
    description: "A silver-plated Lakshmi and Vishnu seated together — a blessed pairing for weddings, anniversaries and the family shrine.",
    image: P("p21-x375.jpg"), images: [P("p21-x375.jpg")], // x373.jpg was never extracted (bad xref in source PDF) — using the pair photo from the same styled set; name/description needs owner verification
    collections: ["divine-grace"], occasions: ["weddings", "festive"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-247", sku: "NVR-247", slug: "venkateswara-archway-idol",
    name: "Venkateswara Archway Idol",
    description: "A silver-plated standing deity within an ornate archway — a striking devotional piece that anchors any pooja space.",
    image: P("p21-x378.jpg"), images: [P("p21-x378.jpg"), P("p23-x393.jpg"), P("p23-x395.jpg")],
    collections: ["divine-grace", "sacred-elegance"], occasions: ["weddings", "festive", "housewarming"],
    featured: true, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-248", sku: "NVR-248", slug: "meditating-shiva",
    name: "Meditating Shiva",
    description: "A silver-plated Shiva seated in meditation with his trident — calm, powerful presence for quiet corners.",
    image: P("p21-x372.jpg"), images: [P("p21-x372.jpg")],
    collections: ["divine-grace"], occasions: ["festive", "housewarming"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },

  /* ── THOUGHTFUL GIFTING ── */
  {
    id: "nvr-249", sku: "NVR-249", slug: "peacock-urli-bowl",
    name: "Peacock Urli Bowl",
    description: "A silver-plated urli bowl with a peacock figurine and blue accents — for floating flowers and festive styling.",
    image: P("p24-x402.jpg"), images: [P("p24-x402.jpg")],
    collections: ["thoughtful-gifting", "statement-decor"], occasions: ["decor", "weddings", "festive", "housewarming"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-250", sku: "NVR-250", slug: "peacock-finial-box",
    name: "Peacock Finial Box",
    description: "A silver-plated decorative box crowned with a peacock finial — dry fruits, trinkets or a gift that keeps giving.",
    image: P("p25-x410.jpg"), images: [P("p25-x410.jpg")],
    collections: ["thoughtful-gifting"], occasions: ["weddings", "return", "festive", "corporate"],
    featured: false, bulkEligible: true, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-251", sku: "NVR-251", slug: "peacock-centrepiece-bowl",
    name: "Peacock Centrepiece Bowl",
    description: "A silver-plated bowl with a central peacock and vibrant feather detailing — the centrepiece that starts conversations.",
    image: P("p25-x412.jpg"), images: [P("p25-x412.jpg"), P("p26-x423.jpg")],
    collections: ["thoughtful-gifting", "statement-decor"], occasions: ["decor", "weddings", "festive"],
    featured: true, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-252", sku: "NVR-252", slug: "swan-serving-dish",
    name: "Swan Serving Dish",
    description: "A twin-swan serving dish with soft blue enamelling — for sweets at celebrations and style at dinner tables.",
    image: P("p25-x414.jpg"), images: [P("p25-x414.jpg"), P("p26-x428.jpg")],
    collections: ["thoughtful-gifting", "statement-decor"], occasions: ["decor", "weddings", "housewarming"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-253", sku: "NVR-253", slug: "ivory-keepsake-box",
    name: "Ivory Keepsake Box",
    description: "An ivory-toned ornate box with silver detailing — for jewellery and small treasures, and a graceful return gift.",
    image: P("p25-x416.jpg"), images: [P("p25-x416.jpg")],
    collections: ["thoughtful-gifting"], occasions: ["weddings", "return"],
    featured: false, bulkEligible: true, placeholder: false, isNew: false, isBestseller: true,
  },
  {
    id: "nvr-254", sku: "NVR-254", slug: "floral-elephant-pair",
    name: "Floral Elephant Pair",
    description: "A pair of stylized silver-plated elephants with floral patterns — auspicious gifting with a soft, modern finish.",
    image: P("p26-x419.jpg"), images: [P("p26-x419.jpg")],
    collections: ["thoughtful-gifting", "auspicious-living"], occasions: ["decor", "weddings", "housewarming", "return"],
    featured: false, bulkEligible: true, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-255", sku: "NVR-255", slug: "vintage-car-keepsake-box",
    name: "Vintage Car Keepsake Box",
    description: "A silver-plated box shaped like a vintage car with carved detailing — a playful, memorable gift for the person who has everything.",
    image: P("p26-x421.jpg"), images: [P("p26-x421.jpg")],
    collections: ["thoughtful-gifting"], occasions: ["return", "corporate"],
    featured: false, bulkEligible: true, placeholder: false, isNew: true, isBestseller: false,
  },
  {
    id: "nvr-256", sku: "NVR-256", slug: "owl-on-coin-stack",
    name: "Owl on Coin Stack",
    description: "A silver-plated owl perched on a stack of coins, presented in a glass case — wealth symbolism with a collector's feel.",
    image: P("p26-x426.jpg"), images: [P("p26-x426.jpg")],
    collections: ["thoughtful-gifting", "auspicious-living"], occasions: ["housewarming", "return", "corporate"],
    featured: false, bulkEligible: false, placeholder: false, isNew: true, isBestseller: false,
  },
  {
    id: "nvr-257", sku: "NVR-257", slug: "floating-candle-urli-tray",
    name: "Floating Candle Urli Tray",
    description: "A silver-plated tray with floral motifs, styled with flowers and floating candles — instant festive warmth for any table.",
    image: P("p27-x432.jpg"), images: [P("p27-x432.jpg")],
    collections: ["thoughtful-gifting", "auspicious-living"], occasions: ["festive", "weddings", "return"],
    featured: false, bulkEligible: true, placeholder: false, isNew: false, isBestseller: false,
  },
  {
    id: "nvr-258", sku: "NVR-258", slug: "ornate-diya",
    name: "Ornate Diya",
    description: "An ornate silver-plated diya with floral patterns — the piece that lights up festivals, poojas and gifting lists.",
    image: P("p27-x435.jpg"), images: [P("p27-x435.jpg")],
    collections: ["thoughtful-gifting", "sacred-elegance"], occasions: ["festive", "return"],
    featured: false, bulkEligible: true, placeholder: false, isNew: false, isBestseller: true,
  },
  {
    id: "nvr-259", sku: "NVR-259", slug: "elephant-motif-clock",
    name: "Elephant Motif Clock",
    description: "A silver-plated clock with elephant and floral motifs — function and auspicious symbolism in one keepsake.",
    image: P("p27-x443.jpg"), images: [P("p27-x443.jpg")],
    collections: ["thoughtful-gifting", "statement-decor"], occasions: ["housewarming", "weddings"],
    featured: false, bulkEligible: false, placeholder: false, isNew: false, isBestseller: false,
  },
];

export const JOURNAL = [
  {
    slug: "a-quieter-way-to-choose-a-wedding-gift",
    title: "A Quieter Way to Choose a Wedding Gift",
    excerpt:
      "The most-remembered wedding gifts are rarely the loudest ones. A short guide to choosing pieces that outlast the celebration.",
    image: P("p07-x173.jpg"),
    draft: true,
    readingTime: "4 min read",
    body: [
      "Between the guest lists and the buffet menus, wedding gifting often becomes a race — to be generous, visible, different. But ask anyone who has kept a gift for twenty years, and it is almost never the biggest box. It is the one that turned up in their everyday life: a pooja piece used every morning, a pair of accents that moved house with them.",
      "A quieter approach starts with the couple's home rather than the wedding itself. Silver-plated pieces work well here — they sit with most palettes, they photograph well, and they carry the sense of occasion without demanding a shrine of their own.",
      "When you shortlist, choose one thing you would keep yourself. If the answer is yes, it will probably be kept too.",
    ],
  },
  {
    slug: "caring-for-silver-plated-decor",
    title: "Caring for Silver-Plated Décor at Home",
    excerpt:
      "A simple, honest routine to keep plated and coated décor looking its best — no special products required.",
    image: P("p10-x223.jpg"),
    draft: true,
    readingTime: "3 min read",
    body: [
      "Plated and coated décor asks for very little. A soft, dry cloth after dusting is enough for routine care; avoid abrasive scrubs, harsh chemicals and long soaks, which can dull any plated surface over time.",
      "Display pieces away from direct humidity — bathrooms and window ledges with condensation are harder on finishes than a shielded console or pooja shelf.",
      "For detailed pieces, a soft brush reaches what cloth cannot. That is the whole routine: dry, gentle, regular.",
    ],
  },
  {
    slug: "styling-showpieces-without-the-clutter",
    title: "Styling Showpieces Without the Clutter",
    excerpt:
      "Three rules from editorial interiors: breathe, group, and let one piece lead.",
    image: P("p10-x232.jpg"),
    draft: true,
    readingTime: "3 min read",
    body: [
      "A console styled well is mostly empty space. The eye needs somewhere to rest, so start by giving each piece room — a hand's width between objects changes everything.",
      "Group in odd numbers and vary heights: a tall vase, a mid-sized showpiece, something flat like a frame or tray. One silver-plated piece is enough to lead a shelf; three becomes a collection.",
      "Finally, style for the room you live in, not the photograph. If it annoys you to dust it, it is in the wrong place.",
    ],
  },
  {
    slug: "housewarming-gifts-that-feel-personal",
    title: "Housewarming Gifts That Feel Personal",
    excerpt:
      "Moving in is chaotic. The best housewarming gifts meet people exactly where they are.",
    image: P("p17-x323.jpg"),
    draft: true,
    readingTime: "3 min read",
    body: [
      "A new home is usually a construction site of cartons when the first guests arrive. Gifts that need to be used immediately — the elaborate, the perishable, the very large — add to the pile.",
      "The gifts that land are the ones with a place ready for them: an accent for the entry console, an idol for the pooja shelf, a bowl that goes to work on day one.",
      "Add a line in the card about where you imagined it would sit. That single sentence is what turns an object into a gift.",
    ],
  },
];

/* ── Honest FAQs (visible on /faqs; no policy commitments) ── */
export const FAQS = [
  ["How do I enquire about a piece?", "Open any product and use the Enquire on WhatsApp button — your message will include the product name and SKU automatically. You can also DM @nivoram.shop on Instagram or send the general enquiry form, and we'll respond on the details you leave."],
  ["Are the pieces solid silver?", "No — Nivoram specialises in 999 silver-plated and gold & silver-coated décor, never solid silver. We never describe a plated piece as solid silver. Per-piece material and finish details are confirmed during your enquiry."],
  ["What are the delivery timelines?", "Delivery timelines are confirmed for every enquiry and quote before you commit — we don't publish blanket delivery promises."],
  ["Is customisation available?", "Customisation varies from piece to piece and isn't confirmed across the catalogue. Share your requirement and we'll confirm exactly what's possible for the pieces you like."],
  ["Do you accept bulk or corporate orders?", "Yes. Share the occasion, approximate quantity and budget on the Corporate Gifting page and we'll respond with a curated shortlist and a tailored quote."],
  ["Which regions do you serve?", "Enquiries from India and the UAE are welcome. Availability and shipping options for your location are confirmed during your enquiry."],
  ["Why do some details say 'On request'?", "We publish only verified product details. Specifications, dimensions and prices appear once confirmed by the studio — until then they're shown as on request rather than guessed."],
];

/* ── Helpers ── */
export const getCollectionsFor = (keys) =>
  COLLECTIONS.filter((c) => keys.includes(c.slug));
export const getProduct = (slug) => PRODUCTS.find((pr) => pr.slug === slug);
export const getCollection = (slug) => COLLECTIONS.find((c) => c.slug === slug);
export const productsInCollection = (slug) =>
  PRODUCTS.filter((pr) => pr.collections.includes(slug));
export const productsForOccasion = (key) =>
  PRODUCTS.filter((pr) => pr.occasions.includes(key));
export const newArrivals = () => PRODUCTS.filter((pr) => pr.isNew);
export const bestsellers = () => PRODUCTS.filter((pr) => pr.isBestseller);
export const getArticle = (slug) => JOURNAL.find((a) => a.slug === slug);
export const getGiftOccasion = (key) => GIFT_OCCASIONS.find((o) => o.key === key);