import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import UserRegister from "./pages/UserRegister";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const location = useLocation();
  const role = localStorage.getItem("role");

  return (
    <>
      {role && <NavBar />}
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={
                role === "1" ? "/admin" : role === "2" ? "/user" : "/login-user"
              }
              replace
            />
          }
        />

        <Route path="/login-user" element={<UserLogin />} />
        <Route path="/login-admin" element={<AdminLogin />} />
        <Route path="/register" element={<UserRegister />} />

        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["2"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["1"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* catch‑all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
