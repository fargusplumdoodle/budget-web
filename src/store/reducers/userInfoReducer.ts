import initialState from "../initialState";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../types/models";
import {
  CLEAR_AUTH_TOKEN,
  LOAD_USER_INFO_SUCCESS,
} from "../actions/actionTypes";

export default function userInfoReducer(
  state: UserInfo = initialState.userInfo,
  action: PayloadAction<UserInfo>
): UserInfo {
  switch (action.type) {
    case LOAD_USER_INFO_SUCCESS:
      return { ...action.payload };
    case CLEAR_AUTH_TOKEN:
      return { ...initialState.userInfo };
    default:
      return state;
  }
}
