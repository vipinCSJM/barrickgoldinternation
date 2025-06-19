import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const login = localStorage.getItem("clientId") ? true : false;
  return login !== false ? (
    <Outlet />
  ) : (
    <Navigate to={`${process.env.PUBLIC_URL}/login`} />
  );
};

export default PrivateRoute;
