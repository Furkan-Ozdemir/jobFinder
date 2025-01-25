import { useAppSelector } from "../store/hooks";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "../store/slices/authSlice";
import Unauthorized from "./Unauthorized/Unauthorized";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function RoleProtectedRoute({
  children,
  allowedRoles,
}: RoleProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const personType = useAppSelector(selectCurrentUser)?.personType || "";
  if (!isAuthenticated) {
    return <Unauthorized />;
  }

  if (!allowedRoles.includes(personType)) {
    return <Unauthorized />;
  }

  return <>{children}</>;
}
