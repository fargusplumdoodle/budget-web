import { PayloadAction } from "@reduxjs/toolkit";
import initialState from "../initialState";
import {
  CLOSE_ALL_PANES,
  OPEN_TRANSACTION_PANE,
  OPEN_THEME_PANE,
} from "../actions/actionTypes";
import { PanesState } from "../types/stateTypes";
import { Transaction } from "../models/types";

export default function panesReducer(
  state: PanesState = initialState.panes,
  action: PayloadAction<Transaction | undefined>
): PanesState {
  switch (action.type) {
    case OPEN_THEME_PANE:
      return { ...state, current: "theme" };
    case CLOSE_ALL_PANES:
      return { ...initialState.panes };
    case OPEN_TRANSACTION_PANE:
      return {
        ...state,
        current: "transaction",
        transaction: action.payload as Transaction,
      };
    default:
      return state;
  }
}
