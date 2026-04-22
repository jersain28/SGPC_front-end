import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

export const ProtectedRouterUser = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decoded: any = jwtDecode(token);
    if (!decoded.is_staff) {
      return <Navigate to="/" />;
    }
  } catch (error) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};