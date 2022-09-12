import { Budget, Model } from "./types";

export const modelById = <T extends Model>(models: T[]) =>
  Object.fromEntries(models.map((model) => [model.id, model]));

export const modelByName = <T extends { name: string }>(models: T[]) =>
  Object.fromEntries(models.map((model) => [model.name, model]));

export const getBudgetChildren = (
  budgetId: number,
  budgets: Budget[]
): Budget[] => budgets.filter((b) => b.parentId! === budgetId);

export const createBudgetTree = (budgets: Budget[]): Budget[] => {
  const byId = modelById(budgets);
  return budgets.map((budget) => {
    budget.parent = budget.parentId ? byId[budget.parentId] : null;
    budget.children = getBudgetChildren(budget.id!, budgets);
    return budget;
  });
};
