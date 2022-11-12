export type StateStatus = 'loading' | 'loaded' | 'error' | 'init';

export interface AuthState {
  status: StateStatus;
  authenticated: boolean;
  expiresAt: string;
  tokenType: string;

  // For requesting accessToken
  authCode: string;

  // For accessing resources on server
  accessToken: string;

  // For requesting a new accessToken
  refreshToken: string;
}
