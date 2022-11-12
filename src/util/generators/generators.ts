import { getUniqueNumber } from "./utils";
import { Budget } from "../../store/data/budgets/types";
import { Tag } from "../../store/data/tags";

export function generateBudget(args: Object = {}): Budget {
  return {
    id: getUniqueNumber(),
    name: "budget",
    monthlyAllocation: 0,
    balance: 0,
    income_per_month: 0,
    outcome_per_month: 0,
    isNode: false,
    parent: null,
    parentId: null,
    ...args,
  };
}

export function generateTag(args: Object = {}): Tag {
  return {
    id: null,
    name: "",
    rank: null,
    common_budget: null,
    common_transaction_amount: null,
    ...args,
  };
}
