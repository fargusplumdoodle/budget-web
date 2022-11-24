import { Route, Routes } from "react-router-dom";
import * as React from "react";
import { FunctionComponent } from "react";
import Dashboard from "@mui/icons-material/Dashboard";
import Settings from "@mui/icons-material/Settings";
import CompareArrows from "@mui/icons-material/CompareArrows";
import List from "@mui/icons-material/List";
import AttachMoney from "@mui/icons-material/AttachMoney";
import TrendingUp from "@mui/icons-material/TrendingUp";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Callback from "../components/auth/Callback";
import InitLoading from "../components/InitLoading";
import {
  DashboardPage,
  BudgetsPage,
  TransactionsPage,
  UserInfoPage,
  BudgetDetailPage,
  TransferPage,
} from "../views";

export type RouteType = {
  path: string;
  element: React.ReactElement | React.FunctionComponent;
  title?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
};

export const ROUTES: { [name: string]: RouteType } = {
  DASHBOARD: {
    path: "/",
    element: <DashboardPage />,
    title: "Dashboard",
    icon: Dashboard,
  },
  AUTH_CALLBACK: { path: "/auth/callback", element: <Callback /> },
  TRANSACTIONS_LIST: {
    path: "/transactions/list",
    element: <TransactionsPage />,
    title: "Transactions",
    icon: List,
  },
  TRANSFER: {
    path: "/transactions/transfer",
    element: <TransferPage />,
    title: "Transfer",
    icon: CompareArrows,
  },
  TRANSACTION_REPORT: {
    path: "/transactions/reports",
    element: <InitLoading />,
    title: "Reports",
    icon: TrendingUp,
  },
  SETTINGS: {
    path: "/user/info",
    element: <UserInfoPage />,
    title: "Settings",
    icon: Settings,
  },
  BUDGET_LIST: {
    path: "/budget",
    element: <BudgetsPage />,
    title: "Budgets",
    icon: AttachMoney,
  },
  BUDGET_DETAIL: {
    path: "/budget/:id",
    element: <BudgetDetailPage />,
  },
};

const AppRoutes: FunctionComponent<{}> = () => (
  <Routes>
    {Object.values(ROUTES).map((route) => (
      <Route key={Object.values(ROUTES).indexOf(route)} {...route} />
    ))}
  </Routes>
);

export default AppRoutes;
