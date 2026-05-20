import type { DashboardApiResponse } from '../shared/types/types';

export interface MarketSummaryStats {
	dayHigh: number;
	dayLow: number;
	open: number;
	prevClose: number;
	week52High: number;
	week52Low: number;
	sentiment: 'Bullish' | 'Bearish';
}

export function calculateMarketSummary(
	data?: DashboardApiResponse[],
): MarketSummaryStats | null {
	if (!data?.length) return null;

	const now = new Date();
	const today = now.toISOString().split('T')[0];
	const toRate = (val: number) => val / 10000;

	const yesterday = new Date(now);
	yesterday.setDate(yesterday.getDate() - 1);
	const yesterdayStr = yesterday.toISOString().split('T')[0];

	const todayData = data.filter((d) => d.date.startsWith(today));
	const yesterdayData = data.filter((d) => d.date.startsWith(yesterdayStr));

	const yearAgo = new Date();
	yearAgo.setFullYear(yearAgo.getFullYear() - 1);
	const yearData = data.filter((d) => new Date(d.date) >= yearAgo);

	if (!todayData.length) return null;

	const dayHigh = Math.max(...todayData.map((d) => toRate(d.value)));
	const dayLow = Math.min(...todayData.map((d) => toRate(d.value)));
	const open = toRate(todayData[0].value);

	const prevClose = yesterdayData.length
		? toRate(yesterdayData[yesterdayData.length - 1].value)
		: open;

	const week52High = yearData.length
		? Math.max(...yearData.map((d) => toRate(d.value)))
		: dayHigh;
	const week52Low = yearData.length
		? Math.min(...yearData.map((d) => toRate(d.value)))
		: dayLow;

	const change = ((dayHigh - prevClose) / prevClose) * 100;
	const sentiment = change >= 0 ? 'Bullish' : 'Bearish';

	return {
		dayHigh,
		dayLow,
		open,
		prevClose,
		week52High,
		week52Low,
		sentiment,
	};
}
