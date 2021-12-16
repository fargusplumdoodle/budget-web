import * as React from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import Header from "../components/common/layout/Header";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme";
import SideBar from "../components/common/layout/SideBar";
import ActionButtons from "../components/common/layout/ActionButtons";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Header />
      <div className="App">
        <SideBar />
        <div className="content">
          <AppRoutes />
        </div>
        <ActionButtons />
      </div>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
