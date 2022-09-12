import { Transaction } from "../../store/models/types";
import { makeRequest } from "../util";
import {
  PaginatedResponse,
  QueryParameters,
  SerializedTransaction,
} from "../types";
import { deserializeTransaction, serializeTransaction } from "../serializers";
import { store } from "../../store/configureStore";
import { updateBudgetSuccess } from "../../store/actions/budgetActions";

export async function fetchTransactionPage(
  page: number,
  pageSize: number = 25,
  query?: URLSearchParams | QueryParameters
): Promise<PaginatedResponse<Transaction>> {
  const params = new URLSearchParams(query);
  params.set("page_size", pageSize.toString());

  if (page !== 0) {
    params.set("page", page.toString());
  }

  const r = await makeRequest({
    method: "get",
    url: "/api/v2/transaction/",
    params: params,
  });

  const transactions = r!.data.results.map((trans: any) => {
    return deserializeTransaction(trans);
  });

  return { ...r!.data, results: transactions };
}

export async function createTransaction(
  trans: Transaction
): Promise<Transaction> {
  const r = await makeRequest({
    method: "post",
    url: "/api/v2/transaction/",
    data: serializeTransaction(trans),
  });
  const newTransaction = deserializeTransaction(
    r!.data as SerializedTransaction
  );

  store.dispatch(
    updateBudgetSuccess({
      ...newTransaction.budget,
      balance: newTransaction.budget.balance + newTransaction.amount,
    })
  );

  return newTransaction;
}

export async function updateTransaction(
  oldTrans: Transaction,
  newTrans: Transaction
): Promise<Transaction> {
  const r = await makeRequest({
    method: "put",
    url: `/api/v2/transaction/${newTrans.id}/`,
    data: serializeTransaction(newTrans),
  });
  const trans = deserializeTransaction(r!.data as SerializedTransaction);

  store.dispatch(
    updateBudgetSuccess({
      ...trans.budget,
      balance: trans.budget.balance - oldTrans.amount + trans.amount,
    })
  );

  return trans;
}

export async function deleteTransaction(
  trans: Transaction
): Promise<Transaction> {
  await makeRequest({
    method: "delete",
    url: `/api/v2/transaction/${trans.id}/`,
    data: serializeTransaction(trans),
  });

  store.dispatch(
    updateBudgetSuccess({
      ...trans.budget,
      balance: trans.budget.balance - trans.amount,
    })
  );

  return trans;
}
