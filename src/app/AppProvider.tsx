import * as React from "react";
import { ReactElement } from "react";
import { LocalizationProvider } from "@mui/lab";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme";
import { SnackbarProvider } from "notistack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "../store/configureStore";
import AuthProvider from "./AuthProvider";
import { PersistGate } from "redux-persist/integration/react";

type AppProviderProps = {
  children: ReactElement[] | ReactElement;
};

const AppProvider: React.FC<AppProviderProps> = function ({ children }) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ThemeProvider theme={darkTheme}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <SnackbarProvider
                  maxSnack={3}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <AuthProvider>{children}</AuthProvider>
                </SnackbarProvider>
              </LocalizationProvider>
            </ThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

export default AppProvider;
