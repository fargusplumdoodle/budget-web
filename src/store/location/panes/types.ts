import { Budget, Transaction } from "../../data";

export type Pane = "theme" | "transaction" | "budget";

export interface PanesState {
  current: Pane | null;
  transaction: Transaction | null;
  budget: Budget | null;
}
