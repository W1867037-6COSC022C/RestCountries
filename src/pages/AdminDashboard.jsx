import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import { fetchAllUsers, deleteUser } from "../services/authService";

export default function AdminDashboard() {
  const token = localStorage.getItem("token");

  // Users
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Snackbar
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Load users on mount
  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      try {
        const res = await fetchAllUsers(token);
        if (res.error) throw new Error(res.error || res.message);
        setUsers(res.data || []);
      } catch (err) {
        setSnack({ open: true, message: err.message, severity: "error" });
      }
      setLoading(false);
    }
    loadUsers();
  }, [token]);

  // Delete a user
  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(token, userId);
      setUsers((u) => u.filter((x) => x.userId !== userId));
      setSnack({ open: true, message: "User deleted", severity: "info" });
    } catch (err) {
      setSnack({ open: true, message: err.message, severity: "error" });
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* --- User Management --- */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Manage Users</Typography>

        {loading ? (
          <CircularProgress sx={{ mt: 2 }} />
        ) : (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.userId} hover>
                    <TableCell>{u.userId}</TableCell>
                    <TableCell>{u.userName}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.roleId === 1 ? "Admin" : "User"}</TableCell>
                    <TableCell>{u.created_at}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteUser(u.userId)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        message={snack.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Container>
  );
}
