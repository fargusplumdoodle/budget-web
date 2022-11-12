import { range } from 'lodash';
import { generateTestTransaction } from './generators/test_generators';
import { Transaction } from '../store/data/transactions/types';

export const createSampleTransactions = function (amount: number = 100) {
  return range(amount).map(() => generateTestTransaction());
};
export const createCallback = function (name: string) {
  return (_: Transaction) => {
    alert(`Called ${name} callback!`);
  };
};
