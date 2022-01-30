import { Budget, Tag, Transaction } from "../store/types/models";
import {
  SerializedBudget,
  SerializedTag,
  SerializedTransaction,
} from "../api/types";
import { store } from "../store/configureStore";
import {fromCents, toCents} from "../api/util";

export const serializeTag = (tag: Tag): SerializedTag => {
  return {
    name: tag.name,
  };
};
export const deserializeTag = (tag: SerializedTag): Tag => {
  return {
    id: tag.id,
    name: tag.name,
    rank: tag.rank,
  };
};

export function serializeTransaction(
  trans: Transaction
): SerializedTransaction {
  return {
    amount: toCents(trans.amount) ,
    description: trans.description,
    budget: trans.budget.id,
    date: trans.date.toLocaleDateString(),
    income: trans.income,
    transfer: trans.transfer,
    tags: trans.tags.map((tag) => serializeTag(tag)),
  };
}

export function deserializeTransaction(
  trans: SerializedTransaction
): Transaction {
  const state = store.getState();
  return {
    ...trans,
    amount: fromCents(trans.amount),
    id: trans.id,
    date: new Date(trans.date),
    budget: state.budgets.byId[trans.budget],
    tags: trans.tags.map((tag) => deserializeTag(tag)),
  };
}

export function serializeBudget(budget: Budget): SerializedBudget {
  return {
    ...budget,
    balance: toCents(budget.balance),
    income_per_month: toCents(budget.income_per_month),
    outcome_per_month: toCents(budget.outcome_per_month),
  };
}

export function deserializeBudget(budget: SerializedBudget): SerializedBudget {
  return {
    ...budget,
    balance: fromCents(budget.balance),
    income_per_month: fromCents(budget.income_per_month),
    outcome_per_month: fromCents(budget.outcome_per_month),
  };
}
