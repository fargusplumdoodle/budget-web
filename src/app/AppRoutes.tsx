import { Route, Routes } from "react-router-dom";
import * as React from "react";
import { FunctionComponent } from "react";
import Callback from "../components/auth/Callback";
import InitLoading from "../components/InitLoading";
import {
  DashboardPage,
  BudgetsPage,
  AddTransactionsPage,
  TransactionsPage,
  UserInfoPage,
  BudgetDetailPage,
} from "../views";
import {
  Dashboard,
  Settings,
  Add,
  List,
  AttachMoney,
  TrendingUp,
  Search,
} from "@mui/icons-material";
import QueryView from "../views/QueryView";

export type RouteType = {
  path: string;
  element: React.ReactElement;
  title?: string;
  icon?: React.ReactElement;
};

export const ROUTES: { [name: string]: RouteType } = {
  DASHBOARD: {
    path: "/",
    element: <DashboardPage />,
    title: "Dashboard",
    icon: <Dashboard />,
  },
  AUTH_CALLBACK: { path: "/auth/callback", element: <Callback /> },
  QUERY: {
    path: "/transactions/query",
    element: <QueryView/>,
    title: "Query",
    icon: <Search/>,
  },
  TRANSACTIONS_LIST: {
    path: "/transactions/list",
    element: <TransactionsPage />,
    title: "Transactions",
    icon: <List />,
  },
  TRANSACTIONS_ADD: {
    path: "/transactions/add",
    element: <AddTransactionsPage />,
    title: "Add Transactions",
    icon: <Add />,
  },
  TRANSACTION_REPORT: {
    path: "/transactions/reports",
    element: <InitLoading />,
    title: "Reports",
    icon: <TrendingUp />,
  },
  SETTINGS: {
    path: "/user/info",
    element: <UserInfoPage />,
    title: "Settings",
    icon: <Settings />,
  },
  BUDGET_LIST: {
    path: "/budget",
    element: <BudgetsPage />,
    title: "Budgets",
    icon: <AttachMoney />,
  },
  BUDGET_DETAIL: {
    path: "/budget/:id",
    element: <BudgetDetailPage />,
  },
};

const AppRoutes: FunctionComponent<{}> = () => {
  return (
    <Routes>
      {Object.values(ROUTES).map((route) => (
        <Route key={Object.values(ROUTES).indexOf(route)} {...route} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
