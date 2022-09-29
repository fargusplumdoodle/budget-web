import * as React from "react";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { Button, SxProps } from "@mui/material";
import settings from "../../app/settings";
import {resetAuth} from "../../store/auth";

interface Props {
  sx?: SxProps;
}

const AuthButton: FunctionComponent<Props> = ({ sx }) => {
  const dispatch = useDispatch();
  const authenticated = useSelector(
    (state: RootState) => state.auth.authenticated
  );

  return (
    <Button
      variant="contained"
      sx={{ ...sx }}
      onClick={() => {
        if (authenticated) {
          dispatch(resetAuth());
        } else {
          window.location.assign(settings.auth.ApiLoginUrl);
        }
      }}
    >
      {authenticated ? "LOG OUT" : "LOG IN"}
    </Button>
  );
};

export default AuthButton;
