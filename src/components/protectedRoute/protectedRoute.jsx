import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredSesion = true }) => {
  const user = useSelector((store) => store.sesion);
  if (requiredSesion && !user) {
    return <Navigate to={"/singin"} replace />;
  } else if (!requiredSesion && user) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

export default ProtectedRoute;
