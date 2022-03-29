import axios, { AxiosRequestConfig } from "axios";
import { store } from "../store/configureStore";
import { PaginatedQueryParams, PaginatedResponse } from "./types";
import { DateTime } from "luxon";
import { round } from "lodash";
import { Expression } from "../components/forms/search/types";
import { clearAuthToken } from "../store/actions/authActions";

export async function makeRequest(params: AxiosRequestConfig) {
  const state = store.getState();

  if (!state.auth.authenticated) {
    console.log("Not authenticated");
    throw Error("ah not authenticated");
  }

  try {
    return await axios({
      ...params,
      headers: {
        authorization: `${state.auth.tokenType} ${state.auth.accessToken}`,
        ...params.headers,
      },
    });
  } catch (e: any) {
    if (e?.response.status === 401) {
      console.log("Unauthorized");
      store.dispatch(clearAuthToken());
    } else {
      throw e;
    }
  }
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
  return timezoneAwareDate.toJSDate();
}

export function getQueryParametersFromExpressions(
  expressions: Expression[]
): URLSearchParams {
  const queryParams = new URLSearchParams();
  expressions.forEach((expression) => {
    const key = `${expression.operand.name}${expression.operator.djangoExpression}`;

    if (expression.operand.transformValue) {
      expression.operand.transformValue(expression.value).forEach((value) => {
        queryParams.append(key, value);
      });
    } else {
      queryParams.append(key, expression.value.toString());
    }
  });
  return queryParams;
}

export function mergeURLSearchParams(
  paramList: (URLSearchParams | undefined)[]
): URLSearchParams {
  const params = new URLSearchParams();

  paramList.forEach((qp) => {
    if (!qp) return;

    for (var [key, val] of qp.entries()) {
      params.append(key, val);
    }
  });

  return params;
}
