import {Budget, Model, Tag} from "../models/types";
import {StateStatus} from "../types/stateTypes";


export interface Transaction extends Model {
  amount: number;
  description: string | null;
  budget: Budget;
  date: Date;

  created?: Date;
  modified?: Date;
  status: StateStatus

  income: boolean;
  transfer: boolean;
  tags: Tag[];
}

export interface TransactionState {
  list: Transaction[];
  byId: { [k: number]: Transaction };
  newTransactions: {
    [hash: string]: Transaction;
  };
}
