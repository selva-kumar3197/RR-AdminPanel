import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const admin = localStorage.getItem("admin");
  return admin ? children : <Navigate to="/" />;
  return <div></div>;
}

export default PrivateRoute;
