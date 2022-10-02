import { RootState } from "../../configureStore";

export const selectOpenPane = (state: RootState) =>
  state.location.panes.current;

export const selectPaneEditTransaction = (state: RootState) =>
  state.location.panes.transaction;
