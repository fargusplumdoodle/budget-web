import { apiStatusActionTypes } from "./actionTypes";

export function beginApiCall() {
  return { type: apiStatusActionTypes.BEGIN_API_CALL };
}

export function apiCallError() {
  return { type: apiStatusActionTypes.API_CALL_ERROR };
}
