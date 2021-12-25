import "./app/index.css";
import App from "./app/App";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./store/configureStore";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
