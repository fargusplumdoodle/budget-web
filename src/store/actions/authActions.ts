import { SET_AUTH_TOKEN_SUCCESS, CLEAR_AUTH_TOKEN } from "./actionTypes";
import { AppDispatch } from "../configureStore";
import { apiCallError, beginApiCall } from "./apiStatusActions";
import * as authAPI from "../../api/auth";
import { AuthState } from "../types/stateTypes";
import axios from "axios";

export function setAuthTokenSuccess(authToken: AuthState) {
  return {
    type: SET_AUTH_TOKEN_SUCCESS,
    payload: authToken,
  };
}
export function clearAuthToken() {
  return {
    type: CLEAR_AUTH_TOKEN,
  };
}
export function logOut() {
  return (dispatch: AppDispatch) => {
    axios.defaults.headers.common.Authorization = undefined;
    dispatch(clearAuthToken());
  };
}

export function requestAuthToken(authCode: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(beginApiCall());
    return authAPI
      .retrieveToken(authCode)
      .then((authToken: AuthState) => {
        dispatch(setAuthTokenSuccess(authToken));
      })
      .catch((err) => {
        dispatch(apiCallError());
        throw err;
      });
  };
}
