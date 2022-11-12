import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from './types';

export const initialState: AuthState = {
  status: 'init',
  authenticated: false,
  accessToken: '',
  authCode: '',
  refreshToken: '',
  expiresAt: '',
  tokenType: '',
};

export const sliceKey = 'auth';
const transactionSlice = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
    resetAuth() {
      return { ...initialState };
    },
    requestAuthToken(state, action) {
      state.status = 'loading';
      state.authCode = action.payload.authCode;
    },
    refreshAuthToken(state) {
      state.status = 'loading';
    },
    setAuth(_, action) {
      return action.payload;
    },
  },
});
export const {
  resetAuth, setAuth, refreshAuthToken, requestAuthToken,
} = transactionSlice.actions;
export default transactionSlice.reducer;
