import * as React from "react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import AuthProvider from "./AuthProvider";
import BudgetThemeProvider from "./BudgetThemeProvider";
import PaneProvider from "./PaneProvider";
import { persistor, store } from "../../store";
import DataProvider from "./DataProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TagDialogProvider from "./TagDialogProvider";

type AppProviderProps = {
  children: ReactElement[] | ReactElement;
};

const AppProvider: React.FC<AppProviderProps> = function ({ children }) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <BudgetThemeProvider>
              <AuthProvider>
                <DataProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <PaneProvider />
                    <TagDialogProvider>{children}</TagDialogProvider>
                  </LocalizationProvider>
                </DataProvider>
              </AuthProvider>
            </BudgetThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

export default AppProvider;
