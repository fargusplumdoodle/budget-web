import * as React from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import Header from "../components/common/layout/Header";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme";
import SideBar from "../components/common/layout/SideBar";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Header />
        <div className="App">
          <SideBar />
          <div className="content">
            <AppRoutes />
          </div>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
