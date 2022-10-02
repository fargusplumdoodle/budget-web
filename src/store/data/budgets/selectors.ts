import { RootState } from "../../configureStore";
import { differenceInHours, parseISO } from "date-fns";

export const selectBudgetById = (id: number) => (state: RootState) =>
  state.budgets.byId[id];

export const selectBudgetByName = (name: string) => (state: RootState) =>
  state.budgets.byName[name];

export const selectBudgetRoot = () => (state: RootState) => state.budgets.root;

export const selectBudgetList = (state: RootState) => state.budgets.list;

export const selectBudgetsLastFetched = (state: RootState) =>
  state.budgets.lastFetch;

export const selectBudgetFetchRequired = (state: RootState) => {
  const list = selectBudgetList(state);
  if (list.length === 0) return true;

  const lastFetched = selectBudgetsLastFetched(state);
  if (!lastFetched) return true;

  return differenceInHours(parseISO(lastFetched), new Date()) > 24;
};
