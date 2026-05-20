import SwapHoriz from '@mui/icons-material/SwapHoriz';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import type { CurrencyPair } from '../../../shared/types/market';

interface Props {
	pair: CurrencyPair;
}

export default function CurrencyConverter({ pair }: Props) {
	const [amount, setAmount] = useState(100);
	const [swapped, setSwapped] = useState(false);

	const fromCurrency = swapped ? pair.quote : pair.base;
	const toCurrency = swapped ? pair.base : pair.quote;
	const rate = swapped ? 1 / pair.rate : pair.rate;
	const converted = (amount * rate).toFixed(2);

	const handleSwap = () => {
		setSwapped((prev) => !prev);
		setAmount(Number(amount));
	};

	return (
		<Box
			sx={{
				p: 2,
				borderRadius: 4,
				bgcolor: 'background.paper',
				border: 1,
				borderColor: 'divider',
			}}
		>
			<Typography
				variant="h6"
				color="textSecondary"
				sx={{ mb: 1.5, fontWeight: 600, fontStyle: 'italic' }}
			>
				Currency Converter
			</Typography>

			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					<Box sx={{ flex: 1 }}>
						<Typography
							variant="caption"
							sx={{
								fontWeight: 700,
								textTransform: 'uppercase',
								color: 'textPrimary',
								mb: 1,
								display: 'block',
							}}
						>
							Amount
						</Typography>
						<TextField
							type="number"
							value={amount}
							onChange={(e) => setAmount(Number(e.target.value))}
							sx={{ '& input': { fontSize: '1.25rem', fontWeight: 700 } }}
							slotProps={{
								input: {
									endAdornment: (
										<Typography
											variant="body2"
											color="textPrimary"
											sx={{ fontWeight: 500, mr: 1 }}
										>
											{fromCurrency}
										</Typography>
									),
								},
							}}
						/>
					</Box>

					<IconButton
						onClick={handleSwap}
						sx={{
							mt: 3,
							bgcolor: 'primary.light',
							'&:hover': { bgcolor: 'primary.main', color: 'white' },
						}}
					>
						<SwapHoriz />
					</IconButton>

					<Box sx={{ flex: 1 }}>
						<Typography
							variant="caption"
							sx={{
								fontWeight: 700,
								textTransform: 'uppercase',
								color: 'text.disabled',
								mb: 1,
								display: 'block',
							}}
						>
							Converted to
						</Typography>
						<TextField
							value={converted}
							slotProps={{
								input: {
									readOnly: true,
									endAdornment: (
										<Typography
											variant="body2"
											color="textPrimary"
											sx={{ fontWeight: 500, mr: 1 }}
										>
											{toCurrency}
										</Typography>
									),
								},
							}}
							sx={{ '& input': { fontSize: '1.25rem', fontWeight: 700 } }}
						/>
					</Box>
				</Box>

				<Typography
					variant="caption"
					color="textDisabled"
					sx={{ textAlign: 'center', fontStyle: 'italic', mt: 1 }}
				>
					1 {fromCurrency} = {pair.rate.toFixed(2)} {toCurrency} • Mid-market
					rate
				</Typography>
			</Box>
		</Box>
	);
}
