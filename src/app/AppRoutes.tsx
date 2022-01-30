import { Route, Routes } from "react-router-dom";
import * as React from "react";
import { FunctionComponent } from "react";
import Callback from "../components/auth/Callback";
import DashboardPage from "../components/dashboard/DashboardPage";
import TransactionsPage from "../pages/transactions_list/TransactionsPage";
import AddTransactionsPage from "../pages/transactions_add/AddTransactionsPage";
import AddIncomePage from "../pages/transactions_income/AddIncomePage";

const AppRoutes: FunctionComponent<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/auth/callback" element={<Callback />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/transactions/add" element={<AddTransactionsPage />} />
      <Route path="/transactions/income" element={<AddIncomePage />} />
    </Routes>
  );
};

export default AppRoutes;
