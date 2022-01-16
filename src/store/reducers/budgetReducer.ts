import initialState from "../initialState";
import { PayloadAction } from "@reduxjs/toolkit";
import { BudgetState } from "../types/stateTypes";
import { Budget } from "../types/models";
import {
  CLEAR_AUTH_TOKEN,
  LOAD_BUDGETS_SUCCESS,
  UPDATE_BUDGET_SUCCESS,
} from "../actions/actionTypes";

export const getBudgetStateFromList = (budgets: Budget[]): BudgetState => {
  return {
    list: budgets,
    byId: Object.fromEntries(budgets.map((budget) => [budget.id, budget])),
    byName: Object.fromEntries(budgets.map((budget) => [budget.name, budget])),
  };
};

export default function budgetReducer(
  state: BudgetState = initialState.budgets,
  action: PayloadAction<Budget[] | Budget>
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
    case CLEAR_AUTH_TOKEN:
      return { ...initialState.budgets };
    default:
      return state;
  }
}
