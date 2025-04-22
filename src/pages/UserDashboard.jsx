import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Switch,
  FormControlLabel,
  Snackbar,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Delete } from "@mui/icons-material";

import { fetchUserProfile, updateUserProfile } from "../services/authService";
import {
  listMyKeys,
  generateKey,
  updateKey,
  deleteKey,
} from "../services/apiKeyService";
import {
  fetchAllCountries,
  fetchCountryByName,
} from "../services/countryService";

export default function UserDashboard() {
  const token = localStorage.getItem("token");

  // Profile state
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");
  const [profileErr, setProfileErr] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  // API‑Keys state
  const [apiKeys, setApiKeys] = useState([]);
  const [keysLoading, setKeysLoading] = useState(false);
  const [genLoading, setGenLoading] = useState(false);
  const [keyMsg, setKeyMsg] = useState("");
  const [keyErr, setKeyErr] = useState("");

  // Country lookup state
  const [selectedKey, setSelectedKey] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryLoading, setCountryLoading] = useState(false);
  const [countryErr, setCountryErr] = useState("");

  // Snackbar
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Load profile & keys
  useEffect(() => {
    async function load() {
      setProfileLoading(true);
      try {
        const res = await fetchUserProfile(token);
        if (res.error) throw new Error(res.error);
        setProfile(res.data);
        setEmail(res.data.email);
      } catch (err) {
        setProfileErr(err.message);
      }
      setProfileLoading(false);

      setKeysLoading(true);
      try {
        //const res2 = await listMyKeys(token);
        const keysRes = await listMyKeys(token);
        const keys = Array.isArray(keysRes) ? keysRes : keysRes.data || [];
        setApiKeys(keys);
      } catch (err) {
        setKeyErr(err.message);
      }
      setKeysLoading(false);
    }
    load();
  }, [token]);

  // Profile update
  const handleProfileUpdate = async () => {
    setProfileErr("");
    setProfileMsg("");
    setProfileLoading(true);
    try {
      const res = await updateUserProfile(token, {
        email,
        ...(newPassword ? { password: newPassword } : {}),
      });
      if (res.error) throw new Error(res.error);
      setProfile(res.data);
      setNewPassword("");
      setSnack({ open: true, message: "Profile updated", severity: "success" });
    } catch (err) {
      setSnack({ open: true, message: err.message, severity: "error" });
    }
    setProfileLoading(false);
  };

  // Generate key
  const handleGenerate = async () => {
    setKeyErr("");
    setKeyMsg("");
    setGenLoading(true);
    try {
      //const res = await generateKey(token);
      //if (res.error) throw new Error(res.error);
      //setApiKeys((prev) => [...prev, res]);
      const newKey = await generateKey(token);
      setApiKeys((prev) => [...prev, newKey]);
      setSnack({ open: true, message: "API key created", severity: "success" });
    } catch (err) {
      setSnack({ open: true, message: err.message, severity: "error" });
    }
    setGenLoading(false);
  };

  // Toggle active
  const handleToggle = async (id, current) => {
    try {
      const res = await updateKey(token, id, { active: current ? 0 : 1 });
      if (res.error) throw new Error(res.error);
      setApiKeys((prev) => prev.map((k) => (k.id === id ? res : k)));
    } catch (err) {
      setSnack({ open: true, message: err.message, severity: "error" });
    }
  };

  // Delete key
  const handleDelete = async (id) => {
    try {
      await deleteKey(token, id);
      setApiKeys((prev) => prev.filter((k) => k.id !== id));
      setSnack({ open: true, message: "API key deleted", severity: "info" });
      if (
        selectedKey &&
        apiKeys.find((k) => k.id === id)?.api_key === selectedKey
      )
        setSelectedKey("");
    } catch (err) {
      setSnack({ open: true, message: err.message, severity: "error" });
    }
  };

  // Country search
  const handleSearch = async () => {
    if (!selectedKey) {
      setCountryErr("Select an API key");
      return;
    }
    setCountryErr("");
    setCountryLoading(true);
    try {
      const res = countryName
        ? await fetchCountryByName(countryName, selectedKey)
        : await fetchAllCountries(selectedKey);
      if (res.error) throw new Error(res.error);
      setCountries(res);
    } catch (err) {
      setCountryErr(err.message);
    }
    setCountryLoading(false);
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {profile?.userName || "User"}!
      </Typography>

      {/* Profile */}
      <Box sx={{ p: 3, mb: 4, boxShadow: 2, borderRadius: 2 }}>
        <Typography variant="h6">Your Profile</Typography>
        {profileLoading ? (
          <CircularProgress />
        ) : (
          <>
            <TextField
              label="Email"
              fullWidth
              sx={{ mt: 2 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="New Password"
              type={showPwd ? "text" : "password"}
              fullWidth
              sx={{ mt: 2 }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPwd((v) => !v)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPwd ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleProfileUpdate}
              disabled={profileLoading}
            >
              Update Profile
            </Button>
          </>
        )}
      </Box>

      {/* API‑Key Management */}
      <Box sx={{ p: 3, mb: 4, boxShadow: 2, borderRadius: 2 }}>
        <Typography variant="h6">Your API Keys</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={genLoading ? <CircularProgress size={20} /> : null}
          sx={{ mt: 2, mb: 2 }}
          onClick={handleGenerate}
          disabled={genLoading}
        >
          Generate New Key
        </Button>

        {keysLoading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Key</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Usage</TableCell>
                  <TableCell>Last Used</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiKeys.map((k) => (
                  <TableRow key={k.id} hover>
                    <TableCell>{k.id}</TableCell>
                    <TableCell sx={{ fontFamily: "monospace" }}>
                      {k.api_key}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={!!k.active}
                        onChange={() => handleToggle(k.id, k.active)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>{k.usage_count}</TableCell>
                    <TableCell>{k.last_used || "-"}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(k.id)}
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

      {/* Country Lookup */}
      <Box sx={{ p: 3, mb: 4, boxShadow: 2, borderRadius: 2 }}>
        <Typography variant="h6">Country Lookup</Typography>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="key-label">API Key</InputLabel>
          <Select
            labelId="key-label"
            value={selectedKey}
            label="API Key"
            onChange={(e) => setSelectedKey(e.target.value)}
          >
            {apiKeys.map((k) => (
              <MenuItem key={k.id} value={k.api_key}>
                {k.api_key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <TextField
            label="Country Name (optional)"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            disabled={countryLoading}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={countryLoading}
          >
            {countryLoading ? <CircularProgress size={20} /> : "Go"}
          </Button>
        </Box>
        {countryErr && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {countryErr}
          </Alert>
        )}

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {countries.map((c) => (
            <Grid item xs={12} sm={6} md={4} key={c.name}>
              <Card>
                {c.flag && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={c.flag}
                    alt={`${c.name} flag`}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{c.name}</Typography>
                  <Typography variant="body2">
                    Capital: {c.capital || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    Languages:{" "}
                    {c.languages
                      ? Object.values(c.languages).join(", ")
                      : "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    Currencies:{" "}
                    {c.currencies
                      ? Object.values(c.currencies)
                          .map((v) => v.name)
                          .join(", ")
                      : "N/A"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Snackbars */}
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
