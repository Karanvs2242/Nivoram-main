/**
 * NIVORAM — festive seasonal mode (auto-calendar).
 *
 * The site wears its festive skin — warmer flame gradients, quiet gold
 * sparks, slow gradient drifts on the hero and collection banners — while
 * today's date (visitor's local time) falls inside a festival window
 * below. Outside the windows the site shows the standard look.
 *
 * Preview overrides (useful for reviewing the look on any day):
 *   ?festive=1  → force festive on
 *   ?festive=0  → force festive off
 *
 * Windows are Diwali (Lakshmi Puja) with a few days on either side;
 * extend the list each year once new dates are announced.
 */
export const FESTIVE_WINDOWS = [
  { name: "Diwali 2025", start: "2025-10-16", end: "2025-10-24" },
  { name: "Diwali 2026", start: "2026-11-04", end: "2026-11-11" },
  { name: "Diwali 2027", start: "2027-10-24", end: "2027-11-01" },
  { name: "Diwali 2028", start: "2028-10-13", end: "2028-10-20" },
  { name: "Diwali 2029", start: "2029-11-01", end: "2029-11-08" },
  { name: "Diwali 2030", start: "2030-10-22", end: "2030-10-29" },
];

export function isFestiveSeason(now = new Date()) {
  const override = new URLSearchParams(window.location.search).get("festive");
  if (override === "1") return true;
  if (override === "0") return false;
  const key = (d) => d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  const today = key(now);
  return FESTIVE_WINDOWS.some(({ start, end }) => {
    const [sy, sm, sd] = start.split("-").map(Number);
    const [ey, em, ed] = end.split("-").map(Number);
    return today >= sy * 10000 + sm * 100 + sd && today <= ey * 10000 + em * 100 + ed;
  });
}
