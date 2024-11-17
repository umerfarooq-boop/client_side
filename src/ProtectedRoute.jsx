import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('email');

  return isAuthenticated ? children : <Navigate to="/signup" replace />;
};

export default ProtectedRoute;
