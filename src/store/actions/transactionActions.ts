import {
  OPEN_TRANSACTION_PANE,
  LOAD_TRANSACTIONS_SUCCESS,
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  LOAD_TRANSACTION_SUCCESS,
  SET_TRANSACTION_STATE_STATUS,
} from "./actionTypes";
import { StateStatus } from "../types/stateTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { getTransactionHash } from "../data/transactions/utils";
import { Transaction } from "../data/transactions/types";

export function loadTransactionsSuccess(transactions: Transaction[]) {
  return {
    type: LOAD_TRANSACTIONS_SUCCESS,
    payload: transactions,
  };
}

export function loadTransactionSuccess(transaction: Transaction) {
  return {
    type: LOAD_TRANSACTION_SUCCESS,
    payload: transaction,
  };
}

export function openTransactionPane(transaction: Transaction | null) {
  return {
    type: OPEN_TRANSACTION_PANE,
    payload: transaction,
  };
}

export function createTransaction(
  transaction: Transaction
): PayloadAction<Transaction> {
  return {
    type: CREATE_TRANSACTION,
    payload: transaction,
  };
}

export function updateTransaction(
  transaction: Transaction
): PayloadAction<Transaction> {
  return {
    type: UPDATE_TRANSACTION,
    payload: transaction,
  };
}

export function deleteTransaction(
  transaction: Transaction
): PayloadAction<Transaction> {
  return {
    type: DELETE_TRANSACTION,
    payload: transaction,
  };
}

export function setTransactionStateStatus(
  transaction: Transaction,
  stateStatus: StateStatus
) {
  const hash = getTransactionHash(transaction);
  return {
    type: SET_TRANSACTION_STATE_STATUS,
    payload: {
      hash,
      stateStatus,
    },
  };
}
