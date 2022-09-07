import { PayloadAction } from "@reduxjs/toolkit";
import initialState from "../initialState";
import { CLOSE_ALL_PANES, OPEN_THEME_PANE } from "../actions/actionTypes";
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
    default:
      return state;
  }
}
