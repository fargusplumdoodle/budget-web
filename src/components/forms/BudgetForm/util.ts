import { BudgetFormType } from "./type";
import { Budget, selectBudgetRoot, store } from "../../../store";
import { cloneDeep } from "lodash";

export const budgetFormFromBudget = ({
  id,
  name,
  monthlyAllocation,
  parent,
}: Budget): BudgetFormType => ({
  id,
  name,
  parent: cloneDeep(parent),
  monthlyAllocation,
});

export const getInitialBudgetFormValues = (): BudgetFormType => {
  const state = store.getState();
  const rootBudget = selectBudgetRoot(state);
  return {
    id: null,
    name: "",
    monthlyAllocation: 0,
    parent: rootBudget,
  };
};

export const getDefaultFormValues = (budget: Budget | null) => {
  return budget ? budgetFormFromBudget(budget) : getInitialBudgetFormValues();
};

export const budgetFromBudgetForm = ({
  id,
  name,
  monthlyAllocation,
  parent,
}: BudgetFormType): Budget => ({
  id,
  name,
  monthlyAllocation,
  parent,
  parentId: parent!.id,
  balance: 0,
  isNode: false,
  income_per_month: 0,
  outcome_per_month: 0,
});
