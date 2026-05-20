const currencyToCountry: Record<string, string> = {
	USD: 'US',
	BRL: 'BR',
};

export const getCountryCodeFromCurrency = (currency: string): string => {
	return currencyToCountry[currency.toLocaleUpperCase()] ?? 'UN';
};

export const getFlagUrl = (currencyCode: string): string => {
	const countryCode = getCountryCodeFromCurrency(currencyCode);
	return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
};
