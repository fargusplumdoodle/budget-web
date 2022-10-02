import * as faker from "faker";
import { getUniqueNumber } from "./utils";
import { Transaction } from "../../store/data/transactions/types";
import { Budget } from "../../store/data/budgets/types";
import { Tag } from "../../store/data/tags";

export function generateTestBudget(args: Object = {}): Budget {
  return {
    id: getUniqueNumber(),
    name: `${faker.lorem.word()}_budget`,
    monthlyAllocation: 120,
    balance: 1380,
    parent: null,
    parentId: null,
    isNode: false,
    income_per_month: 100,
    outcome_per_month: 50,
    ...args,
  };
}

export function generateTestTransaction(args: Object = {}): Transaction {
  const budget = generateTestBudget();

  return {
    id: getUniqueNumber(),
    amount: getUniqueNumber(),
    budget: budget,
    date: new Date(),
    income: false,
    tags: [],
    transfer: false,
    description: faker.lorem.sentence(10),
    ...args,
  };
}

export function generateTestTag(args: Object = {}): Tag {
  const i = getUniqueNumber();
  return {
    id: i,
    name: faker.lorem.word() + i.toString(),
    rank: i,
    common_budget: generateTestBudget(),
    common_transaction_amount: -30,
    ...args,
  };
}
