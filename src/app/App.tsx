import * as React from "react";
import Header from "../components/navigation/Header";
import "./App.css";
import AppRoutes from "./AppRoutes";
import DataProvider from "./providers/DataProvider";

const App: React.FunctionComponent = () => {
  return (
    <DataProvider>
      <div className="App">
        <Header />
        <div className="content">
          <AppRoutes />
        </div>
      </div>
    </DataProvider>
  );
};

export default App;
