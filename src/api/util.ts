import axios, { AxiosRequestConfig } from "axios";
import round from "lodash/round";
import { store } from "../store/configureStore";
import { PaginatedQueryParams, PaginatedResponse } from "./types";
import { Expression } from "../components/query/types";
import { checkAuth } from "./endpoints/auth";
import { resetAuth, selectAuthState } from "../store";

export async function makeRequest(params: AxiosRequestConfig) {
  await checkAuth();

  const auth = selectAuthState(store.getState());
  try {
    return await axios({
      ...params,
      headers: {
        authorization: `${auth.tokenType} ${auth.accessToken}`,
        ...params.headers,
      },
    });
  } catch (e: any) {
    if (e?.response.status === 401) {
      store.dispatch(resetAuth());
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
    page,
  };

  const r = await makeRequest({
    method: "get",
    url: uri,
    params: queryParams,
  });

  if (r!.data.next) {
    return await makePaginatedRequest(uri, page + 1, pageSize, maxPages, [
      ...results,
      ...(r!.data as PaginatedResponse<T>).results,
    ]);
  }
  return [...results, ...(r!.data as PaginatedResponse<T>).results];
}

export function toCents(amount: number): number {
  return round(amount * 100, 2);
}
export function fromCents(amount: number): number {
  return round(amount / 100, 2);
}

export function getQueryParametersFromExpressions(
  expressions: Expression<any>[]
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

    for (const [key, val] of qp.entries()) {
      params.append(key, val);
    }
  });

  return params;
}
