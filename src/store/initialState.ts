import {
  ApiStatusState,
  AuthState,
  BudgetState,
  TagState,
  TransactionState,
} from "./types/stateTypes";
import { UserInfo } from "./types/models";

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
  byName: {},
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

const initialUserInfoState: UserInfo = {
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
