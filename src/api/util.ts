import axios, { AxiosRequestConfig } from "axios";
import { store } from "../store/configureStore";
import {
  PaginatedQueryParams,
  PaginatedResponse,
  QueryParameters,
} from "./types";
import { DateTime } from "luxon";
import { round } from "lodash";
import { Expression } from "../components/common/forms/search/types";

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
  return round(amount * 100, 2);
}
export function fromCents(amount: number): number {
  return round(amount / 100, 2);
}

/**
 * Issue:
 * Dates come from the API in the local timezone, yet Javascript interprets them
 * as being UTC
 *
 * This is because dates do not have timezone information explicitly baked in.
 *   E.g: "2022-02-05"
 *
 * So JS would interpret this as being "2022-02-05 UTC" and then conveniently
 * convert it to "2022-02-04 Pacific Time"
 *
 * This takes the date from the API, and creates a date object in JS that
 * is aware of the users local timezone
 *
 * @param apiDate: Date coming from the API
 */
export function getAPIDate(apiDate: string): Date {
  const timezoneAwareDate = DateTime.fromISO(apiDate).setZone("system");
  return new Date(timezoneAwareDate.toString());
}

export function getQueryParametersFromExpressions(
  expressions: Expression[]
): QueryParameters {
  const queryParams: QueryParameters = {};
  expressions.forEach((expression) => {
    const key = `${expression.operand.name}${expression.operator.djangoExpression}`;
    const value = expression.operand.transformValue
      ? expression.operand.transformValue(expression.value)
      : expression.value.toString();

    queryParams[key] = value;
  });
  return queryParams;
}
