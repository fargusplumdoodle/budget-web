import initialState from "../initialState";
import { PayloadAction } from "@reduxjs/toolkit";
import { BudgetState } from "../types/stateTypes";
import { budgetActionTypes } from "../actions/actionTypes";
import { Budget } from "../types/models";

export default function authReducer(
  state: BudgetState = initialState.budgets,
  action: PayloadAction<Budget[]>
): BudgetState {
  switch (action.type) {
    case budgetActionTypes.LOAD_BUDGETS_SUCCESS:
      const budgets = [...action.payload];

      return {
        list: budgets,
        byId: Object.fromEntries(budgets.map((budget) => [budget.id, budget])),
      };
    default:
      return state;
  }
}
