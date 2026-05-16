import { createTheme } from '@mui/material/styles';

const HEADLINE = '"Public Sans", sans-serif';
const BODY_LIGHT = '"Inter", sans-serif';
const MONO = '"JetBrains Mono", monospace';

const theme = createTheme({
	cssVariables: {
		cssVarPrefix: 'mui',
		colorSchemeSelector: 'class',
	},
	colorSchemes: {
		light: {
			palette: {
				mode: 'light',
				primary: {
					main: '#003f8d',
					light: '#0055bb',
					dark: '#002b60',
					contrastText: '#ffffff',
				},
				secondary: {
					main: '#515f74',
					light: '#d5e3fc',
					dark: '#3a485b',
					contrastText: '#ffffff',
				},
				error: {
					main: '#ba1a1a',
					light: '#ffdad6',
					dark: '#93000a',
					contrastText: '#ffffff',
				},
				warning: {
					main: '#F59E0B',
					contrastText: '#000000',
				},
				info: {
					main: '#0078D4',
					contrastText: '#ffffff',
				},
				success: {
					main: '#10B981',
					contrastText: '#ffffff',
				},
				background: {
					default: '#faf9ff',
					paper: '#ffffff',
				},
				text: {
					primary: '#191b22',
					secondary: '#424753',
					disabled: '#737784',
				},
			},
		},
		dark: {
			palette: {
				mode: 'dark',
				primary: {
					main: '#cfbcff',
					light: '#e9ddff',
					dark: '#6750a4',
					contrastText: '#381e72',
				},
				secondary: {
					main: '#cdc0e9',
					light: '#e9ddff',
					dark: '#4d4465',
					contrastText: '#342b4b',
				},
				error: {
					main: '#ffb4ab',
					light: '#ffdad6',
					dark: '#93000a',
					contrastText: '#690005',
				},
				warning: {
					main: '#F59E0B',
					contrastText: '#000000',
				},
				info: {
					main: '#0078D4',
					contrastText: '#ffffff',
				},
				success: {
					main: '#10B981',
					contrastText: '#000000',
				},
				background: {
					default: '#141218',
					paper: '#1d1b20',
				},
				text: {
					primary: '#e6e0e9',
					secondary: '#cbc4d2',
					disabled: '#948e9c',
				},
			},
		},
	},

	// ─── Tipografia ───────────────────────────────────────
	typography: {
		fontFamily: BODY_LIGHT,
		h1: {
			fontFamily: HEADLINE,
			fontSize: '2.5rem',
			fontWeight: 700,
			lineHeight: 1.2,
			letterSpacing: '-0.02em',
		},
		h2: {
			fontFamily: HEADLINE,
			fontSize: '2rem',
			fontWeight: 600,
			lineHeight: 1.3,
			letterSpacing: '-0.01em',
		},
		h3: {
			fontFamily: HEADLINE,
			fontSize: '1.5rem',
			fontWeight: 600,
			lineHeight: 1.35,
		},
		h4: {
			fontFamily: HEADLINE,
			fontSize: '1.25rem',
			fontWeight: 600,
			lineHeight: 1.4,
		},
		h5: {
			fontFamily: HEADLINE,
			fontSize: '1.125rem',
			fontWeight: 500,
			lineHeight: 1.4,
		},
		h6: {
			fontFamily: HEADLINE,
			fontSize: '1rem',
			fontWeight: 500,
			lineHeight: 1.5,
		},
		subtitle1: {
			fontFamily: BODY_LIGHT,
			fontSize: '1rem',
			fontWeight: 500,
			lineHeight: 1.5,
		},
		subtitle2: {
			fontFamily: BODY_LIGHT,
			fontSize: '0.875rem',
			fontWeight: 500,
			lineHeight: 1.5,
		},
		body1: {
			fontFamily: BODY_LIGHT,
			fontSize: '1rem',
			fontWeight: 400,
			lineHeight: 1.6,
		},
		body2: {
			fontFamily: BODY_LIGHT,
			fontSize: '0.875rem',
			fontWeight: 400,
			lineHeight: 1.5,
		},
		button: {
			fontFamily: BODY_LIGHT,
			fontSize: '0.875rem',
			fontWeight: 500,
			lineHeight: 1.5,
			textTransform: 'none',
		},
		caption: {
			fontFamily: MONO,
			fontSize: '0.75rem',
			fontWeight: 400,
			lineHeight: 1.4,
		},
		overline: {
			fontFamily: MONO,
			fontSize: '0.6875rem',
			fontWeight: 500,
			lineHeight: 1.5,
			letterSpacing: '0.05em',
			textTransform: 'uppercase',
		},
	},
	shape: {
		borderRadius: 4,
	},
});

export default theme;
