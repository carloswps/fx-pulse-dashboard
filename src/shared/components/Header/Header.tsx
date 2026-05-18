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
import { SearchBarStyle } from '../style/SearchBar.tsx';

export default function Header() {
	const { mode, setMode } = useColorScheme();

	return (
		<AppBar
			position="sticky"
			elevation={0}
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
					</Box>
					<SearchBarStyle
						sx={{
							borderRadius: 0.5,
						}}
					>
						<Search sx={{ color: 'text.disabled', fontSize: 20 }} />
						<InputBase
							placeholder="Search currencies or markets"
							sx={{ flex: 1, fontSize: '0.875rem' }}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</SearchBarStyle>

					<Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
						<IconButton
							aria-label="toggle dark mode"
							onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
						>
							{mode === 'light' ? <LightMode /> : <DarkMode />}
						</IconButton>
					</Stack>

					<Box sx={{ flex: 1 }} />

					<Chip
						label="Last updated: Oct 24, 14:30 GMT-3"
						size="small"
						variant="outlined"
						sx={{
							borderRadius: 0.5,
							fontSize: '0.75rem',
							fontWeight: 500,
							color: 'text.secondary',
							borderColor: 'divider',
							height: 28,
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
									ml: 1,
								}}
							/>
						}
						label="API Online"
						size="small"
						sx={{
							borderRadius: 0.5,
							fontSize: '0.65rem',
							fontWeight: 700,
							letterSpacing: '0.05em',
							textTransform: 'uppercase',
							bgcolor: 'success.main',
							color: 'success.contrastText',
							height: 28,
							'& .MuiChip-icon': { mx: 0 },
						}}
					/>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
