import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

interface AuthRouteProps {
  children: React.ReactNode;
  role: string[];
}

function AuthRoute(props: AuthRouteProps) {
  const location = useLocation();
  const auth = useSelector((state: RootState) => state.auth.loggedProfile);

  if (!auth || !props.role.includes(auth.utente.role)) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  return props.children;
}

export default AuthRoute;
