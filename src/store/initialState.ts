import {
  ApiStatusState,
  AuthState,
  BudgetState,
  TagState,
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

const initialTagState: TagState = {
  list: [],
  byName: {},
  byId: {},
};

const initalState = {
  auth: initialAuthState,
  apiStatus: initialApiStatusState,
  budgets: initialBudgetState,
  transactions: initialTransactionState,
  tags: initialTagState,
};
export default initalState;
