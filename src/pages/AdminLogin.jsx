import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { loginUser } from "../services/authService";

export default function AdminLogin() {
  const navigate = useNavigate();

  const handle = async (creds) => {
    const res = await loginUser(creds);

    if (res.error) {
      throw new Error(res.error);
    }
    if (!res.data) {
      throw new Error(res.message || "Login failed");
    }
    if (res.data.user.role !== 1) {
      throw new Error("You do not have admin access");
    }

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);
    localStorage.setItem("username", res.data.user.username);
    navigate("/admin");
  };

  return (
    <LoginForm
      title="Admin Login"
      submitText="Login as Admin"
      onSubmit={handle}
    />
  );
}
