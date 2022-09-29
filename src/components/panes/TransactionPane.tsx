import React, { FunctionComponent, useState } from "react";
import { RootState } from "../../store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import TransactionForm from "../forms/TransactionForm/TransactionForm";
import { Transaction } from "../../store/models/types";
import { getTransactionHash } from "../../store/models/utils";
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "../../store/actions/transactionActions";
import { CircularProgress, Grid, Typography } from "@mui/material";

const TransactionPane: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const initialTransaction = useSelector(
    (state: RootState) => state.panes.transaction
  );
  const [savingTransaction, setSavingTransaction] =
    useState(initialTransaction);
  // TODO: Close pane on save

  const transactionHash = savingTransaction
    ? getTransactionHash(savingTransaction)
    : "";

  const stateStatus = useSelector(
    (state: RootState) => state.transactions.stateStatus
  );
  const loading = stateStatus[transactionHash]
    ? stateStatus[transactionHash]?.status !== "loaded"
    : false;

  const onSubmit = (newTransaction: Transaction) => {
    setSavingTransaction(newTransaction);
    const submitFn = newTransaction.id ? updateTransaction : createTransaction;
    dispatch(submitFn(newTransaction));
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
