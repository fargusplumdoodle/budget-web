import { Transaction } from "../models/types";
import { EDIT_TRANSACTION, LOAD_TRANSACTIONS_SUCCESS } from "./actionTypes";

export function loadTransactionsSuccess(transactions: Transaction[]) {
  return {
    type: LOAD_TRANSACTIONS_SUCCESS,
    payload: transactions,
  };
}

export function editTransaction(transaction: Transaction | null) {
  return {
    type: EDIT_TRANSACTION,
    payload: { transaction },
  };
}
