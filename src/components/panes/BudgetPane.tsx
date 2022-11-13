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
} from "../../store";
import BudgetForm from "../forms/BudgetForm";

const BudgetPane: FunctionComponent = () => {
  const dispatch = useDispatch();
  const initialTransaction = useSelector(selectPaneEditTransaction);
  const [savingTransaction, setSavingTransaction] =
    useState(initialTransaction);

  const requestState = useSelector(
    selectRequestByModel("transaction", savingTransaction)
  );
  const loading = requestState ? requestState.status !== "loaded" : false;

  const onSubmit = (budget: Budget) => {};

  return (
    <Grid container gap={2}>
      <Grid item container wrap="nowrap" justifyContent="space-between">
        <Grid item component={Typography} variant="body1">
          {initialTransaction ? "Edit" : "Add"} Budget
        </Grid>
        {loading ? (
          <Grid item component={CircularProgress} size={24} />
        ) : (
          <Grid item component={Typography} variant="body1">
            {initialTransaction?.id}
          </Grid>
        )}
      </Grid>
      <Grid item>
        <BudgetForm budget={null} onSubmit={onSubmit} loading={loading} />
      </Grid>
    </Grid>
  );
};

export default BudgetPane;
