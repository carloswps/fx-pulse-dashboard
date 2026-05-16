import { Route, Routes } from 'react-router-dom';
import DashboardLayout from './app/layouts/DashboardLayout.tsx';
import DashboardPage from './feature/dashboard/pages/DashboardPage.tsx';

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
