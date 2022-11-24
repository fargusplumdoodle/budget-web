import { BudgetFormType } from "./type";
import { Budget, selectBudgetRoot, store } from "../../../store";
import cloneDeep from "lodash/cloneDeep";

export const budgetFormFromBudget = ({
  id,
  name,
  monthlyAllocation,
  parent,
  isNode,
}: Budget): BudgetFormType => ({
  id,
  name,
  parent: cloneDeep(parent),
  monthlyAllocation,
  isNode,
});

export const getInitialBudgetFormValues = (): BudgetFormType => {
  const state = store.getState();
  const rootBudget = selectBudgetRoot(state);
  return {
    id: null,
    name: "",
    monthlyAllocation: 0,
    parent: rootBudget,
    isNode: false,
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
  isNode,
}: BudgetFormType): Budget => ({
  id,
  name,
  monthlyAllocation,
  recursiveMonthlyAllocation: isNode ? 0 : monthlyAllocation,
  isNode,
  parent,
  parentId: parent!.id,
  balance: 0,
  outcome_per_month: 0,
  income_per_month: 0,
});
