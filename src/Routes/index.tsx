import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../Component/Authentication/Login";
import ForgotPassword from "../Component/Authentication/ForgotPassword";
import ResetPassword from "../Component/Authentication/ResetPassword";
import Connectionlost from "../Component/Authentication/connectionlost";
import LayoutRoutes from "./LayoutRoutes";
import PrivateRoute from "./PrivateRoute";
import  authRoutes  from "./AuthRoutes";
import ConnectionStatusChecker from './../CheckConnection';
const RouterData = () => {
  const login = localStorage.getItem("clientId");
  return (
    <BrowserRouter>
     <ConnectionStatusChecker />
      <Routes>
        {login ? (
          <>
            <Route
              path={`${process.env.PUBLIC_URL}` || '/'}
              element={
                <Navigate to={`${process.env.PUBLIC_URL}/dashboard`} />
              }
            />
          </>
        ) : (
          ""
        )}
        <Route path={"/"} element={<PrivateRoute />}> 
          <Route path={`/*`} element={<LayoutRoutes />} />
        </Route>
        {authRoutes.map(({ path, Component }, i) => (
          <Route path={path} element={Component} key={i} />
        ))}
        <Route path={`${process.env.PUBLIC_URL}/login`} element={<Login />} />
        <Route path={`${process.env.PUBLIC_URL}/forgotpassword`} element={<ForgotPassword />} />
        <Route path={`${process.env.PUBLIC_URL}/resetpassword`} element={<ResetPassword />} />
        <Route path={`${process.env.PUBLIC_URL}/connection-lost`} element={<Connectionlost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterData;
