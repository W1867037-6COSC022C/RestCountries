import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";
import { loginUser } from "../services/authService";

export default function UserLogin() {
  const navigate = useNavigate();

  const handle = async (creds) => {
    const res = await loginUser(creds);

    //if something off in theback-end
    if (res.error) {
      throw new Error(res.error);
    }

    if (!res.data) {
      throw new Error(res.message || "Login failed");
    }

    if (res.data.user.role !== 2) {
      throw new Error("You do not have user access");
    }

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);
    localStorage.setItem("username", res.data.user.username);
    navigate("/user");
  };

  return (
    <LoginForm
      title="User Login"
      submitText="Login"
      onSubmit={handle}
      footer={
        <Typography align="center">
          <Link to="/register">Don’t have an account? Register</Link>
        </Typography>
      }
    />
  );
}
