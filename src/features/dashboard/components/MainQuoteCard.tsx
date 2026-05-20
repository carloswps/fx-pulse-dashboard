import TrendingUp from '@mui/icons-material/TrendingUp';
import { Box, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import type { CurrencyPair, TimeRange } from '../../../shared/types/market';
import type { DashboardApiResponse } from '../../../shared/types/types.ts';
import { getFlagUrl } from '../../../utils/getFlagUrl.ts';
import ChartWidget from './ChartWidget.tsx';

interface Props {
	pair: CurrencyPair;
	chartData?: DashboardApiResponse[];
}

export default function MainQuoteCard({ pair, chartData }: Props) {
	const [range, setRange] = useState<TimeRange>('1D');

	const displayValue = useMemo(() => {
		if (!chartData?.length) return pair.rate;

		const now = new Date();
		const cutoff = new Date();
		switch (range) {
			case '1D':
				cutoff.setHours(now.getHours() - 24);
				break;
			case '5D':
				cutoff.setDate(now.getDate() - 5);
				break;
			case '1M':
				cutoff.setMonth(now.getMonth() - 1);
				break;
			case '1Y':
				cutoff.setFullYear(now.getFullYear() - 1);
				break;
			default:
				return chartData[chartData.length - 1].value;
		}

		const filtered = chartData.filter((d) => new Date(d.date) >= cutoff);
		return filtered.length ? filtered[filtered.length - 1].value : pair.rate;
	}, [chartData, range, pair.rate]);

	const isPositive = displayValue >= pair.rate;

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				p: 4,
				borderRadius: 4,
				bgcolor: 'background.paper',
				border: 1,
				borderColor: 'divider',
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			<Box sx={{ zIndex: 1 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
					<Box sx={{ display: 'flex' }}>
						<Box
							component={'img'}
							src={getFlagUrl(pair.base)}
							alt={`Flag of ${pair.base}`}
							sx={{
								width: 32,
								height: 32,
								borderRadius: '50%',
								border: 2,
								borderColor: 'background.paper',
								bgcolor: 'grey.200',
								mr: -1,
								objectFit: 'cover',
								objectPosition: 'center',
							}}
						/>
						<Box
							component={'img'}
							src={getFlagUrl(pair.quote)}
							alt={`Flag of ${pair.quote}`}
							sx={{
								width: 32,
								height: 32,
								borderRadius: '50%',
								border: 2,
								borderColor: 'background.paper',
								bgcolor: 'grey.200',
								mr: -1,
								objectFit: 'cover',
								objectPosition: 'center',
							}}
						/>
					</Box>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{ fontWeight: 600 }}
					>
						{pair.base} → {pair.quote}
					</Typography>
				</Box>

				<Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
					<Typography variant="h3" sx={{ fontWeight: 600 }}>
						R$ {pair.rate.toFixed(2)}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 0.25,
							color: isPositive ? 'success.main' : 'error.main',
						}}
					>
						<TrendingUp
							sx={{
								fontSize: 20,
								transform: isPositive ? 'none' : 'rotate(180deg)',
							}}
						/>
						<Typography variant="h6" sx={{ fontWeight: 600 }} color="inherit">
							{isPositive ? '+' : ''}
							{pair.changePercent.toFixed(2)}%
						</Typography>
					</Box>
				</Box>
			</Box>

			<Box sx={{ mt: 4 }}>
				<ChartWidget
					value={pair.rate}
					data={chartData}
					onRangeChange={setRange}
					range={range}
				/>
			</Box>
		</Box>
	);
}
