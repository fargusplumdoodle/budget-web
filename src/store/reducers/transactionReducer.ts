import initialState from "../initialState";
import { PayloadAction } from "@reduxjs/toolkit";
import { TransactionState } from "../types/stateTypes";
import { LOAD_TRANSACTIONS_SUCCESS } from "../actions/actionTypes";
import { Transaction } from "../models/types";

// TODO: REMOVE THIS
export default function transactionReducer(
  state: TransactionState = initialState.transactions,
  action: PayloadAction<Transaction[]>
): TransactionState {
  switch (action.type) {
    case LOAD_TRANSACTIONS_SUCCESS:
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
