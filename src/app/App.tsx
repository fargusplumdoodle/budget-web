import * as React from "react";
import Header from "../components/navigation/Header";
import "./App.css";
import AppRoutes from "./AppRoutes";
import InitializeData from "./InitializeData";

function App() {
  return (
    <>
      <InitializeData />
      <div className="App">
        <Header />
        <div className="content">
          <AppRoutes />
        </div>
      </div>
    </>
  );
}

export default App;
