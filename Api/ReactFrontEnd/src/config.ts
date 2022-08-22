export const Config = {
  baseApiUrl: "https://localhost:4000"
} as const;

export const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});
