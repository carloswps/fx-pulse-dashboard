import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { queryClient } from './shared/query/queryClient.ts';
import { theme } from './shared/theme/index.ts';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ThemeProvider theme={theme} defaultMode="dark">
					<CssBaseline />
					<App />
				</ThemeProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>,
);
