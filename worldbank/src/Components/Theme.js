import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ff8a50",
      main: "#ff5722",
      dark: "#c41c00",
      contrastText: "#fafafa",
    },
    secondary: {
      light: "#ffffff",
      main: "#90a4ae",
      dark: "#c2c2c2",
      contrastText: "#000",
    },
  },
});

export default theme;
