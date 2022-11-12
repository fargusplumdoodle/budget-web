import { differenceInHours, parseISO } from "date-fns";
import lowerCase from "lodash/lowerCase";
import { RootState } from "../../types";

export const selectBudgetById = (id: number) => (state: RootState) =>
  state.data.budgets.byId[id];

export const selectBudgetByName = (name: string) => (state: RootState) =>
  state.data.budgets.byName[lowerCase(name)];

export const selectBudgetRoot = (state: RootState) => state.data.budgets.root;

export const selectBudgetList = (state: RootState) => state.data.budgets.list;
export const selectBudgetsById = (state: RootState) => state.data.budgets.byId;

export const selectBudgetsLastFetched = (state: RootState) =>
  state.data.budgets.lastFetch;

export const selectBudgetFetchRequired = (state: RootState) => {
  const list = selectBudgetList(state);
  if (list.length === 0) return true;

  const lastFetched = selectBudgetsLastFetched(state);
  if (!lastFetched) return true;

  return differenceInHours(parseISO(lastFetched), new Date()) > 24;
};
