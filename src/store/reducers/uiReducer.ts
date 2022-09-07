import { PayloadAction } from "@reduxjs/toolkit";
import initialState from "../initialState";
import { SET_SYSTEM_THEME } from "../actions/actionTypes";
import { UIState } from "../types/stateTypes";

export default function uiReducer(
  state: UIState = initialState.ui,
  action: PayloadAction<UIState>
): UIState {
  switch (action.type) {
    case SET_SYSTEM_THEME:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
