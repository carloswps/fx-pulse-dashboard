import { Box, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import FetchData from '../../../shared/services/client';
import type { MarketSummary } from '../../../shared/types/market';

interface Props {
	summary: MarketSummary;
}

export default function MarketSummaryCard({ summary }: Props) {
	const rows = [
		{ label: "Day's High", value: summary.dayHigh.toFixed(4) },
		{ label: "Day's Low", value: summary.dayLow.toFixed(4) },
		{ label: 'Open', value: summary.open.toFixed(4) },
		{ label: 'Prev Close', value: summary.prevClose.toFixed(4) },
		{
			label: '52-Week Range',
			value: `${summary.week52Low.toFixed(2)} — ${summary.week52High.toFixed(2)}`,
		},
	];

	const handleFetchData = useCallback(async () => {
		try {
			const clientService = new FetchData('');
			const dashboardData = await clientService.fetchDashboardData();
			console.log(dashboardData);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		handleFetchData();
	}, [handleFetchData]);

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
				<Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
					{summary.sentiment}
				</Typography>
			</Box>
		</Box>
	);
}
