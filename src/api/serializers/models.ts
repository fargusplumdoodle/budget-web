import { Budget, Tag, Transaction, UserInfo } from "../../store/types/models";
import {
  SerializedBudget,
  SerializedTag,
  SerializedTransaction,
  SerializedUserInfo,
} from "../types";
import { store } from "../../store/configureStore";
import { fromCents, getAPIDate, toCents } from "../util";

export const serializeTag = (tag: Tag): SerializedTag => {
  return {
    name: tag.name,
  };
};

export const deserializeTag = (tag: SerializedTag): Tag => {
  const state = store.getState();
  const budget = tag.common_budget
    ? state.budgets.byId[tag.common_budget]
    : null;

  const commonTransactionAmount = tag.common_transaction_amount
    ? fromCents(tag.common_transaction_amount)
    : null;

  return {
    ...tag,
    id: tag.id!,
    rank: tag.rank!,
    common_transaction_amount: commonTransactionAmount,
    common_budget: budget,
  };
};

export function serializeTransaction(
  trans: Transaction
): SerializedTransaction {
  return {
    amount: toCents(trans.amount),
    description: trans.description || "",
    budget: trans.budget.id!,
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
  const budget = state.budgets.byId[trans.budget];
  if (!budget) {
    throw Error(`Unable to find budget in state: ${trans.budget}`);
  }
  return {
    ...trans,
    amount: fromCents(trans.amount),
    id: trans.id!,
    date: getAPIDate(trans.date),
    budget: budget,
    tags: trans.tags.map((tag) => deserializeTag(tag)),
  };
}

export function serializeBudget(budget: Budget): SerializedBudget {
  return {
    ...budget,
    id: budget.id!,
    balance: toCents(budget.balance),
    income_per_month: toCents(budget.income_per_month),
    outcome_per_month: toCents(budget.outcome_per_month),
  };
}

export function deserializeBudget(budget: SerializedBudget): Budget {
  return {
    ...budget,
    id: budget.id!,
    balance: fromCents(budget.balance),
    income_per_month: fromCents(budget.income_per_month),
    outcome_per_month: fromCents(budget.outcome_per_month),
  };
}
export function serializeUserInfo(userInfo: UserInfo): SerializedUserInfo {
  return {
    expected_monthly_net_income: toCents(userInfo.expected_monthly_net_income),
  };
}
export function deserializeUserInfo(userInfo: SerializedUserInfo): UserInfo {
  return {
    expected_monthly_net_income: fromCents(
      userInfo.expected_monthly_net_income
    ),
  };
}
