import { Transaction } from "../types/models";
import { transactionActionTypes } from "./actionTypes";

export function loadTransactionsSuccess(transactions: Transaction[]) {
  return {
    type: transactionActionTypes.LOAD_TRANSACTIONS_SUCCESS,
    payload: transactions,
  };
}
