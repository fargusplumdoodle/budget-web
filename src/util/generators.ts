import * as faker from "faker";

function getRandomInt(max: number = 100): number {
  return Math.floor(Math.random() * max);
}

export function generateBudget(args: Object = {}): Budget {
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

export function generateTransaction(args: Object = {}): Transaction {
  const budget = generateBudget();

  return {
    id: getRandomInt(1000),
    amount: getRandomInt(),
    budget: budget,
    budget_id: budget.id,
    date: new Date(),
    income: false,
    tags: [],
    transfer: false,
    description: faker.lorem.sentence(10),
    ...args,
  };
}

export function generateTag(args: Object = {}): Tag {
  return {
    id: getRandomInt(100),
    name: faker.lorem.word(),
    ...args,
  };
}
