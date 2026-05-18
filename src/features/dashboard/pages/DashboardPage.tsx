import { Box, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Footer from '../../../shared/components/Footer/Footer.tsx';
import {
	fetchMarketSummary,
	fetchPairs,
} from '../../../shared/services/marketService';
import CurrencyConverter from '../components/CurrencyConverter.tsx';
import MainQuoteCard from '../components/MainQuoteCard.tsx';
import MarketSummaryCard from '../components/MarketSummaryCard.tsx';
import QuickLinks from '../components/QuickLinks.tsx';

export default function DashboardPage() {
	const { data: pairs } = useQuery({
		queryKey: ['pairs'],
		queryFn: fetchPairs,
	});

	const { data: summary } = useQuery({
		queryKey: ['market-summary', pairs?.[0]?.code],
		queryFn: () => {
			const code = pairs?.[0].code;
			if (!code) throw new Error('No pair code');
			return fetchMarketSummary(code);
		},
		enabled: !!pairs?.length,
	});

	const primaryPair = pairs?.[0];

	return (
		<Box sx={{ maxWidth: 1280, mx: 'auto', width: '100%', px: 5, py: 4 }}>
			<Box sx={{ mb: 8 }}>
				<Grid container spacing={3}>
					<Grid size={{ xs: 12, lg: 8 }}>
						{primaryPair && <MainQuoteCard pair={primaryPair} />}
					</Grid>

					<Grid size={{ xs: 12, lg: 4 }}>
						{summary && <MarketSummaryCard summary={summary} />}
					</Grid>
				</Grid>
			</Box>

			<Grid container spacing={3}>
				<Grid size={{ xs: 12, lg: 6 }}>
					{primaryPair && <CurrencyConverter pair={primaryPair} />}
				</Grid>

				<Grid size={{ xs: 12, lg: 6 }}>
					<QuickLinks />
				</Grid>
			</Grid>

			<Footer />
		</Box>
	);
}
