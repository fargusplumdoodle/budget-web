import { createSlice } from "@reduxjs/toolkit";
import {Transaction, TransactionState} from "./types";
import {modelById} from "../models/utils";
import {getTransactionHash} from "./utils";

const initialState: TransactionState = {
  list: [],
  byId: {},
  newTransactions: {},
};

const allObjectsExcept = (id: number) =>  (t: Transaction) => t.id !== id)

export const sliceKey = "transaction";
const transactionSlice = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
    loadTransactions(state: TransactionState, action) {
      const transactions = [...(action.payload as Transaction[])];
      state.list.push( ...transactions)
      state.byId = modelById(state.list)
    },
    setTransaction(state: TransactionState, {payload}) {
      const transaction: Transaction = payload
      state.list = [...state.list.filter(allObjectsExcept(transaction.id!)), transaction]
      state.byId[transaction.id!] = transaction
    },
    createTransaction(state, {payload}) {
      const transaction: Transaction = payload
      const hash = getTransactionHash(transaction)
      state.newTransactions[hash] = transaction
    },
    deleteTransaction(state, {payload}) {
      const transaction: Transaction = payload
      state.list = [...state.list.filter(allObjectsExcept(transaction.id!)), transaction]
      delete state.byId[transaction.id!]
    },
    updateTransaction() {
    }
  },
});
export const { loadTransactions, setTransaction, deleteTransaction, createTransaction, updateTransaction } =
  transactionSlice.actions;
export default transactionSlice.reducer;
