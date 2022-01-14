import { Budget, Tag, Transaction } from "./models";

export interface AuthState {
  authenticated: boolean;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  tokenType: string;
}

export interface ApiStatusState {
  count: number;
}

export interface BudgetState {
  list: Budget[];
  byId: { [k: number]: Budget };
  byName: { [k: string]: Budget };
}

export interface TransactionState {
  list: Transaction[];
  byId: { [k: number]: Transaction };
}

export interface TagState {
  list: Tag[];
  byName: { [k: string]: Tag };
  byId: { [k: number]: Tag };
}
