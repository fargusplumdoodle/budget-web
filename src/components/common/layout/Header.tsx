import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import * as React from "react";
import { FunctionComponent } from "react";
import settings from "../../../app/settings";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/configureStore";

interface OwnProps {}

type Props = OwnProps;

const Header: FunctionComponent<Props> = (props) => {
  const auth = useSelector((state: RootState) => state.auth);
  console.log("Authenticated: ", JSON.stringify(auth));
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Budget
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              window.location.assign(settings.auth.ApiLoginUrl);
            }}
          >
            LOGIN
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
