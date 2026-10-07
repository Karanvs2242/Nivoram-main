/**
 * NIVORAM — centralised catalogue.
 *
 * HOW TO UPDATE (handover):
 *  - Add/edit products in PRODUCTS below. `image`/`images` take full URLs.
 *  - Leave material/dimensions/price etc. as null until the business
 *    verifies the data — the UI renders "On request" placeholders.
 *  - placeholder: true renders the "Sample listing" honesty chip. Set to
 *    false once real studio photography + verified copy replace it.
 *  - Collections live in COLLECTIONS; products may belong to several.
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
};

export const COLLECTIONS = [
  {
    slug: "spiritual-pooja-decor",
    name: "Spiritual & Pooja Décor",
    short: "Silver-tone idols and pooja accents for quiet devotion.",
    description:
      "Idols, thalis and accents finished in silver tone — chosen for daily rituals, festive mornings and thoughtful offerings. Each piece is meant to sit comfortably in a modern Indian home without losing its sanctity.",
    image: IMAGES.ganeshaDecor,
    alt: "Spiritual décor in a warm home shrine setting",
  },
  {
    slug: "statement-home-decor",
    name: "Statement Home Décor",
    short: "Sculptural pieces that anchor a room, quietly.",
    description:
      "Vases, candelabra and sculptural showpieces with a silver-tone finish — designed to hold a console, mantel or entryway on their own, no styling fuss required.",
    image: IMAGES.hero,
    alt: "Ornate silver-tone statement showpiece",
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
  {
    slug: "wedding-anniversary-gifts",
    name: "Wedding & Anniversary Gifts",
    short: "Gifts made to be kept, used and remembered.",
    description:
      "Silver-tone keepsakes, pooja sets and table accents for weddings, anniversaries and milestone celebrations — the kind of gifts that stay on display for years.",
    image: IMAGES.silverBoxes,
    alt: "Stack of ornate silver-tone keepsake boxes",
  },
  {
    slug: "festive-occasion-gifts",
    name: "Festive & Occasion Gifts",
    short: "For the festivals that bring everyone home.",
    description:
      "Diwali, Navratri, housewarmings and every celebration in between — festive pieces and gifts with a warm, restrained sense of occasion.",
    image: IMAGES.diyas,
    alt: "Diyas glowing during a festive celebration",
  },
  {
    slug: "corporate-bulk-gifting",
    name: "Corporate & Bulk Gifting",
    short: "Considered gifting for teams, clients and events.",
    description:
      "Curated gift selections for employee recognition, client appreciation, conferences and weddings at scale. Enquire with your requirements and our team will share a tailored quote.",
    image: IMAGES.giftMono,
    alt: "Monochrome gift boxes with ribbon bows",
  },
];

export const OCCASIONS = [
  { key: "weddings", label: "Weddings & Anniversaries", link: "/collections/wedding-anniversary-gifts", image: IMAGES.weddingAccessories },
  { key: "festive", label: "Festive Celebrations", link: "/collections/festive-occasion-gifts", image: IMAGES.diyasColor },
  { key: "housewarming", label: "Housewarming", link: "/collections/statement-home-decor", image: IMAGES.styling },
  { key: "spiritual", label: "Spiritual Occasions", link: "/collections/spiritual-pooja-decor", image: IMAGES.temple },
  { key: "corporate", label: "Corporate Gifting", link: "/corporate-gifting", image: IMAGES.corporateBox },
];

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
    collections: ["spiritual-pooja-decor", "festive-occasion-gifts"],
    occasions: ["spiritual", "festive", "housewarming"],
    featured: true,
    bulkEligible: true,
    placeholder: true,
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
    collections: ["spiritual-pooja-decor", "wedding-anniversary-gifts"],
    occasions: ["weddings", "spiritual", "festive"],
    featured: false,
    bulkEligible: true,
    placeholder: true,
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
    collections: ["spiritual-pooja-decor", "thoughtful-gifting"],
    occasions: ["spiritual", "corporate"],
    featured: false,
    bulkEligible: true,
    placeholder: true,
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
    collections: ["statement-home-decor", "wedding-anniversary-gifts"],
    occasions: ["weddings", "housewarming", "festive"],
    featured: true,
    bulkEligible: false,
    placeholder: true,
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
    collections: ["statement-home-decor"],
    occasions: ["housewarming", "weddings"],
    featured: true,
    bulkEligible: false,
    placeholder: true,
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
    collections: ["statement-home-decor", "wedding-anniversary-gifts"],
    occasions: ["weddings", "festive", "housewarming"],
    featured: false,
    bulkEligible: true,
    placeholder: true,
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
    collections: ["statement-home-decor", "thoughtful-gifting"],
    occasions: ["housewarming", "weddings"],
    featured: false,
    bulkEligible: false,
    placeholder: true,
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
    collections: ["statement-home-decor", "festive-occasion-gifts"],
    occasions: ["festive", "weddings"],
    featured: false,
    bulkEligible: true,
    placeholder: true,
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
    collections: ["spiritual-pooja-decor", "auspicious-living"],
    occasions: ["spiritual", "festive"],
    featured: false,
    bulkEligible: false,
    placeholder: true,
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
    collections: ["wedding-anniversary-gifts", "corporate-bulk-gifting", "festive-occasion-gifts"],
    occasions: ["weddings", "festive", "corporate"],
    featured: true,
    bulkEligible: true,
    placeholder: true,
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
    collections: ["festive-occasion-gifts", "thoughtful-gifting"],
    occasions: ["festive", "housewarming"],
    featured: true,
    bulkEligible: false,
    placeholder: true,
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
    collections: ["statement-home-decor", "festive-occasion-gifts"],
    occasions: ["festive", "housewarming"],
    featured: false,
    bulkEligible: false,
    placeholder: true,
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
    collections: ["auspicious-living", "thoughtful-gifting"],
    occasions: ["housewarming", "corporate"],
    featured: false,
    bulkEligible: true,
    placeholder: true,
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

export const getCollectionsFor = (keys) =>
  COLLECTIONS.filter((c) => keys.includes(c.slug));
export const getProduct = (slug) => PRODUCTS.find((pr) => pr.slug === slug);
export const getCollection = (slug) => COLLECTIONS.find((c) => c.slug === slug);
export const productsInCollection = (slug) =>
  PRODUCTS.filter((pr) => pr.collections.includes(slug));
export const getArticle = (slug) => JOURNAL.find((a) => a.slug === slug);