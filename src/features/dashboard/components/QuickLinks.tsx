import History from '@mui/icons-material/History';
import NotificationsActive from '@mui/icons-material/NotificationsActive';
import { Box, Typography } from '@mui/material';

export default function QuickLinks() {
	return (
		<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
			<Box
				sx={{
					p: 3,
					borderRadius: 4,
					border: 1,
					borderColor: 'primary.main',
					bgcolor: 'primary.main',
					cursor: 'pointer',
					transition: 'opacity 0.2s',
					'&:hover': { opacity: 0.9 },
				}}
			>
				<Box
					sx={{
						width: 40,
						height: 40,
						borderRadius: 2,
						bgcolor: 'white',
						color: 'primary.main',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						mb: 2,
					}}
				>
					<History />
				</Box>
				<Typography
					variant="subtitle2"
					sx={{ fontWeight: 700, mb: 0.5 }}
					color="white"
				>
					Historical Rates
				</Typography>
				<Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
					View trends up to 10 years.
				</Typography>
			</Box>

			<Box
				sx={{
					p: 3,
					borderRadius: 4,
					border: 1,
					borderColor: 'grey.800',
					bgcolor: 'grey.900',
					cursor: 'pointer',
					transition: 'opacity 0.2s',
					'&:hover': { opacity: 0.9 },
				}}
			>
				<Box
					sx={{
						width: 40,
						height: 40,
						borderRadius: 2,
						bgcolor: 'grey.700',
						color: 'white',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						mb: 2,
					}}
				>
					<NotificationsActive />
				</Box>
				<Typography
					variant="subtitle2"
					sx={{ fontWeight: 700, mb: 0.5 }}
					color="white"
				>
					Price Alerts
				</Typography>
				<Typography variant="body2" color="grey.400">
					Get notified at 5.50 BRL.
				</Typography>
			</Box>
		</Box>
	);
}
