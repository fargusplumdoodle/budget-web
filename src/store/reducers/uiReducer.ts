import { PayloadAction } from "@reduxjs/toolkit";
import initialState from "../initialState";
import { SET_SYSTEM_THEME } from "../actions/actionTypes";
import { UIState } from "../types/stateTypes";

export default function uiReducer(
  state = initialState.ui,
  action: PayloadAction<UIState>
) {
  switch (action.type) {
    case SET_SYSTEM_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}
