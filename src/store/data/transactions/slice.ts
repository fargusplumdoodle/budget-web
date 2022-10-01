import { createSlice } from "@reduxjs/toolkit";
import {
  Transaction,
  TransactionState,
  UpdateTransactionPayloadAction,
} from "./types";
import {
  allObjectsExcept,
  allObjectsExceptInList,
  modelById,
} from "../../models/utils";

const initialState: TransactionState = {
  list: [],
  byId: {},
};

export const sliceKey = "transaction";
const transactionSlice = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
    loadTransactions(state: TransactionState, action) {
      const transactions = [...(action.payload as Transaction[])];
      state.list = [
        ...state.list.filter(allObjectsExceptInList(transactions)),
        ...transactions,
      ];
      state.byId = modelById(state.list);
    },
    loadTransaction(state: TransactionState, { payload }) {
      const transaction: Transaction = payload;
      state.list = [
        ...state.list.filter(allObjectsExcept(transaction.id!)),
        transaction,
      ];
      state.byId[transaction.id!] = transaction;
    },
    createTransaction(state, _) {
      return state;
    },
    deleteTransaction(state, { payload }) {
      const transaction: Transaction = payload;
      state.list = [...state.list.filter(allObjectsExcept(transaction.id!))];
      delete state.byId[transaction.id!];
    },
    updateTransaction(state, { payload }: UpdateTransactionPayloadAction) {
      const transaction: Transaction = { ...payload.newTransaction };
      state.list = [
        ...state.list.filter(allObjectsExcept(transaction.id!)),
        transaction,
      ];
      state.byId[transaction.id!] = transaction;
    },
  },
});
export const {
  loadTransactions,
  loadTransaction,
  deleteTransaction,
  createTransaction,
  updateTransaction,
} = transactionSlice.actions;
export default transactionSlice.reducer;
