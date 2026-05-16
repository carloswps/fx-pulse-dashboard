import { styled } from '@mui/material';

export const SearchBarStyle = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing(1),
	backgroundColor: theme.palette.background.default,
	padding: theme.spacing(0.5, 2),
	width: '100%',
	maxWidth: 320,
	border: `1px solid ${theme.palette.divider}`,
	transition: 'border-color 0.2s',
	'&:focus-within': {
		borderColor: theme.palette.primary.main,
	},
}));
