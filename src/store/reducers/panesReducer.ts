import { PayloadAction } from "@reduxjs/toolkit";
import initialState from "../initialState";
import {
  CLOSE_ALL_PANES,
  CLOSE_THEME_PANE,
  OPEN_THEME_PANE,
} from "../actions/actionTypes";
import { PanesState } from "../types/stateTypes";

export default function panesReducer(
  state = initialState.panes,
  action: PayloadAction<PanesState>
) {
  switch (action.type) {
    case OPEN_THEME_PANE:
      return { ...state, theme: true };
    case CLOSE_THEME_PANE:
      return { ...state, theme: false };
    case CLOSE_ALL_PANES:
      return { ...initialState.panes };
    default:
      return state;
  }
}
