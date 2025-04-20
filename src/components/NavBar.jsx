import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    navigate(role === "1" ? "/login-admin" : "/login-user");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6">
          {role === "1" ? "Admin Dashboard" : "User Dashboard"}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Typography variant="body1" sx={{ mr: 2 }}>
          Hello, {name}
        </Typography>

        <Button color="secondary" variant="contained" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
