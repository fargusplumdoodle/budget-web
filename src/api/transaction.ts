import { Transaction } from "../store/types/models";
import { makeRequest } from "./util";
import {
  PaginatedQueryParams,
  PaginatedResponse,
  SerializedTransaction,
} from "./types";
import {
  deserializeTransaction,
  serializeTransaction,
} from "../util/serializers";
import { beginApiCall } from "../store/actions/apiStatusActions";
import { store } from "../store/configureStore";
import { updateBudgetSuccess } from "../store/actions/budgetActions";

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

  const transactions = r.data.results.map((trans: any) => {
    return deserializeTransaction(trans);
  });

  return { ...r.data, results: transactions };
}

export async function createTransaction(
  trans: Transaction
): Promise<Transaction> {
  store.dispatch(beginApiCall());

  const r = await makeRequest({
    method: "post",
    url: "/api/v2/transaction/",
    data: serializeTransaction(trans),
  });
  const newTransaction = deserializeTransaction(
    r.data as SerializedTransaction
  );

  store.dispatch(
    updateBudgetSuccess({
      ...newTransaction.budget,
      balance: newTransaction.budget.balance + newTransaction.amount,
    })
  );

  return newTransaction;
}
