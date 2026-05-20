const currencyFormatterMarketSummary = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
	minimumFractionDigits: 2,
	maximumFractionDigits: 4,
});

export default currencyFormatterMarketSummary;
