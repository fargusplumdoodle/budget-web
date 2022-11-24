import { RootState } from "../../types";

export const selectOpenPane = (state: RootState) =>
  state.location.panes.current;

export const selectPaneEditTransaction = (state: RootState) =>
  state.location.panes.transaction;

export const selectPaneEditBudget = (state: RootState) =>
  state.location.panes.budget;
