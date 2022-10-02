import React, { FunctionComponent } from "react";
import { Grid, Switch, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { THEMES } from "@fargusplumdoodle/themes";
import ThemeOption from "./ThemeOption";
import { selectThemeSettings, setSystemTheme } from "../../../store";

const ThemeForm: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { themeName, darkMode } = useSelector(selectThemeSettings);

  return (
    <>
      <Grid container spacing={1}>
        <Grid
          item
          container
          wrap="nowrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={6} component={Typography} variant="body1">
            Theme Select
          </Grid>
          <Grid
            item
            xs={4}
            container
            alignItems="center"
            justifyContent="flex-end"
          >
            <Grid item component={Typography} variant="body1" color="disabled">
              Dark
            </Grid>
            <Grid
              item
              component={Switch}
              onChange={() =>
                dispatch(setSystemTheme({ themeName, darkMode: !darkMode }))
              }
              checked={darkMode}
            />
          </Grid>
        </Grid>

        <Grid item container gap={1}>
          {Object.entries(THEMES).map(([theme, themeOption]) => (
            <ThemeOption
              key={theme}
              onChange={() => dispatch(setSystemTheme({ themeName, darkMode }))}
              darkMode={darkMode}
              selected={theme === themeName}
              themeOption={themeOption}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default ThemeForm;
