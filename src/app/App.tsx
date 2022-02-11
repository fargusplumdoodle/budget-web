import * as React from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import SideBar from "../components/common/layout/SideBar";
import InitializeData from "./InitializeData";

function App() {
  return (
    <>
      <InitializeData />
      <div className="App">
        <SideBar />
        <div className="content">
          <AppRoutes />
        </div>
      </div>
    </>
  );
}

export default App;
