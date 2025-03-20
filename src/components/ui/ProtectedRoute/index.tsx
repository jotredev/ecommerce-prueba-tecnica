import {Navigate} from "react-router-dom";
import {useAuthStore} from "@/store/useAuthStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({
  children,
  requireAdmin = true
}: ProtectedRouteProps) {
  const {isLoggedIn, isAdmin} = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
