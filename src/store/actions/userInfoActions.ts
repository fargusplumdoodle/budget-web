import { UserInfo } from "../models/types";
import { LOAD_USER_INFO_SUCCESS } from "./actionTypes";
import { AppDispatch } from "../configureStore";
import { updateStatus } from "./apiStatusActions";
import api from "../../api";

export function loadUserInfoSuccess(userInfo: UserInfo) {
  return {
    type: LOAD_USER_INFO_SUCCESS,
    payload: userInfo,
  };
}

export function fetchUserInfo() {
  return async (dispatch: AppDispatch) => {
    dispatch(updateStatus("USER_INFO", "loading"));
    api.userInfo
      .receiveUserInfo()
      .then((userInfo: UserInfo) => {
        dispatch(loadUserInfoSuccess(userInfo));
      })
      .catch((err) => {
        dispatch(updateStatus("USER_INFO", "error"));
        throw err;
      });
  };
}
