import type {
	Candle,
	CurrencyPair,
	MarketSummary,
	TimeRange,
} from '../types/market';

export const MOCK_PAIRS = [
	{
		code: 'USD-BRL',
		base: 'USD',
		quote: 'BRL',
		name: 'US Dollar / Brazilian Real',
		rate: 5.4321,
		change: 0.0132,
		changePercent: 0.24,
		high: 5.45,
		low: 5.41,
		volume: 1_234_567,
	},
	{
		code: 'EUR-USD',
		base: 'EUR',
		quote: 'USD',
		name: 'Euro / US Dollar',
		rate: 1.0942,
		change: 0.0005,
		changePercent: 0.05,
		high: 1.095,
		low: 1.092,
		volume: 2_345_678,
	},
	{
		code: 'GBP-USD',
		base: 'GBP',
		quote: 'USD',
		name: 'British Pound / US Dollar',
		rate: 1.2645,
		change: 0.0015,
		changePercent: 0.12,
		high: 1.266,
		low: 1.262,
		volume: 987_654,
	},
	{
		code: 'USD-JPY',
		base: 'USD',
		quote: 'JPY',
		name: 'US Dollar / Japanese Yen',
		rate: 149.32,
		change: -0.45,
		changePercent: -0.3,
		high: 149.8,
		low: 149.1,
		volume: 3_456_789,
	},
];

function generateCandles(count: number, basePrice: number): Candle[] {
	const now = Math.floor(Date.now() / 1000);
	const candles: Candle[] = [];
	let price = basePrice;

	for (let i = count; i >= 0; i--) {
		const change = (Math.random() - 0.48) * 0.02;
		price += change;
		candles.push({
			time: now - i * 3600,
			open: price,
			high: price + Math.random() * 0.01,
			low: price - Math.random() * 0.01,
			close: price + (Math.random() - 0.5) * 0.005,
		});
	}
	return candles;
}

export async function fetchPairs(): Promise<CurrencyPair[]> {
	await delay(300);
	return MOCK_PAIRS;
}

export async function fetchPairByCode(
	code: string,
): Promise<CurrencyPair | undefined> {
	await delay(200);
	return MOCK_PAIRS.find((p) => p.code === code);
}

export async function fetchCandles(
	pairCode: string,
	range: TimeRange,
): Promise<Candle[]> {
	await delay(400);
	const pair = MOCK_PAIRS.find((p) => p.code === pairCode) ?? MOCK_PAIRS[0];
	const counts: Record<TimeRange, number> = {
		'1D': 24,
		'5D': 120,
		'1M': 720,
		'1Y': 365,
		MAX: 1000,
	};
	return generateCandles(counts[range], pair.rate);
}

export async function fetchMarketSummary(
	pairCode: string,
): Promise<MarketSummary> {
	await delay(200);
	const pair = MOCK_PAIRS.find((p) => p.code === pairCode) ?? MOCK_PAIRS[0];
	return {
		dayHigh: pair.high,
		dayLow: pair.low,
		open: pair.rate - pair.change,
		prevClose: pair.rate - pair.change - 0.01,
		week52High: pair.rate * 1.05,
		week52Low: pair.rate * 0.9,
		sentiment: `${pair.base} is currently trading near its weekly high against ${pair.quote} amid fiscal policy discussions.`,
	};
}

// ─── Helpers ─────────────────────────────────────
function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
