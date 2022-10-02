import initialState from "../initialState";
import { PayloadAction } from "@reduxjs/toolkit";
import { StateStatus, TransactionState } from "../types/stateTypes";
import {
  LOAD_TRANSACTION_SUCCESS,
  LOAD_TRANSACTIONS_SUCCESS,
  SET_TRANSACTION_STATE_STATUS,
} from "../actions/actionTypes";
import merge from "lodash/merge";
import { Transaction } from "../data/transactions/types";

export default function transactionReducer(
  state: TransactionState = initialState.transactions,
  action: PayloadAction<
    Transaction[] | Transaction | { hash: string; stateStatus: StateStatus }
  >
): TransactionState {
  switch (action.type) {
    case SET_TRANSACTION_STATE_STATUS:
      const { hash, stateStatus } = action.payload as {
        hash: string;
        stateStatus: StateStatus;
      };
      return merge({}, state, { stateStatus: { [hash]: stateStatus } });
    case LOAD_TRANSACTION_SUCCESS:
      const transaction = action.payload as Transaction;
      return merge({}, state, {
        list: [transaction],
        byId: { [transaction.id!]: transaction },
      });
    case LOAD_TRANSACTIONS_SUCCESS:
      const transactions = [...(action.payload as Transaction[])];
      return merge({}, state, {
        list: transactions,
        byId: Object.fromEntries(
          transactions.map((transaction) => [transaction.id, transaction])
        ),
      });
    default:
      return state;
  }
}
