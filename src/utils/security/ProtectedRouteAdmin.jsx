/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteAdmin = ({ user }) => {
  if (!user || !user.rol == "ADMINISTRADOR") {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};

export default ProtectedRouteAdmin;
