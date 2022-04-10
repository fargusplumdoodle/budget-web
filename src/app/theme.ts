import { createTheme, ThemeOptions } from "@mui/material";

export const colors = {
  purple: "#AD14B1",
  lightBlue: "#1877B1",
  darkBlue: "#270A94",
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
