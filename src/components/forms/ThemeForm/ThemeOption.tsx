import React, { FunctionComponent } from 'react';
import { ThemeOption as ThemeOptionType } from '@fargusplumdoodle/themes';
import { Grid, Tooltip, Typography } from '@mui/material';
import capitalise from 'lodash/capitalize';

interface Props {
  themeOption: ThemeOptionType;
  selected: boolean;
  darkMode: boolean;
  onChange: () => void;
  [prop: string]: any;
}

const colors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];

const ThemeOption: FunctionComponent<Props> = ({
  themeOption,
  selected,
  onChange,
  darkMode,
  ...other
}) => {
  const palette = darkMode
    ? themeOption.dark.palette
    : themeOption.light.palette;
  return (
    <Grid
      container
      onClick={onChange}
      justifyContent="space-between"
      wrap="nowrap"
      alignItems="center"
      sx={(theme) => ({
        borderRadius: '4px',
        width: '100%',
        paddingRight: 1,
        backgroundColor: selected ? 'primary.main' : 'opaque',
        color: selected
          ? theme.palette.primary.contrastText
          : theme.palette.text.primary,
        cursor: 'pointer',
      })}
      {...other}
    >
      <Grid item container wrap="nowrap">
        {colors.map((color) => (
          <Tooltip
            title={capitalise(color)}
            key={`${themeOption.label}-${color}`}
          >
            <Grid
              item
              sx={{
                width: 32,
                height: 32,
                backgroundColor: palette[color].main,
                borderTopLeftRadius: color === colors[0] ? '4px' : undefined,
                borderBottomLeftRadius: color === colors[0] ? '4px' : undefined,
              }}
            />
          </Tooltip>
        ))}
      </Grid>
      <Grid item component={Typography} variant="body1">
        {themeOption.label}
      </Grid>
    </Grid>
  );
};

export default ThemeOption;
