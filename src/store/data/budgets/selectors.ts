import { RootState } from "../../configureStore";

export const selectBudgetById = (id: number) => (state: RootState) =>
  state.budgets.byId[id];

export const selectBudgetByName = (name: string) => (state: RootState) =>
  state.budgets.byName[name];

export const selectBudgetRoot = () => (state: RootState) => state.budgets.root;

export const selectBudgetList = (state: RootState) => state.budgets.list;
