import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};

const PrivateRoute = ({ component }) => {
  return isAuthenticated() ? component : <Navigate to="/login" />;
};

export default PrivateRoute;