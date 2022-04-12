import {
  ApiStatusState,
  AuthState,
  BudgetState,
  TagState,
  TransactionState,
  UserInfoState,
} from "./types/stateTypes";

const initialAuthState: AuthState = {
  status: "init",
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
  status: "init",
  list: [],
  byId: {},
  byName: {},
};

const initialTransactionState: TransactionState = {
  list: [],
  byId: {},
};

const initialTagState: TagState = {
  status: "init",
  list: [],
  byName: {},
  byId: {},
};

const initialUserInfoState: UserInfoState = {
  status: "init",
  expected_monthly_net_income: -1,
};

const initalState = {
  auth: initialAuthState,
  apiStatus: initialApiStatusState,
  budgets: initialBudgetState,
  transactions: initialTransactionState,
  tags: initialTagState,
  userInfo: initialUserInfoState,
};
export default initalState;
