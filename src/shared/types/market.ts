export interface CurrencyPair {
	code: string;
	base: string;
	quote: string;
	name: string;
	rate: number;
	change: number;
	changePercent: number;
	high: number;
	low: number;
	volume: number;
}

export interface Candle {
	time: number;
	open: number;
	high: number;
	low: number;
	close: number;
}

export type TimeRange = '1D' | '5D' | '1M' | '1Y' | 'MAX';

export interface MarketSummary {
	dayHigh: number;
	dayLow: number;
	open: number;
	prevClose: number;
	week52High: number;
	week52Low: number;
	sentiment: string;
}
