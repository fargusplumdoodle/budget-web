import { RootState } from "../../types";

export const selectTransactionById = (id: number) => (state: RootState) =>
  state.data.transactions.byId[id];

export const selectTransactionList = (state: RootState) =>
  state.data.transactions.list;
