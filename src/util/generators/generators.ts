import { Tag, Budget } from "../../store/models/types";
import { getUniqueNumber } from "./utils";
import {Transaction} from "../../store/transactions/types";

export function generateBudget(args: Object = {}): Budget {
  return {
    id: getUniqueNumber(),
    name: `budget`,
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

export function generateTransaction(args: Object = {}): Transaction {
  return {
    id: null,
    amount: 0,
    budget: generateBudget(),
    description: null,
    date: new Date(),
    income: false,
    tags: [],
    transfer: false,
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
