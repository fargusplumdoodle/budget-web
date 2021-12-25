import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import * as React from "react";
import { FunctionComponent, ReactElement } from "react";
import settings from "../../../app/settings";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configureStore";
import { logOut } from "../../../store/actions/authActions";

interface OwnProps {}

type Props = OwnProps;

const Header: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(
    (state: RootState) => state.auth.authenticated
  );
  function getAuthButton(authenticated: boolean): ReactElement {
    if (authenticated) {
      return (
        <Button
          variant="contained"
          onClick={() => {
            dispatch(logOut());
          }}
        >
          LOG OUT
        </Button>
      );
    }
    return (
      <Button
        variant="contained"
        onClick={() => {
          window.location.assign(settings.auth.ApiLoginUrl);
        }}
      >
        LOGIN
      </Button>
    );
  }
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Budget
          </Typography>
          {getAuthButton(authenticated)}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
