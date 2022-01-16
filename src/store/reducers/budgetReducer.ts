import initialState from "../initialState";
import { PayloadAction } from "@reduxjs/toolkit";
import { BudgetState } from "../types/stateTypes";
import { Budget } from "../types/models";
import { CLEAR_AUTH_TOKEN, LOAD_BUDGETS_SUCCESS } from "../actions/actionTypes";

export default function budgetReducer(
  state: BudgetState = initialState.budgets,
  action: PayloadAction<Budget[]>
): BudgetState {
  switch (action.type) {
    case LOAD_BUDGETS_SUCCESS:
      const budgets = [...action.payload];
      return {
        list: budgets,
        byId: Object.fromEntries(budgets.map((budget) => [budget.id, budget])),
        byName: Object.fromEntries(
          budgets.map((budget) => [budget.name, budget])
        ),
      };
    case CLEAR_AUTH_TOKEN:
      return { ...initialState.budgets };
    default:
      return state;
  }
}
