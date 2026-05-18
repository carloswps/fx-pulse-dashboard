import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import type { TimeRange } from '../../../shared/types/market';

const RANGES: TimeRange[] = ['1D', '5D', '1M', '1Y', 'MAX'];

interface Props {
	value: number;
}

export default function ChartWidget({ value: _value }: Props) {
	const [range, setRange] = useState<TimeRange>('1D');

	return (
		<Box>
			<Stack
				direction="row"
				spacing={0}
				sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
			>
				{RANGES.map((r) => (
					<Button
						key={r}
						disableRipple
						onClick={() => setRange(r)}
						sx={{
							px: 2,
							py: 1,
							fontSize: '0.7125rem',
							fontWeight: range === r ? 700 : 500,
							color: range === r ? 'primary.main' : 'text.disabled',
							borderBottom: 2,
							borderColor: range === r ? 'primary.main' : 'transparent',
							borderRadius: 0.2,
							minWidth: 0,
							'&:hover': { color: 'text.primary' },
							mb: 0.5,
						}}
					>
						{r}
					</Button>
				))}
			</Stack>

			<Box sx={{ width: '100%', height: 120, py: 1 }}>
				<svg
					fill="none"
					height="100%"
					preserveAspectRatio="none"
					viewBox="0 0 478 150"
					width="100%"
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					aria-label="chart"
				>
					<path
						d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
						stroke="currentColor"
						strokeLinecap="round"
						strokeWidth="2.5"
						style={{ color: 'var(--mui-palette-primary-main, #ec5b13)' }}
					/>
					<path
						d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V150H0V109Z"
						fill="url(#gradient)"
					/>
					<defs>
						<linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
							<stop
								offset="0%"
								stopColor="var(--mui-palette-primary-main, #ec5b13)"
								stopOpacity="0.1"
							/>
							<stop
								offset="100%"
								stopColor="var(--mui-palette-primary-main, #ec5b13)"
								stopOpacity="0"
							/>
						</linearGradient>
					</defs>
				</svg>
			</Box>

			<Stack direction="row" sx={{ px: 1, justifyContent: 'space-between' }}>
				<Typography variant="caption" color="text.disabled">
					09:00 AM
				</Typography>
				<Typography variant="caption" color="text.disabled">
					11:00 AM
				</Typography>
				<Typography variant="caption" color="text.disabled">
					01:00 PM
				</Typography>
				<Typography variant="caption" color="text.disabled">
					03:00 PM
				</Typography>
				<Typography variant="caption" color="text.disabled">
					05:00 PM
				</Typography>
			</Stack>
		</Box>
	);
}
