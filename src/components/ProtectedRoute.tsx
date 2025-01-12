import { useAppSelector } from "../store/hooks";
import { selectIsAuthenticated } from "../store/slices/authSlice";
import Unauthorized from "./Unauthorized/Unauthorized";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Unauthorized />;
  }

  return <>{children}</>;
}
