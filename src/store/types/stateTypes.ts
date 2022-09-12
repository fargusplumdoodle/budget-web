import { Budget, Tag, Transaction } from "../models/types";
import { ThemeSettings } from "./ui";

export type StateStatus = "loading" | "loaded" | "error" | "init";
export type StateType = "BUDGET" | "TAGS" | "USER_INFO" | "AUTH";

interface ExternalState {
  status: StateStatus;
}

export interface AuthState extends ExternalState {
  authenticated: boolean;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  tokenType: string;
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
}

export interface PanesState {
  current: null | "theme";
}
