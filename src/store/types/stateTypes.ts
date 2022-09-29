import { Budget, Tag, Transaction } from "../models/types";
import { ThemeSettings } from "./ui";

export type State = "loading" | "loaded" | "error" | "init";
export type Operation = "create" | "retrieve" | "update" | "delete";
export type StateType = "BUDGET" | "TAGS" | "USER_INFO" | "AUTH";
export type StateStatus = { status: State; operation: Operation };

export interface ExternalState {
  status: State;
}

export interface BudgetState extends ExternalState {
  list: Budget[];
  byId: { [k: number]: Budget };
  byName: { [k: string]: Budget };
  root: Budget | null;
}

export interface TransactionState {
  list: Transaction[];
  byId: { [k: number]: Transaction };
  stateStatus: {
    [hash: string]: StateStatus;
  };
}

export interface TagState extends ExternalState {
  list: Tag[];
  byName: { [k: string]: Tag };
  byId: { [k: number]: Tag };
}

export interface UserInfoState extends ExternalState {
  expected_monthly_net_income: number;
}

export interface UIState {
  theme: ThemeSettings;
  mobileDrawerOpen: boolean;
}

export interface PanesState {
  current: null | "theme" | "transaction";
  transaction: Transaction | null;
}
