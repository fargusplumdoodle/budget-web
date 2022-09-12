import initialState from "../initialState";
import { PayloadAction } from "@reduxjs/toolkit";
import { BudgetState, StateStatus } from "../types/stateTypes";
import { Budget } from "../models/types";
import {
  CLEAR_AUTH_TOKEN,
  LOAD_BUDGETS_SUCCESS,
  UPDATE_BUDGET_STATUS,
  UPDATE_BUDGET_SUCCESS,
} from "../actions/actionTypes";
import { BUDGET_ROOT_NAME } from "../../api/constants";
import { modelById, modelByName } from "../models/utils";

export const getBudgetStateFromList = (budgets: Budget[]): BudgetState => {
  return {
    status: "loaded",
    list: budgets,
    byId: modelById(budgets),
    byName: modelByName(budgets),
    root: budgets.find((budget) => (budget.name = BUDGET_ROOT_NAME))!,
  };
};

export default function budgetReducer(
  state: BudgetState = initialState.budgets,
  action: PayloadAction<Budget[] | Budget | StateStatus>
): BudgetState {
  switch (action.type) {
    case LOAD_BUDGETS_SUCCESS:
      return getBudgetStateFromList([...(action.payload as Budget[])]);
    case UPDATE_BUDGET_SUCCESS:
      const updatedBudget = action.payload as Budget;
      const budgets = state.list.filter(
        (budget) => budget.id !== updatedBudget.id
      );
      return getBudgetStateFromList([...budgets, updatedBudget]);
    case UPDATE_BUDGET_STATUS:
      return { ...state, status: action.payload as StateStatus };
    case CLEAR_AUTH_TOKEN:
      return { ...initialState.budgets };
    default:
      return state;
  }
}
