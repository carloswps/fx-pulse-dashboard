import { DarkMode, LightMode, Search } from '@mui/icons-material';
import {
	AppBar,
	Box,
	Chip,
	Container,
	IconButton,
	InputBase,
	Stack,
	Toolbar,
	Typography,
	useColorScheme,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import formatTimestamp from '../../../utils/formatTimestamp.ts';
import FetchData from '../../services/client.ts';
import type { HealthApiResponse } from '../../types/types.ts';
import { SearchBarStyle } from '../style/SearchBar.tsx';

export default function Header() {
	const { mode, setMode } = useColorScheme();
	const [healthData, setHealthData] = useState<HealthApiResponse | null>(null);

	const handleFetchHealth = useCallback(async () => {
		try {
			const clientService = new FetchData('');
			const healthData = await clientService.fetchHealthData();
			setHealthData(healthData);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		handleFetchHealth();
	}, [handleFetchHealth]);

	return (
		<AppBar
			position="sticky"
			elevation={1}
			sx={{
				bgcolor: 'background.paper',
				borderBottom: 1,
				borderColor: 'divider',
			}}
		>
			<Container maxWidth={false} sx={{ maxWidth: 1600 }}>
				<Toolbar disableGutters sx={{ gap: 3 }}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Box
							sx={{
								size: 24,
								color: 'primary.main',
								display: 'flex',
							}}
						>
							<svg
								fill="none"
								viewBox="0 0 48 48"
								width="24"
								height="24"
								xmlns="http://www.w3.org/2000/svg"
								role="img"
								aria-label="Fx Pulse Logo"
							>
								<title>Fx Pulse Logo</title>
								<path
									clipRule="evenodd"
									d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4"
									fill="currentColor"
									fillRule="evenodd"
								/>
							</svg>
						</Box>
						<Typography
							variant="h6"
							color="textPrimary"
							sx={{
								fontWeight: 700,
								letterSpacing: '-0.02em',
								whiteSpace: 'nowrap',
							}}
						>
							FX Pulse
						</Typography>
						<Chip
							label={`Version ${healthData?.version}`}
							size="small"
							variant="filled"
							sx={{
								borderRadius: 2,
								fontSize: '0.75rem',
								fontWeight: 500,
								color: 'text.secondary',
								height: 24,
								boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
							}}
						/>
					</Box>
					<SearchBarStyle
						sx={{
							borderRadius: 2,
						}}
					>
						<Search sx={{ color: 'text.disabled', fontSize: 20 }} />
						<InputBase
							placeholder="Search currencies or markets"
							sx={{ flex: 1, fontSize: '0.875rem' }}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</SearchBarStyle>

					<Stack
						direction="row"
						spacing={1}
						sx={{ ml: 'auto', alignItems: 'center' }}
					>
						<Chip
							icon={
								<Box
									sx={{
										width: 6,
										height: 6,
										borderRadius: '50%',
										bgcolor:
											healthData?.database === 'connected'
												? 'success.main'
												: 'error.main',
									}}
								/>
							}
							label={healthData?.database}
							size="small"
							variant="filled"
							sx={{
								borderRadius: 2,
								fontSize: '0.7rem',
								color: 'text.secondary',
								borderColor: 'divider',
								height: 24,
								p: 1,
							}}
						/>

						<Chip
							label={`Worker: ${healthData?.worker?.status}`}
							size="small"
							variant="outlined"
							sx={{
								height: 24,
								fontSize: '0.65rem',
								textTransform: 'uppercase',
								borderRadius: 2,
								bgcolor:
									healthData?.worker?.status === 'running'
										? 'success.main'
										: 'warning.light',
								color:
									healthData?.worker?.status === 'running'
										? 'success.contrastText'
										: 'warning.dark',
							}}
						/>

						<Chip
							label={`Updated: ${formatTimestamp(healthData?.timestamp)}`}
							size="small"
							variant="filled"
							sx={{
								borderRadius: 2,
								fontSize: '0.7rem',
								color: 'text.secondary',
								borderColor: 'divider',
								height: 24,
								p: 0,
							}}
						/>

						<Chip
							icon={
								<Box
									sx={{
										width: 6,
										height: 6,
										borderRadius: '50%',
										bgcolor: 'success.main',
									}}
								/>
							}
							label={healthData?.status}
							size="small"
							sx={{
								height: 24,
								fontSize: '0.65rem',
								fontWeight: 700,
								textTransform: 'uppercase',
								borderRadius: 2,
								bgcolor: 'success.main',
								color: 'success.contrastText',
							}}
						/>

						<IconButton
							aria-label="toggle dark mode"
							onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
						>
							{mode === 'light' ? <LightMode /> : <DarkMode />}
						</IconButton>
					</Stack>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
