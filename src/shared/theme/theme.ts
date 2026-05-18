import { createTheme } from '@mui/material/styles';

const SANS = '"Public Sans", sans-serif';
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
					main: '#ec5b13',
					light: '#f07d3a',
					dark: '#c84a0e',
					contrastText: '#ffffff',
				},
				secondary: {
					main: '#475569',
					light: '#e2e8f0',
					dark: '#334155',
					contrastText: '#ffffff',
				},
				error: {
					main: '#ef4444',
					light: '#fecaca',
					dark: '#dc2626',
					contrastText: '#ffffff',
				},
				warning: {
					main: '#f59e0b',
					contrastText: '#000000',
				},
				info: {
					main: '#3b82f6',
					contrastText: '#ffffff',
				},
				success: {
					main: '#10b981',
					light: '#d1fae5',
					dark: '#059669',
					contrastText: '#ffffff',
				},
				background: {
					default: '#f8f6f6',
					paper: '#ffffff',
				},
				text: {
					primary: '#1e293b',
					secondary: '#64748b',
					disabled: '#94a3b8',
				},
				divider: '#e2e8f0',
			},
		},
		// Dark mode opcional
		dark: {
			palette: {
				mode: 'dark',
				primary: {
					main: '#f97316',
					light: '#fb923c',
					dark: '#ea580c',
					contrastText: '#ffffff',
				},
				background: {
					default: '#0f172a',
					paper: '#1e293b',
				},
				text: {
					primary: '#f1f5f9',
					secondary: '#94a3b8',
					disabled: '#64748b',
				},
				divider: '#334155',
			},
		},
	},

	// Typography
	typography: {
		fontFamily: SANS,
		h1: {
			fontFamily: SANS,
			fontSize: '3.5rem',
			fontWeight: 700,
			lineHeight: 1.1,
			letterSpacing: '-0.03em',
		},
		h2: {
			fontFamily: SANS,
			fontSize: '2rem',
			fontWeight: 600,
			lineHeight: 1.25,
			letterSpacing: '-0.02em',
		},
		h3: {
			fontFamily: SANS,
			fontSize: '1.5rem',
			fontWeight: 600,
			lineHeight: 1.3,
		},
		h4: {
			fontFamily: SANS,
			fontSize: '1.25rem',
			fontWeight: 600,
			lineHeight: 1.35,
		},
		h5: {
			fontFamily: SANS,
			fontSize: '1.125rem',
			fontWeight: 500,
			lineHeight: 1.4,
		},
		h6: {
			fontFamily: SANS,
			fontSize: '1rem',
			fontWeight: 500,
			lineHeight: 1.5,
		},
		subtitle1: {
			fontFamily: SANS,
			fontSize: '1rem',
			fontWeight: 500,
			lineHeight: 1.5,
		},
		subtitle2: {
			fontFamily: SANS,
			fontSize: '0.875rem',
			fontWeight: 500,
			lineHeight: 1.5,
		},
		body1: {
			fontFamily: SANS,
			fontSize: '1rem',
			fontWeight: 400,
			lineHeight: 1.6,
		},
		body2: {
			fontFamily: SANS,
			fontSize: '0.875rem',
			fontWeight: 400,
			lineHeight: 1.5,
		},
		button: {
			fontFamily: SANS,
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
			fontFamily: SANS,
			fontSize: '0.75rem',
			fontWeight: 700,
			lineHeight: 1.5,
			letterSpacing: '0.1em',
			textTransform: 'uppercase',
		},
	},

	// Shape
	shape: {
		borderRadius: 2,
	},

	// Components
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundColor: '#f8f6f6',
					color: '#1e293b',
				},
			},
		},
		MuiCard: {
			defaultProps: { elevation: 0 },
			styleOverrides: {
				root: ({ theme }) => ({
					borderRadius: 2,
					border: '1px solid',
					borderColor: theme.vars.palette.divider,
					background: theme.vars.palette.background.paper,
				}),
			},
		},
		MuiPaper: {
			defaultProps: { elevation: 0 },
			styleOverrides: {
				root: {
					backgroundImage: 'none',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 2,
					textTransform: 'none',
					fontWeight: 500,
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: ({ theme }) => ({
					'& .MuiOutlinedInput-root': {
						borderRadius: 2,
						backgroundColor: theme.vars.palette.background.default,
						'& fieldset': {
							borderColor: theme.vars.palette.divider,
						},
						'&:hover fieldset': {
							borderColor: theme.vars.palette.text.secondary,
						},
						'&.Mui-focused fieldset': {
							borderColor: theme.vars.palette.primary.main,
							borderWidth: 2,
						},
					},
				}),
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: 999,
				},
				outlined: ({ theme }) => ({
					borderColor: theme.vars.palette.divider,
				}),
			},
		},
		MuiLink: {
			styleOverrides: {
				root: {
					textDecoration: 'none',
					cursor: 'pointer',
				},
			},
		},
		MuiAppBar: {
			defaultProps: { elevation: 0 },
			styleOverrides: {
				root: ({ theme }) => ({
					backgroundColor: theme.vars.palette.background.paper,
					borderBottom: '1px solid',
					borderColor: theme.vars.palette.divider,
				}),
			},
		},
	},
});

export default theme;
