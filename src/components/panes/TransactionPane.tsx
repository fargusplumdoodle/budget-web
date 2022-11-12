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
} from "../../store";

const TransactionPane: FunctionComponent = () => {
  const dispatch = useDispatch();
  const initialTransaction = useSelector(selectPaneEditTransaction);
  const [savingTransaction, setSavingTransaction] =
    useState(initialTransaction);

  const requestState = useSelector(
    selectRequestByModel("transaction", savingTransaction)
  );
  const loading = requestState ? requestState.status !== "loaded" : false;

  const onSubmit = (newTransaction: Transaction) => {
    setSavingTransaction(newTransaction);
    if (newTransaction.id) {
      dispatch(
        updateTransaction({
          newTransaction,
          oldTransaction: initialTransaction!,
        })
      );
    } else dispatch(createTransaction(newTransaction));
  };

  return (
    <Grid container gap={2}>
      <Grid item container wrap="nowrap" justifyContent="space-between">
        <Grid item component={Typography} variant="body1">
          {initialTransaction ? "Edit" : "Add"} Transaction
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
        <TransactionForm
          transaction={initialTransaction}
          onSubmit={onSubmit}
          onDelete={(transaction: Transaction) =>
            dispatch(deleteTransaction(transaction))
          }
          loading={loading}
        />
      </Grid>
    </Grid>
  );
};

export default TransactionPane;
