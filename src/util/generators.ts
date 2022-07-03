import * as faker from "faker";
import { Budget, Tag, Transaction } from "../store/types/models";

const atomicStore = new Uint8Array([0]);

export function getUniqueNumber(): number {
  return Atomics.add(atomicStore, 0, 1);
}

export function bulkGenerator(generatorFunction: Function, count: number) {
  return [...Array(count)].map(() => generatorFunction());
}

export function generateTestBudget(args: Object = {}): Budget {
  return {
    id: getUniqueNumber(),
    name: `${faker.lorem.word()}_budget`,
    percentage: 12,
    balance: 1380,

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

export function generateTransaction(args: Object = {}): Transaction {
  return {
    id: null,
    amount: 0,
    budget: generateTestBudget(),
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
