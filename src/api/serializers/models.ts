import { Tag, UserInfo } from "../../store/models/types";
import {
  SerializedBudget,
  SerializedTag,
  SerializedTransaction,
  SerializedUserInfo,
} from "../types";
import { store } from "../../store/configureStore";
import { fromCents, getAPIDate, toCents } from "../util";
import lowerCase from "lodash/lowerCase";
import capitalize from "lodash/capitalize";
import { format } from "date-fns";
import { Transaction } from "../../store/data/transactions/types";
import { Budget } from "../../store/data/budgets/types";
import { setBudgetParents } from "../../store/data/budgets/utils";

export const serializeTag = (tag: Tag): SerializedTag => {
  return {
    name: lowerCase(tag.name),
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
    name: capitalize(tag.name),
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
    date: format(trans.date, "yyyy-MM-dd"),
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
    id: trans.id!,
    amount: fromCents(trans.amount),
    status: "loaded",
    date: getAPIDate(trans.date),
    budget: budget,
    tags: trans.tags.map((tag) => deserializeTag(tag)),
    created: trans.created!,
    modified: trans.modified!,
    description: trans.description,
    income: trans.income,
    transfer: trans.transfer,
  };
}

export function serializeBudget(budget: Budget): SerializedBudget {
  return {
    id: budget.id!,
    name: budget.name,
    balance: toCents(budget.balance),
    monthly_allocation: toCents(budget.monthlyAllocation),
    parent: budget.parentId!,
    income_per_month: toCents(budget.income_per_month),
    outcome_per_month: toCents(budget.outcome_per_month),
  };
}

export function deserializeBudget(budget: SerializedBudget): Budget {
  const state = store.getState();
  return {
    id: budget.id!,
    name: budget.name,
    monthlyAllocation: fromCents(budget.monthly_allocation),
    balance: fromCents(budget.balance),
    isNode: budget.is_node!,
    parent: state.budgets.byId[budget.parent!] || null,
    parentId: budget.parent,
    income_per_month: fromCents(budget.income_per_month),
    outcome_per_month: fromCents(budget.outcome_per_month),
  };
}
export function deserializeBudgets(
  serializedBudgets: SerializedBudget[]
): Budget[] {
  const budgets = serializedBudgets.map((b) => deserializeBudget(b));
  return setBudgetParents(budgets);
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
