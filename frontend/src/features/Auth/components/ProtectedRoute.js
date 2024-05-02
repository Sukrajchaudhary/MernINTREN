import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const info = localStorage.getItem("info");
  const isAuth = JSON.parse(info);
  if (!isAuth) {
    return <Navigate to="/" replace={true} />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
