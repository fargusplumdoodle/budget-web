import * as ReactDOM from "react-dom";
import * as React from "react";
import App from "./app/App";
import AppProvider from "./app/providers/AppProvider";

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root")
);
