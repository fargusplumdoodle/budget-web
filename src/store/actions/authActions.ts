import { authActionTypes } from "./actionTypes";
import { AppDispatch } from "../configureStore";
import { apiCallError, beginApiCall } from "./apiStatusActions";
import * as authAPI from "../../api/auth";
import { AuthState } from "../types/stateTypes";

export function setAuthTokenSuccess(authToken: AuthState) {
  return {
    type: authActionTypes.SET_AUTH_TOKEN_SUCCESS,
    payload: authToken,
  };
}

export function requestAuthToken(authCode: string) {
  return (dispatch: AppDispatch) => {
    dispatch(beginApiCall());
    return authAPI
      .retrieveToken(authCode)
      .then((authToken: AuthState) => {
        // dispatch(setAuthTokenSuccess(authToken));
      })
      .catch((err) => {
        dispatch(apiCallError());
        throw err;
      });
  };
}
