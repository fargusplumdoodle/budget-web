import { range } from "lodash";
import { Transaction } from "../store/models/types";
import { generateTestTransaction } from "./generators/test_generators";

export const createSampleTransactions = function (amount: number = 100) {
  return range(amount).map(() => generateTestTransaction());
};
export const createCallback = function (name: string) {
  return (trans: Transaction) => {
    alert(`Called ${name} callback!`);
  };
};
