import * as React from "react";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, SxProps } from "@mui/material";
import settings from "../../app/settings";
import { resetAuth, selectAuthState } from "../../store";

interface Props {
  sx?: SxProps;
}

const AuthButton: FunctionComponent<Props> = ({ sx }) => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuthState);

  return (
    <Button
      variant="contained"
      sx={{ ...sx }}
      onClick={() => {
        if (auth.authenticated) {
          dispatch(resetAuth());
        } else {
          window.location.assign(settings.auth.ApiLoginUrl);
        }
      }}
    >
      {auth ? "LOG OUT" : "LOG IN"}
    </Button>
  );
};

export default AuthButton;
