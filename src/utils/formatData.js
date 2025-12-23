export function formatNumber(price) {
  if (price === null || price === undefined) return "—";
  if (price > 1000000000) return (price / 1000000000).toFixed(2) + "B";
  if (price > 1000000) return (price / 1000000).toFixed(2) + "M";

  return price.toFixed(2);
}
