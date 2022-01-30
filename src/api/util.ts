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

export async function makePaginatedRequest<T>(
  uri: string,
  page = 1,
  pageSize = 25,
  maxPages = 100,
  results: T[] = []
): Promise<T[]> {
  const queryParams: PaginatedQueryParams = {
    page_size: pageSize,
    page: page,
  };

  const r = await makeRequest({
    method: "get",
    url: uri,
    params: queryParams,
  });

  if (r.data.next) {
    return await makePaginatedRequest(uri, page + 1, pageSize, maxPages, [
      ...results,
      ...(r.data as PaginatedResponse<T>).results,
    ]);
  }
  return [...results, ...(r.data as PaginatedResponse<T>).results];
}

export function toCents(amount: number): number {
  return amount * 100;
}
export function fromCents(amount: number): number {
  return amount / 100;
}
