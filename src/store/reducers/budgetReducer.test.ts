import { generateTestBudget } from "../../util/generators";
import {
  loadBudgetsSuccess,
  updateBudgetSuccess,
} from "../actions/budgetActions";
import budgetReducer, { getBudgetStateFromList } from "./budgetReducer";
import initialState from "../initialState";
import { range } from "lodash";
import { BudgetState } from "../types/stateTypes";
import { Budget } from "../models/types";

/*
Asserts that the expected budgets form the appropriate budget state data structure
 */
function ensureStateIsSetForListOfBudgets(
  state: BudgetState,
  expectedBudgets: Budget[]
) {
  expectedBudgets.forEach((budget) => {
    expect(state.byName[budget.name]).toStrictEqual(budget);
    expect(state.byId[budget.id]).toStrictEqual(budget);
    expect(state.list).toContainEqual(budget);
  });
}

describe("Test budget reducer", () => {
  test("that new budgets are not added to the state", () => {
    // using rank to ensure they appear in the right order
    const budgets = range(10, 0).map((rank) =>
      generateTestBudget({ id: rank, name: `${rank}_budget`, rank: rank })
    );
    const budgetsState = budgetReducer(
      initialState.budgets,
      loadBudgetsSuccess(budgets)
    );

    ensureStateIsSetForListOfBudgets(budgetsState, budgets);

    // Adding the same budgets to the state should result in the same state
    const newState = budgetReducer(budgetsState, loadBudgetsSuccess(budgets));

    expect(newState).toStrictEqual(budgetsState);
  });

  test("budgets are updated on update budget success", () => {
    const untouched = generateTestBudget();

    const oldBudget = generateTestBudget();
    const newBudget = {
      ...oldBudget,
      balance: oldBudget.balance + 1,
    };

    const initialBudgets = [untouched, oldBudget];

    const budgetsState = budgetReducer(
      getBudgetStateFromList(initialBudgets),
      updateBudgetSuccess(newBudget)
    );

    ensureStateIsSetForListOfBudgets(budgetsState, [untouched, newBudget]);
  });
});
