import { Model} from "../../models/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { Budget } from "../budgets/types";
import {Tag} from "../tags";

export interface Transaction extends Model {
  amount: number;
  description: string | null;
  budget: Budget;
  date: Date;

  created?: Date;
  modified?: Date;

  income: boolean;
  transfer: boolean;
  tags: Tag[];
}

export interface TransactionState {
  list: Transaction[];
  byId: { [k: number]: Transaction };
}

export type UpdateTransactionPayloadAction = PayloadAction<{
  newTransaction: Transaction;
  oldTransaction: Transaction;
}>;
