import { Budget } from "../types/models";
import { budgetActionTypes } from "./actionTypes";
import { AppDispatch } from "../configureStore";
import { apiCallError, beginApiCall } from "./apiStatusActions";
import * as budgetAPI from "../../api/budget";

export function loadBudgetsSuccess(budgets: Budget[]) {
  return {
    type: budgetActionTypes.LOAD_BUDGETS_SUCCESS,
    payload: budgets,
  };
}

export function fetchBudgets() {
  return async (dispatch: AppDispatch) => {
    dispatch(beginApiCall());
    budgetAPI
      .receiveBudgets()
      .then((budgets: Budget[]) => {
        console.log("ay we got the budgets");
        dispatch(loadBudgetsSuccess(budgets));
      })
      .catch((err) => {
        dispatch(apiCallError());
        // throw err;
      });
  };
}
