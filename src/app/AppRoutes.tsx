import { Route, Routes } from "react-router-dom";
import * as React from "react";
import { FunctionComponent } from "react";
import Callback from "../components/auth/Callback";
import DashboardPage from "../components/dashboard/DashboardPage";
import TransactionsPage from "../pages/transactions_list/TransactionsPage";
import AddTransactionsPage from "../pages/transactions_add/AddTransactionsPage";

export const ROUTES = {
  DASHBOARD: { path: "/", element: <DashboardPage /> },
  AUTH_CALLBACK: { path: "/auth/callback", element: <Callback /> },
  TRANSACTIONS_LIST: {
    path: "/transactions/list",
    element: <TransactionsPage />,
  },
  TRANSACTIONS_ADD: {
    path: "/transactions/add",
    element: <AddTransactionsPage />,
  },
};

const AppRoutes: FunctionComponent<{}> = () => {
  return (
    <Routes>
      {Object.values(ROUTES).map((route) => (
        <Route {...route} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
