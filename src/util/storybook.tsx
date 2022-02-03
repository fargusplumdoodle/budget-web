import { range } from "lodash";
import { generateTestTransaction } from "./generators";
import { Transaction } from "../store/types/models";

export const createSampleTransactions = function (amount: number = 100) {
  return range(amount).map(() => generateTestTransaction());
};
export const createCallback = function (name: string) {
  return (trans: Transaction) => {
    alert(`Called ${name} callback!`);
    console.log(`Callback: ${name}`, trans);
  };
};
