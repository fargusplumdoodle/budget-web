import { ThemeOption, THEMES } from "@fargusplumdoodle/themes";
import React, { FunctionComponent, ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { selectThemeSettings } from "../../store";

interface ThemeProviderProps {
  children: ReactNode | ReactNode[];
}

const BudgetThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  children,
}) => {
  const { themeName, darkMode } = useSelector(selectThemeSettings);

  const theme = useMemo(() => {
    const theme: ThemeOption = THEMES[themeName];
    return darkMode ? theme.dark : theme.light;
  }, [themeName, darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default BudgetThemeProvider;
