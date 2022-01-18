import * as faker from "faker";
import { Budget, Tag, Transaction } from "../store/types/models";

function getRandomInt(max: number = 100): number {
  return Math.floor(Math.random() * max);
}

export function bulkGenerator(generatorFunction: Function, count: number) {
  return [...Array(count)].map(() => generatorFunction());
}

export function generateTestBudget(args: Object = {}): Budget {
  return {
    id: getRandomInt(1000),
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
    id: getRandomInt(100000),
    amount: getRandomInt(),
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
  const i = getRandomInt(10000);
  return {
    id: i,
    name: faker.lorem.word() + i.toString(),
    rank: i,
    ...args,
  };
}

export function generateTransaction(args: Object = {}): Transaction {
  return {
    id: null,
    amount: null,
    budget: null,
    description: null,
    date: null,
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
    ...args,
  };
}
