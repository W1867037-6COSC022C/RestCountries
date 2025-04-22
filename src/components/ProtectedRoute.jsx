import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles, children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !allowedRoles.includes(role)) {
    // redirect to appropriate login
    return (
      <Navigate
        to={allowedRoles.includes("1") ? "/login-admin" : "/login-user"}
        replace
      />
    );
  }
  return children;
}
