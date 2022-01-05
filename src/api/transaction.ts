import { Transaction } from "../store/types/models";
import { store } from "../store/configureStore";
import { makeRequest } from "./util";
import { PaginatedQueryParams, PaginatedResponse } from "./types";

export async function fetchTransactionPage(
  page: number,
  pageSize: number = 25
): Promise<PaginatedResponse<Transaction>> {
  const params: PaginatedQueryParams = { page_size: pageSize };
  if (page !== 0) {
    params.page = page;
  }

  const r = await makeRequest({
    method: "get",
    url: "/api/v2/transaction/",
    params: params,
  });
  const state = store.getState();

  const transactions = r.data.results.map((trans: any) => {
    return {
      ...trans,
      date: new Date(trans.date),
      budget_id: trans.budget,
      budget: state.budgets.byId[trans.budget],
    };
  });

  return { ...r.data, results: transactions };
}
