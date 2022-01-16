import initialState from "../initialState";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiStatusState } from "../types/stateTypes";
import { API_CALL_ERROR, BEGIN_API_CALL } from "../actions/actionTypes";

const actionTypeEndsInSuccess = (type: string): boolean => {
  const success = "_SUCCESS";
  return type.substring(type.length - success.length) === success;
};

export default function apiStatusReducer(
  state = initialState.apiStatus,
  action: PayloadAction
): ApiStatusState {
  if (action.type === BEGIN_API_CALL) {
    return { count: state.count + 1 };
  } else if (
    action.type === API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    const newCount = state.count <= 0 ? 0 : state.count - 1;
    return { count: newCount };
  }
  return state;
}
