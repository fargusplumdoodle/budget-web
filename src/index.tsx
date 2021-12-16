import "./app/index.css";
import App from "./app/App";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
