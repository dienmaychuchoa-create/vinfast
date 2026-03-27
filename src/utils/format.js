export function formatMoneyVND(value) {
  const n = Math.max(0, Math.round(Number(value) || 0));
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
