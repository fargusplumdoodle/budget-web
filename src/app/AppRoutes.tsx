import { Route, Routes } from "react-router-dom";
import * as React from "react";
import { FunctionComponent } from "react";
import Callback from "../components/auth/Callback";
import DashboardPage from "../components/dashboard/DashboardPage";
import TransactionsPage from "../components/transactions/TransactionsPage";

interface OwnProps {}
type Props = OwnProps;

const AppRoutes: FunctionComponent<Props> = (props) => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/auth/callback" element={<Callback />} />
      <Route path="/transactions" element={<TransactionsPage />} />
    </Routes>
  );
};

export default AppRoutes;
