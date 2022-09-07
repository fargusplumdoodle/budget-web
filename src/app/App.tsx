import * as React from "react";
import Header from "../components/navigation/Header";
import "./App.css";
import AppRoutes from "./AppRoutes";
import DataProvider from "./providers/DataProvider";
import { Box, styled } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  height: "100vh",
}));

const Content = styled(Box)(({ theme }) => ({
  padding: `0 ${theme.spacing(3)}`,
}));

const App: React.FunctionComponent = () => {
  return (
    <DataProvider>
      <Container>
        <Header />
        <Content>
          <AppRoutes />
        </Content>
      </Container>
    </DataProvider>
  );
};

export default App;
