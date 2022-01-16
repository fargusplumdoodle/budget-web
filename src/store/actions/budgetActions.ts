import { Budget } from "../types/models";
import { LOAD_BUDGETS_SUCCESS } from "./actionTypes";
import { AppDispatch } from "../configureStore";
import { apiCallError, beginApiCall } from "./apiStatusActions";
import * as budgetAPI from "../../api/budget";

export function loadBudgetsSuccess(budgets: Budget[]) {
  return {
    type: LOAD_BUDGETS_SUCCESS,
    payload: budgets,
  };
}

export function fetchBudgets() {
  return async (dispatch: AppDispatch) => {
    dispatch(beginApiCall());
    budgetAPI
      .receiveBudgets()
      .then((budgets: Budget[]) => {
        dispatch(loadBudgetsSuccess(budgets));
      })
      .catch((err) => {
        dispatch(apiCallError());
        throw err;
      });
  };
}
