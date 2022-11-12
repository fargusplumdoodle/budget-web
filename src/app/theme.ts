import { ThemeOptions } from "@mui/material";

export const colors = {
  purple: "rgba(173, 20, 177, 1)",
  lightBlue: "rgba(24, 119, 177, 1)",
  lightBlue2: "rgba(8, 138, 161, 1)",
  darkBlue: "rgba(39, 10, 148, 1)",
  subtleBlue: "rgba(24, 119, 177, 0.08)",
  textBlue: "rgba(23, 113, 168, 1)",
  red: "rgba(244, 67, 54, 1)",

  dark: "#1D1F20",
};

export const transparentColors = {
  purple: (opacity: number) => `rgba(173, 20, 177, ${opacity})`,
  white: (opacity: number) => `rgba(255, 255, 255, ${opacity})`,
  lightBlue: (opacity: number) => `rgba(24, 119, 177, ${opacity})`,
  lightBlue2: (opacity: number) => `rgba(8, 138, 161, ${opacity})`,
  darkBlue: (opacity: number) => `rgba(39, 10, 148, ${opacity})`,
  subtleBlue: (opacity: number) => `rgba(24, 119, 177, ${opacity})`,
  textBlue: (opacity: number) => `rgba(23, 113, 168, ${opacity})`,
  red: (opacity: number) => `rgba(244, 67, 54, ${opacity})`,
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
      default: colors.dark,
      paper: colors.dark,
    },
    warning: {
      main: "#2f271b",
      light: "#8a7045",
    },
  },
};
