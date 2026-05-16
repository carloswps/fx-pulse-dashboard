import { DarkMode, LightMode, Search } from '@mui/icons-material';
import {
	AppBar,
	Container,
	IconButton,
	InputBase,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import { SearchBarStyle } from '../style/SearchBar.tsx';

export default function Header() {
	const { mode, setMode } = useColorScheme();

	const handleToggleMode = () => {
		if (mode === 'system') {
			const preferesDark = window.matchMedia('(prefers-color-scheme: dark)');
			setMode(preferesDark.matches ? 'dark' : 'light');
		} else {
			setMode(mode === 'dark' ? 'light' : 'dark');
		}
	};

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
			<Container maxWidth={'xl'}>
				<Toolbar disableGutters sx={{ gap: 2 }}>
					<Typography
						variant={'h6'}
						sx={{
							fontFamily: '"Public Sans", sans-serif',
							fontWeight: 700,
							whiteSpace: 'nowrap',
							color: 'text.primary',
						}}
					>
						FX Pulse
					</Typography>

					<SearchBarStyle>
						<Search sx={{ color: 'text.disabled', fontSize: 'small' }} />
						<InputBase
							placeholder="Search pairs, currencies…"
							sx={{ flex: 1, fontSize: '0.875rem' }}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</SearchBarStyle>

					<Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
						<IconButton
							onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
							aria-label="Toggle theme"
						>
							{mode === 'dark' ? <LightMode /> : <DarkMode />}
						</IconButton>
					</Stack>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
