import initialState from "../initialState";
import { apiStatusActionTypes } from "../actions/actionTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiStatusState } from "../types/stateTypes";

const actionTypeEndsInSuccess = (type: string): boolean => {
  const success = "_SUCCESS";
  return type.substring(type.length - success.length) === success;
};

export default function apiStatusReducer(
  state = initialState.apiStatus,
  action: PayloadAction
): ApiStatusState {
  if (action.type === apiStatusActionTypes.BEGIN_API_CALL) {
    return { count: state.count + 1 };
  } else if (
    action.type === apiStatusActionTypes.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    const newCount = state.count <= 0 ? 0 : state.count - 1;
    return { count: newCount };
  }
  return state;
}
