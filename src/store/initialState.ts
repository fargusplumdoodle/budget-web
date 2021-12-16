import { ApiStatusState, AuthState } from "./types/stateTypes";

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

export default {
  auth: initialAuthState,
  apiStatus: initialApiStatusState,
};
