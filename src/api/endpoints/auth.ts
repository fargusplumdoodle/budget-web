import axios from "axios";
import settings from "../../app/settings";
import { store } from "../../store/configureStore";
import parseISO from "date-fns/parseISO";
import { refreshAuthToken } from "../../store/auth";
import { AuthState } from "../../store/auth/types";

// TODO: MOVE SOMEWHERE
interface tokenResponse {
  // eslint-disable-next-line camelcase
  access_token: string;
  // eslint-disable-next-line camelcase
  refresh_token: string;
  // eslint-disable-next-line camelcase
  expires_in: number;
  // eslint-disable-next-line camelcase
  token_type: string;
}

// TODO: MOVE TO SERIALIZERS
function getAuthStateFromTokenResponse(
  tokenResponse: tokenResponse
): AuthState {
  const expiresAt = new Date();
  expiresAt.setSeconds(expiresAt.getSeconds() + tokenResponse.expires_in);
  return {
    status: "loaded",
    accessToken: tokenResponse.access_token,
    authCode: "",
    refreshToken: tokenResponse.refresh_token,
    tokenType: tokenResponse.token_type,
    expiresAt: expiresAt.toISOString(),
    authenticated: true,
  };
}

export async function retrieveToken(code: string): Promise<AuthState> {
  const requestData = {
    client_id: settings.auth.clientId,
    client_secret: settings.auth.clientSecret,
    code,
    redirect_uri: settings.auth.callbackUrl,
    grant_type: "authorization_code",
  };

  const r = await axios({
    method: "post",
    url: "/o/token/",
    data: requestData,
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  const tokenResponse: tokenResponse = r.data;
  return getAuthStateFromTokenResponse(tokenResponse);
}

export async function refreshToken(refreshToken: string): Promise<AuthState> {
  const requestData = {
    client_id: settings.auth.clientId,
    client_secret: settings.auth.clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  };

  const r = await axios({
    method: "post",
    url: "/o/token/",
    data: requestData,
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  const tokenResponse: tokenResponse = r.data;
  return getAuthStateFromTokenResponse(tokenResponse);
}

export const checkAuth = async () => {
  const state = store.getState();

  if (!state.auth.authenticated) {
    throw Error("ah not authenticated");
  }

  if (parseISO(state.auth.expiresAt) <= new Date()) {
    await store.dispatch(refreshAuthToken());
  }
};
