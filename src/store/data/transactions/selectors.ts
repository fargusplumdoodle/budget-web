import { RootState } from "../../configureStore";

export const selectTransactionById = (id: number) => (state: RootState) =>
  state.transactions.byId[id];

export const selectTransactionList = (state: RootState) =>
  state.transactions.list;
