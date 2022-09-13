import { PayloadAction } from "@reduxjs/toolkit";
import initialState from "../initialState";
import { SET_SYSTEM_THEME, TOGGLE_MOBILE_DRAWER } from "../actions/actionTypes";
import { UIState } from "../types/stateTypes";

export default function uiReducer(
  state: UIState = initialState.ui,
  action: PayloadAction<UIState>
): UIState {
  switch (action.type) {
    case SET_SYSTEM_THEME:
      return { ...state, ...action.payload };
    case TOGGLE_MOBILE_DRAWER:
      return { ...state, mobileDrawerOpen: !state.mobileDrawerOpen };
    default:
      return state;
  }
}
