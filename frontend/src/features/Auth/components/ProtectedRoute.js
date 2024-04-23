import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useAuthContext();

  if (isAuth) {
    return children;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
