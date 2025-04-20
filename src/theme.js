import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#AB274F", // Amaranth Purple
    },
    secondary: {
      main: "#FFD54F", // Soft Gold accent
    },
    background: {
      default: "#FAF5F0", // Very light beige
    },
    text: {
      primary: "#333333",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
