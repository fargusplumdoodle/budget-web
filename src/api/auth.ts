import axios from "axios";
import settings from "../app/settings";
import {AuthState} from "../store/types/stateTypes";

// eslint-disable-next-line no-unused-vars
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

export async function retrieveToken(authCode: string): Promise<AuthState> {
  const requestData = {
    client_id: settings.auth.clientId,
    client_secret: settings.auth.clientSecret,
    code: authCode,
    redirect_uri: settings.auth.callbackUrl,
    grant_type: "authorization_code",
  };
  // const r = await axios.post("/o/token/", requestData, config);
  const r = await axios({
    method: "post",
    url: "/o/token/",
    data: requestData,
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  axios.defaults.headers.common.Authorization = `${r.data.tokenType} ${r.data.accessToken}`;

  const data: tokenResponse = r.data;
  // TODO: VALIDATE RESPONSE
  const expiresAt = new Date();
  expiresAt.setSeconds(expiresAt.getSeconds() + data.expires_in);
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    tokenType: data.token_type,
    expiresAt: expiresAt.toISOString(),
    authenticated: true,
  };
}
