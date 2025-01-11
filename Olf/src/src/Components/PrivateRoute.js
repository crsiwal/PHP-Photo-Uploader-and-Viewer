import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const isLogin = useSelector(state => state.auth.isLogin);

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
