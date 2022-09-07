import * as React from "react";
import Header from "../components/navigation/Header";
import "./App.css";
import AppRoutes from "./AppRoutes";
import { Box, Grid, styled } from "@mui/material";

const Root = styled(Grid)(() => ({
  maxWidth: 1500,
}));
const Content = styled(Box)(({ theme }) => ({
  padding: `0 ${theme.spacing(3)}`,
  flexGrow: 1,
}));

const App: React.FunctionComponent = () => {
  return (
    <Root container direction="column" justifyContent="center">
      <Grid item component={Header} />
      <Grid item container>
        <Content>
          <AppRoutes />
        </Content>
      </Grid>
    </Root>
  );
};

export default App;
