import { useAppSelector } from "../store/hooks";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "../store/slices/authSlice";
import Unauthorized from "./Unauthorized/Unauthorized";

interface EmployerRouteProps {
  children: React.ReactNode;
}

export default function EmployerRoute({ children }: EmployerRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);
  console.log("user", user);
  if (!isAuthenticated || user?.personType !== "employer") {
    return <Unauthorized />;
  }

  return <>{children}</>;
}
