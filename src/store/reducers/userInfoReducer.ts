import initialState from "../initialState";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../models/types";
import {
  CLEAR_AUTH_TOKEN,
  LOAD_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_STATUS,
} from "../actions/actionTypes";
import { StateStatus, UserInfoState } from "../types/stateTypes";

export default function userInfoReducer(
  state: UserInfoState = initialState.userInfo,
  action: PayloadAction<UserInfoState | StateStatus>
): UserInfoState {
  switch (action.type) {
    case LOAD_USER_INFO_SUCCESS:
      return { ...(action.payload as UserInfo), status: "loaded" };
    case UPDATE_USER_INFO_STATUS:
      return { ...state, status: action.payload as StateStatus };
    case CLEAR_AUTH_TOKEN:
      return { ...initialState.userInfo };
    default:
      return state;
  }
}
