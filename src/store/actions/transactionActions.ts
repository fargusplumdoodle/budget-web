import { Transaction } from "../types/models";
import { transactionActionTypes } from "./actionTypes";
import { AppDispatch } from "../configureStore";
import { apiCallError, beginApiCall } from "./apiStatusActions";
import * as transactionAPI from "../../api/transaction";

export function loadTransactionsSuccess(transactions: Transaction[]) {
  return {
    type: transactionActionTypes.LOAD_TRANSACTIONS_SUCCESS,
    payload: transactions,
  };
}

export function fetchTransactions() {
  return async (dispatch: AppDispatch) => {
    dispatch(beginApiCall());
    transactionAPI
      .receiveTransactions()
      .then((transactions: Transaction[]) => {
        dispatch(loadTransactionsSuccess(transactions));
      })
      .catch((err) => {
        dispatch(apiCallError());
        //throw err;
      });
  };
}
