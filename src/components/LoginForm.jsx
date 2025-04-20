import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Alert,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function LoginForm({ title, onSubmit, submitText, footer }) {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handle = async (e) => {
    e.preventDefault();
    setError("");

    // 4. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }

    try {
      await onSubmit({ email, password });
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handle}
      sx={{
        maxWidth: 360,
        m: "auto",
        mt: 8,
        p: 3,
        boxShadow: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        borderTop: `4px solid ${theme.palette.primary.main}`, // 3. Amaranth border
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ color: theme.palette.primary.main }} // 3. Colored header
      >
        {title}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Email"
        type="email"
        fullWidth
        required
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"} // 2. toggle
        fullWidth
        required
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((vis) => !vis)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        {submitText}
      </Button>

      {footer && <Box sx={{ mt: 2 }}>{footer}</Box>}
    </Box>
  );
}
