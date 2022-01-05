import initialState from "../initialState";
import { PayloadAction } from "@reduxjs/toolkit";
import { TransactionState } from "../types/stateTypes";
import { transactionActionTypes } from "../actions/actionTypes";
import { Transaction } from "../types/models";

export default function transactionReducer(
  state: TransactionState = initialState.transactions,
  action: PayloadAction<Transaction[]>
): TransactionState {
  switch (action.type) {
    case transactionActionTypes.LOAD_TRANSACTIONS_SUCCESS:
      const transactions = [...action.payload];
      return {
        list: transactions,
        byId: Object.fromEntries(
          transactions.map((transaction) => [transaction.id, transaction])
        ),
      };
    default:
      return state;
  }
}
