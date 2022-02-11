import "./app/index.css";
import App from "./app/App";
import * as ReactDOM from "react-dom";
import * as React from "react";
import AppProvider from "./app/AppProvider";

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root")
);
