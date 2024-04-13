import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

interface AuthRouteProps {
  children: React.ReactNode;
  role: string[];
}

function AuthRoute(props: AuthRouteProps) {
  const location = useLocation();

  const utente = useSelector((state: RootState) => state.auth.loggedProfile);
  const azienda = useSelector((state: RootState) => state.auth.loggedAzienda);

  const role = utente ? utente.utente.role : azienda ? azienda.azienda.role : null;

  if (!role || !props.role.includes(role)) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  return props.children;
}

export default AuthRoute;
