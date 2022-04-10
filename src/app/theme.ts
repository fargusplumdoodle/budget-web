import { createTheme, ThemeOptions } from "@mui/material";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    secondary: {
      main: "#AD14B1",
      contrastText: "#f7f7f7",
    },
    primary: {
      main: "#1877B1",
      dark: "#270A94",
    },
    background: {
      default: "#1D1F20",
      paper: "#1D1F20",
    },
    warning: {
      main: "#2f271b",
      light: "#8a7045",
    },
  },
};

export const darkTheme = createTheme({
  ...themeOptions,
  typography: {
    fontFamily: "Ubuntu",
  },
});
