import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/login-admin" />;
  }

  try {
    const decoded: any = jwtDecode(token);
    if (!decoded.is_staff) {
      return <Navigate to="/login-admin" />;
    }
  } catch (error) {
    return <Navigate to="/login-admin" />;
  }

  return <>{children}</>;
};