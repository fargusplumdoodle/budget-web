import { PayloadAction } from "@reduxjs/toolkit";
import initialState from "../initialState";
import {
  CLOSE_ALL_PANES,
  EDIT_TRANSACTION,
  OPEN_THEME_PANE,
} from "../actions/actionTypes";
import { PanesState } from "../types/stateTypes";

export default function panesReducer(
  state: PanesState = initialState.panes,
  action: PayloadAction<PanesState>
): PanesState {
  switch (action.type) {
    case OPEN_THEME_PANE:
      return { ...state, current: "theme" };
    case CLOSE_ALL_PANES:
      return { ...initialState.panes };
    case EDIT_TRANSACTION:
      return {
        ...state,
        current: "transaction",
        transaction: action.payload.transaction,
      };
    default:
      return state;
  }
}
