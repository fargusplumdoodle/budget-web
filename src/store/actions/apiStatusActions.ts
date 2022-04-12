import { StateStatus, StateType } from "../types/stateTypes";
import { API_CALL_ERROR, BEGIN_API_CALL } from "./actionTypes";

export function beginApiCall() {
  return { type: BEGIN_API_CALL };
}

export function apiCallError() {
  return { type: API_CALL_ERROR };
}

export function updateStatus(stateType: StateType, status: StateStatus) {
  return {
    type: `UPDATE_${stateType}_STATUS`,
    payload: status,
  };
}
