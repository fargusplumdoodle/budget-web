import { Transaction } from '../types';
import { generateBudget } from '../../../../util/generators/generators';

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
