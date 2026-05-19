import { Box, Button, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import type { TimeRange } from '../../../shared/types/market';
import type { DashboardApiResponse } from '../../../shared/types/types';

const RANGES: TimeRange[] = ['1D', '5D', '1M', '1Y', 'MAX'];

interface Props {
	value: number;
	data?: DashboardApiResponse[];
}

export default function ChartWidget({ value: _value, data }: Props) {
	const [range, setRange] = useState<TimeRange>('1D');

	const filteredData = useMemo(() => {
		if (!data) return [];
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
				return data;
		}
		return data.filter((d) => new Date(d.date) >= cutoff);
	}, [data, range]);

	const points = useMemo(() => {
		if (!filteredData.length) return '';

		const values = filteredData.map((d) => d.value);
		const min = Math.min(...values);
		const max = Math.max(...values);
		const range = max - min || 1;

		return filteredData
			.map((d, i) => {
				const x = (i / (filteredData.length - 1)) * 478;
				const y = 150 - ((d.value - min) / range) * 140;
				return `${x},${y}`;
			})
			.join(' ');
	}, [filteredData]);

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
					{points && (
						<>
							<polyline
								points={points}
								fill="none"
								stroke="var(--mui-palette-primary-main, #ec5b13)"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d={`M0,150 ${points.split(' ').map((p) => `L${p}`).join(' ')} L478,150 Z`}
								fill="url(#gradient)"
							/>
						</>
					)}
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
