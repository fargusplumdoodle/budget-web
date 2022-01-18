import { Transaction } from "../types/models";
import { LOAD_TRANSACTIONS_SUCCESS } from "./actionTypes";

export function loadTransactionsSuccess(transactions: Transaction[]) {
  return {
    type: LOAD_TRANSACTIONS_SUCCESS,
    payload: transactions,
  };
}
