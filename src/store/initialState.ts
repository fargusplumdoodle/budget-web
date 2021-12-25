import { ApiStatusState, AuthState, BudgetState } from "./types/stateTypes";
import { Budget } from "./types/models";

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

export default {
  auth: initialAuthState,
  apiStatus: initialApiStatusState,
  budgets: initialBudgetState,
};
