import { PRODUCTS } from "@/data/catalog";

/**
 * Lightweight client-side catalogue search.
 * Scores products against the query: name matches weigh most (bonus for
 * word-start hits), then SKU, then collection names, then description.
 */
const norm = (s) => (s || "").toLowerCase();

export function searchProducts(query, limit = 6) {
  const q = norm(query).trim();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  const scored = [];
  for (const p of PRODUCTS) {
    const name = norm(p.name);
    const sku = norm(p.sku);
    const collections = norm(p.collections.join(" "));
    const description = norm(p.description);
    let score = 0;
    for (const t of terms) {
      if (name.includes(t)) score += name.startsWith(t) ? 5 : 3;
      if (sku.includes(t)) score += 3;
      if (collections.includes(t)) score += 1;
      if (description.includes(t)) score += 1;
    }
    if (score > 0) scored.push({ p, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}
