import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(GlobalContext);

  if (!user) {
    return <Navigate to="/login" />; // Redirige a la página de inicio de sesión si no está autenticado
  }

  return children;
};

export default ProtectedRoute;
