import { Theme, ThemeProvider } from "@emotion/react";
import { ThemeOption, THEMES } from "@fargusplumdoodle/themes";
import React, { FunctionComponent, ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { UIState } from "../../store/types/stateTypes";

interface ThemeProviderProps {
  children: ReactNode | ReactNode[];
}

const BudgetThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  children,
}) => {
  const { themeName, darkMode } = useSelector(
    (state: RootState) => (state.ui as UIState).theme
  );
  console.log("here", themeName, darkMode);

  const theme: Theme = useMemo(() => {
    const theme: ThemeOption = THEMES[themeName];
    return darkMode ? theme.dark : theme.light;
  }, [themeName, darkMode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default BudgetThemeProvider;
