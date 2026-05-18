import TrendingUp from '@mui/icons-material/TrendingUp';
import { Box, Typography } from '@mui/material';
import type { CurrencyPair } from '../../../shared/types/market';
import ChartWidget from './ChartWidget.tsx';

interface Props {
	pair: CurrencyPair;
}

export default function MainQuoteCard({ pair }: Props) {
	const isPositive = pair.change >= 0;

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
							sx={{
								width: 32,
								height: 32,
								borderRadius: '50%',
								border: 2,
								borderColor: 'background.paper',
								bgcolor: 'grey.200',
								mr: -1,
							}}
						/>
						<Box
							sx={{
								width: 32,
								height: 32,
								borderRadius: '50%',
								border: 2,
								borderColor: 'background.paper',
								bgcolor: 'grey.200',
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
				<ChartWidget value={pair.rate} />
			</Box>
		</Box>
	);
}
