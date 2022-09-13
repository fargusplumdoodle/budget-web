import {
  AppBar,
  Grid,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { FunctionComponent } from "react";
import { ROUTES } from "../../app/AppRoutes";
import { colors } from "../../app/theme";
import { getCurrentRoute } from "../../util/routing";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { toggleMobileDrawer } from "../../store/actions/uiActions";
import { AddCircle, Settings } from "@mui/icons-material";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const dispatch = useDispatch();

  const currentRoute = getCurrentRoute();

  if (window.location.pathname === ROUTES.AUTH_CALLBACK.path) {
    return <></>;
  }

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ '&[class*="MuiAppBar-root"]': { boxShadow: "none" } }}
    >
      <Toolbar>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          wrap="nowrap"
        >
          <Grid item container wrap="nowrap" alignItems="center">
            <Grid
              component={IconButton}
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => dispatch(toggleMobileDrawer())}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </Grid>
            <Grid component={Typography} variant="body1">
              {currentRoute!.title}
            </Grid>
          </Grid>
          <Grid item container wrap="nowrap" justifyContent="flex-end">
            <IconButton>
              <AddCircle
                sx={(theme) => ({ color: theme.palette.secondary.main })}
              />
            </IconButton>
            <IconButton>
              <Settings />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
