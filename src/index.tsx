import "./app/index.css";
import App from "./app/App";
import * as ReactDOM from "react-dom";
import * as React from "react";
import AppProvider from "./app/providers/AppProvider";

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root")
);
export { rootReducer } from "./store/rootReducer";
