import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PanesState } from "./types";
import { Transaction } from "../../data";

export const initialState: PanesState = {
  current: null,
  transaction: null,
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
  },
});
export const { openThemePane, closeAllPanes, openTransactionPane } =
  paneSlice.actions;
export default paneSlice.reducer;
