import { Box, Link, Stack, Typography } from '@mui/material';

export default function Footer() {
	return (
		<Box
			component="footer"
			sx={{
				mt: 8,
				pt: 3,
				borderTop: 1,
				borderColor: 'divider',
				display: 'flex',
				flexDirection: { xs: 'column', md: 'row' },
				justifyContent: 'space-between',
				alignItems: 'center',
				gap: 3,
			}}
		>
			<Stack direction="row" spacing={4}>
				<Link
					href="#"
					variant="caption"
					color="text.disabled"
					sx={{ '&:hover': { color: 'primary.main' } }}
				>
					Market Data Policies
				</Link>
				<Link
					href="#"
					variant="caption"
					color="text.disabled"
					sx={{ '&:hover': { color: 'primary.main' } }}
				>
					Privacy Policy
				</Link>
				<Link
					href="#"
					variant="caption"
					color="text.disabled"
					sx={{ '&:hover': { color: 'primary.main' } }}
				>
					Terms of Service
				</Link>
			</Stack>

			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<Typography
					variant="caption"
					color="text.disabled"
					sx={{ fontWeight: 500 }}
				>
					Powered by Global Market API
				</Typography>
				<Box
					sx={{
						width: 6,
						height: 6,
						borderRadius: '50%',
						bgcolor: 'success.main',
						animation: 'pulse 2s infinite',
						'@keyframes pulse': {
							'0%, 100%': { opacity: 1 },
							'50%': { opacity: 0.4 },
						},
					}}
				/>
			</Box>
		</Box>
	);
}
