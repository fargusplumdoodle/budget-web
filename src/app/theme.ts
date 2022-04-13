import { createTheme, ThemeOptions } from "@mui/material";

export const colors = {
  purple: "rgba(173, 20, 177, 1)",
  lightBlue: "rgba(24, 119, 177, 1)",
  darkBlue: "rgba(39, 10, 148, 1)",
};

export const theme: ThemeOptions = {
  palette: {
    mode: "dark",
    secondary: {
      main: colors.purple,
      contrastText: "#f7f7f7",
    },
    primary: {
      main: colors.lightBlue,
      dark: colors.darkBlue,
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
  ...theme,
  typography: {
    fontFamily: "Ubuntu",
  },
});
