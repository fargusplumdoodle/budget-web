import * as React from "react";
import { ReactElement } from "react";
import { LocalizationProvider } from "@mui/lab";
import { SnackbarProvider } from "notistack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store/configureStore";
import AuthProvider from "./AuthProvider";
import BudgetThemeProvider from "./BudgetThemeProvider";

type AppProviderProps = {
  children: ReactElement[] | ReactElement;
};

const AppProvider: React.FC<AppProviderProps> = function ({ children }) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <BudgetThemeProvider>
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
          </BudgetThemeProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default AppProvider;
