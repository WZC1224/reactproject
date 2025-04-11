import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Profile from '../pages/Profile';

const checkAuth = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

const AuthRoute = ({ children }: { children: React.ReactElement }) => {
  if (!checkAuth()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: (
      <AuthRoute>
        <MainLayout />
      </AuthRoute>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);

export default router;