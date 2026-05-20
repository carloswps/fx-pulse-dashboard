import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import type { DashboardApiResponse } from '../../../shared/types/types';
import { calculateMarketSummary } from '../../../utils/calculateMarketSummary';
import currencyFormatterMarketSummary from '../../../utils/currencyFormatterMarketSummary';

interface Props {
	data?: DashboardApiResponse[];
}

export default function MarketSummaryCard({ data }: Props) {
	const summary = useMemo(() => calculateMarketSummary(data), [data]);

	if (!summary) return null;

	const rows = [
		{
			label: "Day's High",
			value: currencyFormatterMarketSummary.format(summary.dayHigh),
		},
		{
			label: "Day's Low",
			value: currencyFormatterMarketSummary.format(summary.dayLow),
		},
		{
			label: 'Open',
			value: currencyFormatterMarketSummary.format(summary.open),
		},
		{
			label: 'Prev Close',
			value: currencyFormatterMarketSummary.format(summary.prevClose),
		},
		{
			label: '52-Week Range',
			value: `${currencyFormatterMarketSummary.format(summary.week52Low)} — ${currencyFormatterMarketSummary.format(summary.week52High)}`,
		},
	];

	return (
		<Box
			sx={{
				p: 3,
				borderRadius: 4,
				bgcolor: 'background.paper',
				border: 1,
				borderColor: 'divider',
			}}
		>
			<Typography
				variant="overline"
				sx={{
					fontSize: '0.75rem',
					fontWeight: 700,
					letterSpacing: '0.1em',
					mb: 3,
					display: 'block',
				}}
			>
				Market Summary
			</Typography>

			<Box
				sx={{
					'& > *:not(:last-child)': { borderBottom: 1, borderColor: 'divider' },
				}}
			>
				{rows.map((row) => (
					<Box
						key={row.label}
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							py: 1.5,
						}}
					>
						<Typography variant="body2" color="text.secondary">
							{row.label}
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: 600 }}>
							{row.value}
						</Typography>
					</Box>
				))}
			</Box>

			<Box
				sx={{
					mt: 3,
					p: 2,
					borderRadius: 2,
					bgcolor: 'grey.50',
				}}
			>
				<Typography
					variant="caption"
					sx={{
						fontWeight: 700,
						letterSpacing: '0.05em',
						textTransform: 'uppercase',
						color: 'text.disabled',
					}}
				>
					Market Sentiment
				</Typography>
				<Typography
					variant="body2"
					sx={{
						mt: 0.5,
						color:
							summary.sentiment === 'Bullish' ? 'success.main' : 'error.main',
						fontWeight: 600,
					}}
				>
					{summary.sentiment}
				</Typography>
			</Box>
		</Box>
	);
}
