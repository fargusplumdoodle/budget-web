import { PayloadAction } from "@reduxjs/toolkit";
import initialState from "../initialState";
import { authActionTypes } from "../actions/actionTypes";
import { AuthState } from "../types/stateTypes";

export default function authReducer(
  state = initialState.auth,
  action: PayloadAction<AuthState>
) {
  switch (action.type) {
    case authActionTypes.SET_AUTH_TOKEN_SUCCESS:
      return { ...action.payload };
    case authActionTypes.CLEAR_AUTH_TOKEN:
      return { ...initialState.auth };
    default:
      return state;
  }
}
