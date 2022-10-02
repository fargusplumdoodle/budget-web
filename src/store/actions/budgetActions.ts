import { LOAD_BUDGETS_SUCCESS, UPDATE_BUDGET_SUCCESS } from "./actionTypes";
import { AppDispatch } from "../configureStore";
import { updateStatus } from "./apiStatusActions";
import api from "../../api";
import { Budget } from "../data/budgets/types";

export function loadBudgetsSuccess(budgets: Budget[]) {
  return {
    type: LOAD_BUDGETS_SUCCESS,
    payload: budgets,
  };
}

export function updateBudgetSuccess(budget: Budget) {
  return {
    type: UPDATE_BUDGET_SUCCESS,
    payload: budget,
  };
}

export function fetchBudgets() {
  return async (dispatch: AppDispatch) => {
    dispatch(updateStatus("BUDGET", "loading"));
    api.budget
      .receiveBudgets()
      .then((budgets: Budget[]) => {
        dispatch(loadBudgetsSuccess(budgets));
      })
      .catch((err) => {
        dispatch(updateStatus("BUDGET", "error"));
        throw err;
      });
  };
}
