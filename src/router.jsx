import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ProtectedLayout from './components/ProtectedLayout';
import GuestLayout from './components/GuestLayout';
import Test from "./pages/Test.jsx";
import History from "./pages/History.jsx";
import UserList from "./pages/UserList.jsx";

const router = createBrowserRouter([
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{path: '/', element: <Login />,},
			{path: '/register', element: <Register />,},
			{path: '/test', element: <Test/>},

		],
	},
	{
		path: '/',
		element: <ProtectedLayout />,
		children: [
			{path: '/profile', element: <Profile />,},
			{path: '/get_users', element: <UserList/>},
			{path: '/history/:id', element: <History/>},

		],
	},
]);

export default router;
