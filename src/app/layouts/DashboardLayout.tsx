import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../../shared/components/Header/Header.tsx';

export default function DashboardLayout() {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<Header />
			<Box component="main" sx={{ flex: 1 }}>
				<Outlet />
			</Box>
		</Box>
	);
}
