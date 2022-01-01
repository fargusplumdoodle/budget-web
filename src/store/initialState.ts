import {
  ApiStatusState,
  AuthState,
  BudgetState,
  TransactionState,
} from "./types/stateTypes";

const initialAuthState: AuthState = {
  authenticated: false,
  accessToken: "",
  refreshToken: "",
  expiresAt: "",
  tokenType: "",
};

const initialApiStatusState: ApiStatusState = {
  count: 0,
};

const initialBudgetState: BudgetState = {
  list: [],
  byId: {},
};

const initialTransactionState: TransactionState = {
  list: [],
  byId: {},
};

const initalState = {
  auth: initialAuthState,
  apiStatus: initialApiStatusState,
  budgets: initialBudgetState,
  transactions: initialTransactionState,
};
export default initalState;
