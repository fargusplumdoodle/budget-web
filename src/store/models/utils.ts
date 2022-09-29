import { Budget, Model, Transaction } from "./types";
import { store } from "../configureStore";
import sha1 from "sha1";

export const modelById = <T extends Model>(models: T[]) =>
  Object.fromEntries(models.map((model) => [model.id, model]));

export const modelByName = <T extends { name: string }>(models: T[]) =>
  Object.fromEntries(models.map((model) => [model.name, model]));

export const getBudgetChildren = (budget: Budget): Budget[] => {
  const state = store.getState();
  return state.budgets.list.filter((b) => {
    return b.parentId! === budget.id;
  });
};

export const setBudgetParents = (budgets: Budget[]): Budget[] => {
  const byId = modelById(budgets);
  return budgets.map((budget) => {
    budget.parent = budget.parentId ? byId[budget.parentId] : null;
    return budget;
  });
};

export const getTransactionHash = (transaction: Transaction): string => {
  const message = `
  ${transaction.id || ""}
  ${transaction.amount}
  ${transaction.description}
  ${transaction.date}
  ${transaction.income}
  ${transaction.transfer}
  `;
  return sha1(message);
};
