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
      console.log("setting auth", action.payload);
      return { ...action.payload };
    default:
      return state;
  }
}
