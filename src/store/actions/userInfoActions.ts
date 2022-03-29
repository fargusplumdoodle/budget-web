import { UserInfo } from "../types/models";
import { LOAD_USER_INFO_SUCCESS } from "./actionTypes";
import { AppDispatch } from "../configureStore";
import { apiCallError, beginApiCall } from "./apiStatusActions";
import api from "../../api";

export function loadUserInfoSuccess(userInfo: UserInfo) {
  return {
    type: LOAD_USER_INFO_SUCCESS,
    payload: userInfo,
  };
}

export function fetchUserInfo() {
  return async (dispatch: AppDispatch) => {
    dispatch(beginApiCall());
    api.userInfo
      .receiveUserInfo()
      .then((userInfo: UserInfo) => {
        dispatch(loadUserInfoSuccess(userInfo));
      })
      .catch((err) => {
        dispatch(apiCallError());
        throw err;
      });
  };
}
