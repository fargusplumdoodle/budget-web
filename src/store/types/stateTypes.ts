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
