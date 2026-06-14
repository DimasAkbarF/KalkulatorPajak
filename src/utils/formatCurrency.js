export function formatCurrency(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export function formatCurrencyShort(value) {
  const number = Number(value || 0);

  if (number >= 1_000_000_000) {
    return `Rp ${(number / 1_000_000_000).toFixed(2).replace(/\.?0+$/, "")} M`;
  }

  if (number >= 1_000_000) {
    return `Rp ${(number / 1_000_000).toFixed(1).replace(/\.?0+$/, "")} Jt`;
  }

  return formatCurrency(number).replace(",00", "");
}

export function parseCurrency(value) {
  return Number(String(value || "").replace(/[^0-9]/g, "")) || 0;
}

export function formatNumberInput(value) {
  const number = parseCurrency(value);
  return number ? number.toLocaleString("id-ID") : "";
}
