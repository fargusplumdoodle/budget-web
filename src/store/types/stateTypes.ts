import { Budget } from "./models";

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
}
