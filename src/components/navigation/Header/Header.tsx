import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { ROUTES } from "../../../app/AppRoutes";
import { openTransactionPane, toggleMobileDrawer } from "../../../store";
import { useRoute } from "../../../hooks";
import AddCircle from "@mui/icons-material/AddCircle";
import HeaderMenuSettings from "./HeaderMenuSettings";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const dispatch = useDispatch();
  const currentRoute = useRoute();

  if (!currentRoute || currentRoute.path === ROUTES.AUTH_CALLBACK.path) {
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
            >
              <MenuIcon />
            </Grid>
            <Grid component={Typography} variant="body1">
              {currentRoute!.title}
            </Grid>
          </Grid>
          <Grid item container wrap="nowrap" justifyContent="flex-end">
            <IconButton onClick={() => dispatch(openTransactionPane(null))}>
              <AddCircle
                sx={(theme) => ({ color: theme.palette.secondary.main })}
              />
            </IconButton>
            <HeaderMenuSettings />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
