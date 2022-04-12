import { PayloadAction } from "@reduxjs/toolkit";
import initialState from "../initialState";
import {
  CLEAR_AUTH_TOKEN,
  SET_AUTH_TOKEN_SUCCESS,
  UPDATE_AUTH_STATUS,
} from "../actions/actionTypes";
import { AuthState, StateStatus } from "../types/stateTypes";

export default function authReducer(
  state = initialState.auth,
  action: PayloadAction<AuthState | StateStatus>
) {
  switch (action.type) {
    case SET_AUTH_TOKEN_SUCCESS:
      return { ...(action.payload as AuthState) };
    case CLEAR_AUTH_TOKEN:
      return { ...initialState.auth };
    case UPDATE_AUTH_STATUS:
      return { ...state, status: action.payload as StateStatus };
    default:
      return state;
  }
}
