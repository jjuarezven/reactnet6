export const Config = {
	baseApiUrl: "",
} as const;

export const currencyFormatter = Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0,
});
