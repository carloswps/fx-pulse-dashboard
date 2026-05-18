import { Route, Routes } from 'react-router-dom';
import DashboardLayout from './app/layouts/DashboardLayout';
import DashboardPage from './features/dashboard/pages/DashboardPage';

function App() {
	return (
		<Routes>
			<Route element={<DashboardLayout />}>
				<Route index element={<DashboardPage />} />
			</Route>
		</Routes>
	);
}

export default App;
