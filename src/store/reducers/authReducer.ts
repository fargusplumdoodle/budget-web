import { PayloadAction } from "@reduxjs/toolkit";
import initialState from "../initialState";
import {
  CLEAR_AUTH_TOKEN,
  SET_AUTH_TOKEN_SUCCESS,
} from "../actions/actionTypes";
import { AuthState } from "../types/stateTypes";

export default function authReducer(
  state = initialState.auth,
  action: PayloadAction<AuthState>
) {
  switch (action.type) {
    case SET_AUTH_TOKEN_SUCCESS:
      return { ...action.payload };
    case CLEAR_AUTH_TOKEN:
      return { ...initialState.auth };
    default:
      return state;
  }
}
