import React, { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Grid, Typography } from "@mui/material";
import TransactionForm from "../forms/TransactionForm/TransactionForm";
import {
  Transaction,
  selectPaneEditTransaction,
  createTransaction,
  deleteTransaction,
  updateTransaction,
  selectRequestByModel,
  Budget,
  selectPaneEditBudget,
  updateBudget,
  createBudget,
  closeAllPanes,
} from "../../store";
import BudgetForm from "../forms/BudgetForm";

const BudgetPane: FunctionComponent = () => {
  const dispatch = useDispatch();
  const initialBudget = useSelector(selectPaneEditBudget);
  const [savingBudget, setSavingBudget] = useState(initialBudget);

  const requestState = useSelector(
    selectRequestByModel("budget", savingBudget)
  );
  const loading = requestState ? requestState.status !== "loaded" : false;

  const onSubmit = (newBudget: Budget) => {
    setSavingBudget(newBudget);
    if (newBudget.id) {
      dispatch(
        updateBudget({
          ...newBudget,
        })
      );
    } else dispatch(createBudget(newBudget));
    dispatch(closeAllPanes());
  };

  return (
    <BudgetForm
      isNewBudget={!initialBudget?.id}
      budget={initialBudget}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default BudgetPane;
