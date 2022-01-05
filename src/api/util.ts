import axios, { AxiosRequestConfig } from "axios";
import { store } from "../store/configureStore";
import { PaginatedQueryParams, PaginatedResponse } from "./types";

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

export async function makePaginatedRequest(
  uri: string,
  page: number,
  pageSize: number = 25,
  overrideParams: AxiosRequestConfig = {}
): Promise<PaginatedResponse<any>> {
  const queryParams: PaginatedQueryParams = { page_size: pageSize };
  if (page !== 0) {
    queryParams.page = page;
  }
  const r = await makeRequest({
    method: "get",
    url: uri,
    params: queryParams,
    ...overrideParams,
  });
  return r.data as PaginatedResponse<any>;
}
