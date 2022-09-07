import * as React from "react";
import { ReactElement } from "react";
import { LocalizationProvider } from "@mui/lab";
import { SnackbarProvider } from "notistack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import BudgetThemeProvider from "./BudgetThemeProvider";
import PaneProvider from "./PaneProvider";
import { persistor, store } from "../../store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { CssBaseline } from "@mui/material";
import DataProvider from "./DataProvider";

type AppProviderProps = {
  children: ReactElement[] | ReactElement;
};

const AppProvider: React.FC<AppProviderProps> = function ({ children }) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <AuthProvider>
                <DataProvider>
                  <BudgetThemeProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <CssBaseline />
                      <PaneProvider />
                      {children}
                    </LocalizationProvider>
                  </BudgetThemeProvider>
                </DataProvider>
              </AuthProvider>
            </SnackbarProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

export default AppProvider;
