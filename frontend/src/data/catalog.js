/**
 * NIVORAM — centralised catalogue.
 *
 * HOW TO UPDATE (handover):
 *  - Add/edit products in PRODUCTS below. `image`/`images` take full URLs.
 *  - Leave material/dimensions/price etc. as null until the business
 *    verifies the data — the UI renders "On request" placeholders.
 *  - placeholder: true renders the "Sample listing" honesty chip. Set to
 *    false once real studio photography + verified copy replace it.
 *  - isNew / isBestseller: flip to true ONLY when the studio explicitly
 *    confirms a piece's status — the Shop menu pages read these flags and
 *    no label is shown while they are false.
 *  - Collections live in COLLECTIONS (six curated edits); products may
 *    belong to several. Occasion tags (weddings, housewarming, festive,
 *    return, corporate) power the Gifting pages.
 */

const u = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const p = (id, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const IMAGES = {
  hero: u("1771249729624-3c7dea2f7953", 1600),
  heroAlt: "Ornate silver-tone showpiece with woven detailing on cream",
  storyRoom: p(34688219),
  styling: u("1774364830987-d18b6b063ab7"),
  sideboard: u("1767963758785-b9def36c13e3"),
  console: u("1655657874630-2da5679ef515"),
  sculpture: u("1581280725150-0af01222610e"),
  shapes: u("1604782206219-3b9576575203"),
  corporateBox: u("1780744871777-fec13139d281"),
  ganeshaDecor: u("1563777389189-5e3564e5961c"),
  temple: u("1778394859366-7208a5c95c16"),
  giftRibbon: u("1625552186152-668cd2f0b707"),
  giftFloral: u("1592903297149-37fb25202dfa"),
  giftMono: u("1674620213535-9b2a2553ef40"),
  weddingAccessories: p(32096880),
  silverBoxes: p(36355530),
  diyas: p(10182772),
  diyasColor: p(3135229),
  vasesPair: u("1677761640321-b80251be00ca"),
  vasesClay: u("1631125915902-d8abe9225ff2"),
  compote: u("1509511715017-077da45196ff"),
};

/* ── Curated collections (navigation: Collections dropdown) ── */
export const COLLECTIONS = [
  {
    slug: "sacred-elegance",
    name: "Sacred Elegance",
    short: "Silver-tone idols and pooja accents for quiet devotion.",
    description:
      "Idols, thalis and accents finished in silver tone — chosen for daily rituals, festive mornings and thoughtful offerings. Each piece is meant to sit comfortably in a modern Indian home without losing its sanctity.",
    image: IMAGES.ganeshaDecor,
    alt: "Spiritual décor in a warm home shrine setting",
  },
  {
    slug: "statement-decor",
    name: "Statement Décor",
    short: "Sculptural pieces that anchor a room, quietly.",
    description:
      "Vases, candelabra and sculptural showpieces with a silver-tone finish — designed to hold a console, mantel or entryway on their own, no styling fuss required.",
    image: IMAGES.hero,
    alt: "Ornate silver-tone statement showpiece",
  },
  {
    slug: "timeless-accents",
    name: "Timeless Accents",
    short: "Table accents and centrepieces, finished to keep.",
    description:
      "Compotes, bowls and serving accents with a silver-tone finish — the kind of table pieces that move from festival to festival and stay in the family.",
    image: IMAGES.compote,
    alt: "Silver-tone pedestal compote bowl",
  },
  {
    slug: "frames-keepsakes",
    name: "Frames & Keepsakes",
    short: "For photographs, trinkets and small treasures.",
    description:
      "Ornate frames and silver-tone keepsake boxes — gifts that hold something personal, made to sit on dressers, desks and shrine shelves for years.",
    image: IMAGES.silverBoxes,
    alt: "Stack of ornate silver-tone keepsake boxes",
  },
  {
    slug: "auspicious-living",
    name: "Auspicious Living",
    short: "Meaningful accents for everyday spaces.",
    description:
      "Elephants, bowls and accents drawn from familiar auspicious motifs — restyled in a contemporary silver tone for homes where tradition lives alongside modern interiors.",
    image: IMAGES.sideboard,
    alt: "Styled sideboard with auspicious accents in a modern home",
  },
  {
    slug: "thoughtful-gifting",
    name: "Thoughtful Gifting",
    short: "Pieces chosen for the person, not the occasion.",
    description:
      "Our gifting edit brings together pieces that feel personal and considered — for hosts, mentors, new homes and friendships that deserve more than a generic box.",
    image: IMAGES.giftRibbon,
    alt: "Elegantly wrapped gift boxes",
  },
];

/* ── Occasion-led gifting pages (navigation: Gifting dropdown) ── */
export const GIFT_OCCASIONS = [
  {
    key: "weddings",
    label: "Wedding Gifts",
    page: "/gifts/weddings",
    image: IMAGES.weddingAccessories,
    blurb:
      "For weddings, anniversaries and the milestones around them — silver-tone keepsakes, pooja sets and table accents made to be kept, used and remembered.",
  },
  {
    key: "housewarming",
    label: "Housewarming Gifts",
    page: "/gifts/housewarming",
    image: IMAGES.styling,
    blurb:
      "Moving in is chaotic — the best housewarming gifts already have a place ready for them. Accents, idols and bowls that go to work on day one.",
  },
  {
    key: "festive",
    label: "Festive Gifts",
    page: "/gifts/festive",
    image: IMAGES.diyas,
    blurb:
      "For the festivals that bring everyone home — Diwali and celebration gifting with a warm, restrained sense of occasion.",
  },
  {
    key: "return",
    label: "Return Gifts",
    page: "/gifts/return",
    image: IMAGES.giftFloral,
    blurb:
      "Considered favours for guests and gatherings — small pieces that say thank you beautifully, whether for ten guests or a hundred.",
  },
];

/* Home occasion strip = four gifting pages + corporate page */
export const OCCASIONS = [
  { key: "weddings", label: "Weddings & Anniversaries", page: "/gifts/weddings", image: IMAGES.weddingAccessories },
  { key: "housewarming", label: "Housewarming", page: "/gifts/housewarming", image: IMAGES.styling },
  { key: "festive", label: "Festive Celebrations", page: "/gifts/festive", image: IMAGES.diyasColor },
  { key: "return", label: "Return Gifts", page: "/gifts/return", image: IMAGES.giftFloral },
  { key: "corporate", label: "Corporate Gifting", page: "/corporate-gifting", image: IMAGES.corporateBox },
];

export const OCCASION_LABELS = {
  weddings: "Weddings",
  housewarming: "Housewarming",
  festive: "Festive",
  return: "Return gifts",
  corporate: "Corporate",
};

/* ── Products ── */
export const PRODUCTS = [
  {
    id: "nvr-101",
    sku: "NVR-101",
    slug: "silver-tone-ganesha-idol",
    name: "Silver-Tone Ganesha Idol",
    description:
      "A silver-tone Ganesha idol with fine detailing — sized for a pooja shelf, console or study table. A considered gift for griha pravesh, festivals and new beginnings.",
    image: u("1726092972512-7900b8e4bca4"),
    images: [u("1726092972512-7900b8e4bca4"), "https://images.unsplash.com/flagged/photo-1573894156182-8df0f4bc5764?auto=format&fit=crop&w=1200&q=80"],
    collections: ["sacred-elegance", "thoughtful-gifting"],
    occasions: ["festive", "housewarming", "return"],
    featured: true,
    bulkEligible: true,
    placeholder: true,
    isNew: false,
    isBestseller: false,
  },
  {
    id: "nvr-102",
    sku: "NVR-102",
    slug: "ornate-silver-puja-thali",
    name: "Ornate Silver-Tone Puja Thali",
    description:
      "A silver-tone pooja plate with raised detailing — for aarti, festive mornings and wedding rituals. Presented in protective packaging suitable for gifting.",
    image: u("1731345356052-fa162523666d"),
    images: [u("1731345356052-fa162523666d"), u("1717409047809-d9e66fc0f172")],
    collections: ["sacred-elegance", "timeless-accents"],
    occasions: ["weddings", "festive"],
    featured: false,
    bulkEligible: true,
    placeholder: true,
    isNew: false,
    isBestseller: false,
  },
  {
    id: "nvr-103",
    sku: "NVR-103",
    slug: "dashboard-ganesha",
    name: "Compact Ganesha for the Dashboard",
    description:
      "A compact silver-tone Ganesha made for car dashboards — a small, thoughtful gift that travels with the person.",
    image: p(5254655),
    images: [p(5254655)],
    collections: ["sacred-elegance", "thoughtful-gifting"],
    occasions: ["return", "corporate"],
    featured: false,
    bulkEligible: true,
    placeholder: true,
    isNew: false,
    isBestseller: false,
  },
  {
    id: "nvr-104",
    sku: "NVR-104",
    slug: "silver-plated-candelabra",
    name: "Silver-Tone Candelabra",
    description:
      "A five-arm candelabra with a silver-tone finish — a dining table or mantel centrepiece for celebrations and quiet evenings alike.",
    image: u("1672518194432-4c23cbcec1c4"),
    images: [u("1672518194432-4c23cbcec1c4"), u("1783148609207-e19bf1db5f53")],
    collections: ["statement-decor", "timeless-accents"],
    occasions: ["weddings", "housewarming", "festive"],
    featured: true,
    bulkEligible: false,
    placeholder: true,
    isNew: false,
    isBestseller: false,
  },
  {
    id: "nvr-105",
    sku: "NVR-105",
    slug: "sculptural-vase",
    name: "Sculptural Silver-Tone Vase",
    description:
      "A rounded, sculptural vase with a soft metallic finish — strong enough to stand alone, quiet enough to hold a single stem.",
    image: u("1643569556871-91ec60671ed7"),
    images: [u("1643569556871-91ec60671ed7"), u("1612196808214-b8e1d6145a8c")],
    collections: ["statement-decor"],
    occasions: ["housewarming", "weddings"],
    featured: true,
    bulkEligible: false,
    placeholder: true,
    isNew: false,
    isBestseller: false,
  },
  {
    id: "nvr-106",
    sku: "NVR-106",
    slug: "pedestal-compote-bowl",
    name: "Pedestal Compote Bowl",
    description:
      "A silver-tone pedestal bowl in the classical compote form — for dry fruits at festivals, flowers on a console, or simply as a sculptural object.",
    image: u("1509511715017-077da45196ff"),
    images: [u("1509511715017-077da45196ff")],
    collections: ["timeless-accents", "statement-decor"],
    occasions: ["weddings", "festive", "housewarming"],
    featured: false,
    bulkEligible: true,
    placeholder: true,
    isNew: false,
    isBestseller: false,
  },
  {
    id: "nvr-107",
    sku: "NVR-107",
    slug: "silver-tone-elephant-pair",
    name: "Silver-Tone Elephant Pair",
    description:
      "A pair of silver-tone elephants with intricate embossed detailing — an auspicious addition to entryways and living spaces, and a classic housewarming gift.",
    image: u("1720798198081-07d2e6b91b22"),
    images: [u("1720798198081-07d2e6b91b22"), u("1640550869970-8eb897eb57ae")],
    collections: ["auspicious-living", "thoughtful-gifting"],
    occasions: ["housewarming", "weddings"],
    featured: true,
    bulkEligible: false,
    placeholder: true,
    isNew: false,
    isBestseller: false,
  },
  {
    id: "nvr-108",
    sku: "NVR-108",
    slug: "ornate-frame",
    name: "Ornate Silver-Tone Frame",
    description:
      "A silver-tone picture frame with ornate relief work — for photographs that deserve more than a metal clip on a wall.",
    image: u("1765137102463-95933b20b481"),
    images: [u("1765137102463-95933b20b481"), u("1686504244155-77dc3dc2d2c2")],
    collections: ["frames-keepsakes"],
    occasions: ["housewarming", "weddings"],
    featured: false,
    bulkEligible: false,
    placeholder: true,
    isNew: false,
    isBestseller: false,
  },
  {
    id: "nvr-109",
    sku: "NVR-109",
    slug: "figural-compote-centrepiece",
    name: "Figural Compote Centrepiece",
    description:
      "A fluted silver-tone compote with a figural detail — a conversation piece for festive tables and a natural fit for occasion gifting.",
    image: u("1717409047809-d9e66fc0f172"),
    images: [u("1717409047809-d9e66fc0f172")],
    collections: ["timeless-accents", "statement-decor"],
    occasions: ["festive", "weddings"],
    featured: false,
    bulkEligible: true,
    placeholder: true,
    isNew: false,
    isBestseller: false,
  },
  {
    id: "nvr-110",
    sku: "NVR-110",
    slug: "incense-burner",
    name: "Silver-Tone Incense Burner",
    description:
      "An incense burner with embossed detailing and a stable base — for daily rituals and festive evenings.",
    image: u("1703648314239-8eba281beeb4"),
    images: [u("1703648314239-8eba281beeb4")],
    collections: ["sacred-elegance", "auspicious-living"],
    occasions: ["festive", "housewarming", "return"],
    featured: false,
    bulkEligible: false,
    placeholder: true,
    isNew: false,
    isBestseller: false,
  },
  {
    id: "nvr-111",
    sku: "NVR-111",
    slug: "keepsake-gift-boxes",
    name: "Ornate Keepsake Boxes, Set of Six",
    description:
      "A set of six small silver-tone keepsake boxes with embossed lids — for wedding hampers, return gifts and festive favours at scale.",
    image: p(36355530),
    images: [p(36355530)],
    collections: ["frames-keepsakes", "thoughtful-gifting"],
    occasions: ["weddings", "return", "corporate", "festive"],
    featured: true,
    bulkEligible: true,
    placeholder: true,
    isNew: false,
    isBestseller: false,
  },
  {
    id: "nvr-112",
    sku: "NVR-112",
    slug: "twin-candle-holders",
    name: "Twin Glass Candle Holders",
    description:
      "A pair of clear candle holders with a silver-tone base — soft light for dinner tables, festive corners and gifting lists.",
    image: u("1631521785964-7ed26b416ed7"),
    images: [u("1631521785964-7ed26b416ed7")],
    collections: ["statement-decor", "thoughtful-gifting"],
    occasions: ["festive", "housewarming", "return"],
    featured: true,
    bulkEligible: false,
    placeholder: true,
    isNew: false,
    isBestseller: false,
  },
  {
    id: "nvr-113",
    sku: "NVR-113",
    slug: "dark-tone-candelabra",
    name: "Dark-Tone Candelabra",
    description:
      "A smaller candelabra in a deeper finish with an ivory candle — moody, editorial, and at home on a study desk or bookshelf.",
    image: u("1783148609207-e19bf1db5f53"),
    images: [u("1783148609207-e19bf1db5f53")],
    collections: ["statement-decor", "frames-keepsakes"],
    occasions: ["festive", "housewarming"],
    featured: false,
    bulkEligible: false,
    placeholder: true,
    isNew: false,
    isBestseller: false,
  },
  {
    id: "nvr-114",
    sku: "NVR-114",
    slug: "gemstone-sculpture-bowl",
    name: "Sculpture Bowl with Gemstone Detail",
    description:
      "A low silver-tone bowl holding a circular sculpture with gemstone accents — a desk object, a centrepiece, a gift that reads as design.",
    image: u("1786310146664-3c19248bb6e0"),
    images: [u("1786310146664-3c19248bb6e0")],
    collections: ["auspicious-living", "timeless-accents"],
    occasions: ["housewarming", "corporate", "return"],
    featured: false,
    bulkEligible: true,
    placeholder: true,
    isNew: false,
    isBestseller: false,
  },
];

export const JOURNAL = [
  {
    slug: "a-quieter-way-to-choose-a-wedding-gift",
    title: "A Quieter Way to Choose a Wedding Gift",
    excerpt:
      "The most-remembered wedding gifts are rarely the loudest ones. A short guide to choosing pieces that outlast the celebration.",
    image: IMAGES.silverBoxes,
    draft: true,
    readingTime: "4 min read",
    body: [
      "Between the guest lists and the buffet menus, wedding gifting often becomes a race — to be generous, visible, different. But ask anyone who has kept a gift for twenty years, and it is almost never the biggest box. It is the one that turned up in their everyday life: a pooja plate used every morning, a pair of accents that moved house with them.",
      "A quieter approach starts with the couple's home rather than the wedding itself. Silver-tone pieces work well here — they sit with most palettes, they photograph well, and they carry the sense of occasion without demanding a shrine of their own.",
      "When you shortlist, choose one thing you would keep yourself. If the answer is yes, it will probably be kept too.",
    ],
  },
  {
    slug: "caring-for-silver-tone-decor",
    title: "Caring for Silver-Tone Décor at Home",
    excerpt:
      "A simple, honest routine to keep finished décor looking its best — no special products required.",
    image: IMAGES.hero,
    draft: true,
    readingTime: "3 min read",
    body: [
      "Finished décor asks for very little. A soft, dry cloth after dusting is enough for routine care; avoid abrasive scrubs, harsh chemicals and long soaks, which can dull any coated surface over time.",
      "Display pieces away from direct humidity — bathrooms and window ledges with condensation are harder on finishes than a shielded console or pooja shelf.",
      "For detailed pieces, a soft brush reaches what cloth cannot. That is the whole routine: dry, gentle, regular.",
    ],
  },
  {
    slug: "styling-showpieces-without-the-clutter",
    title: "Styling Showpieces Without the Clutter",
    excerpt:
      "Three rules from editorial interiors: breathe, group, and let one piece lead.",
    image: IMAGES.styling,
    draft: true,
    readingTime: "3 min read",
    body: [
      "A console styled well is mostly empty space. The eye needs somewhere to rest, so start by giving each piece room — a hand's width between objects changes everything.",
      "Group in odd numbers and vary heights: a tall vase, a mid-sized showpiece, something flat like a frame or tray. One silver-tone piece is enough to lead a shelf; three becomes a collection.",
      "Finally, style for the room you live in, not the photograph. If it annoys you to dust it, it is in the wrong place.",
    ],
  },
  {
    slug: "housewarming-gifts-that-feel-personal",
    title: "Housewarming Gifts That Feel Personal",
    excerpt:
      "Moving in is chaotic. The best housewarming gifts meet people exactly where they are.",
    image: IMAGES.sideboard,
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
  ["How do I enquire about a piece?", "Open any product and use the Enquire on WhatsApp button — your message will include the product name and SKU automatically. You can also send the general enquiry form and we'll respond on the details you leave."],
  ["Are the pieces solid silver?", "Nivoram specialises in silver-coated (silver-tone) décor. Each product's exact material and finish are confirmed on the product page where verified, or during your enquiry. We never describe a coated piece as solid silver."],
  ["What are the delivery timelines?", "Delivery timelines are confirmed for every enquiry and quote before you commit — we don't publish blanket delivery promises."],
  ["Is customisation available?", "Customisation varies from piece to piece and isn't confirmed across the catalogue. Share your requirement and we'll confirm exactly what's possible for the pieces you like."],
  ["Do you accept bulk or corporate orders?", "Yes. Share the occasion, approximate quantity and budget on the Corporate Gifting page and we'll respond with a curated shortlist and a tailored quote."],
  ["Which regions do you serve?", "Enquiries from India and the UAE are welcome. Availability and shipping options for your location are confirmed during your enquiry."],
  ["Why do some listings say 'On request'?", "We publish only verified product details. Specifications, dimensions and prices appear once confirmed by the studio — until then they're shown as on request rather than guessed."],
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