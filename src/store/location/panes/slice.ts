import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PanesState } from "./types";
import { Budget, Transaction } from "../../data";

export const initialState: PanesState = {
  current: "budget",
  transaction: null,
  budget: null,
};

export const sliceKey = "pane";
const paneSlice = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
    openThemePane(state: PanesState) {
      state.current = "theme";
    },
    closeAllPanes() {
      return { ...initialState };
    },
    openTransactionPane(
      state: PanesState,
      action: PayloadAction<Transaction | null>
    ) {
      state.current = "transaction";
      state.transaction = action.payload;
    },
    openBudgetPane(state: PanesState, action: PayloadAction<Budget | null>) {
      state.current = "budget";
      state.budget = action.payload;
    },
  },
});
export const {
  openThemePane,
  closeAllPanes,
  openTransactionPane,
  openBudgetPane,
} = paneSlice.actions;
export default paneSlice.reducer;
