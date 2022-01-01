import axios, { AxiosRequestConfig } from "axios";
import { store } from "../store/configureStore";

export async function makeRequest(params: AxiosRequestConfig) {
  const state = store.getState();

  if (!state.auth.authenticated) {
    // TODO: SEND USER TO BE AUTHENTICATED
    console.log("Not authenticated");
    throw Error("ah not authenticated");
  }
  // TODO: REFRESH TOKEN IF EXPIRED

  return axios({
    ...params,
    headers: {
      authorization: `${state.auth.tokenType} ${state.auth.accessToken}`,
      ...params.headers,
    },
  });
}
