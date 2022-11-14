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
    <Grid container gap={2}>
      <Grid item container wrap="nowrap" justifyContent="space-between">
        <Grid item component={Typography} variant="body1">
          {initialBudget ? "Edit" : "Add"} Budget
        </Grid>
        {loading ? (
          <Grid item component={CircularProgress} size={24} />
        ) : (
          <Grid item component={Typography} variant="body1">
            {initialBudget?.id}
          </Grid>
        )}
      </Grid>
      <Grid item>
        <BudgetForm
          budget={initialBudget}
          onSubmit={onSubmit}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
};

export default BudgetPane;
