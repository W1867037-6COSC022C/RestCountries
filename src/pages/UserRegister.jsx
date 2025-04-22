import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { registerUser } from "../services/authService";
import { Typography } from "@mui/material";

export default function UserRegister() {
  const navigate = useNavigate();

  const handle = async (creds) => {
    const res = await registerUser(creds);
    localStorage.setItem("token", res.token);
    //localStorage.setItem("role", res.user.roleId);
    //localStorage.setItem("username", res.user.username);
    navigate("/user");
  };

  return (
    <>
      <RegisterForm onSubmit={handle} />
      <Typography align="center" sx={{ mt: 2 }}>
        <Link to="/login-user">Already have an account? Login</Link>
      </Typography>
    </>
  );
}
