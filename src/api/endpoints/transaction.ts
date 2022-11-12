import { makeRequest } from '../util';
import {
  PaginatedResponse,
  QueryParameters,
  SerializedTransaction,
} from '../types';
import { deserializeTransaction, serializeTransaction } from '../serializers';
import { store, Transaction } from '../../store';

export async function fetchTransactionPage(
  page: number,
  pageSize: number = 25,
  query?: URLSearchParams | QueryParameters,
): Promise<PaginatedResponse<Transaction>> {
  const params = new URLSearchParams(query);
  params.set('page_size', pageSize.toString());

  if (page !== 0) {
    params.set('page', page.toString());
  }

  const r = await makeRequest({
    method: 'get',
    url: '/api/v2/transaction/',
    params,
  });

  const transactions = r!.data.results.map((trans: any) => deserializeTransaction(trans));

  return { ...r!.data, results: transactions };
}

export async function createTransaction(
  trans: Transaction,
): Promise<Transaction> {
  function sleeper(ms: number) {
    return function (x: any) {
      return new Promise((resolve) => setTimeout(() => resolve(x), ms));
    };
  }
  await sleeper(1000)(() => null);
  const r = await makeRequest({
    method: 'post',
    url: '/api/v2/transaction/',
    data: serializeTransaction(trans),
  });
  return deserializeTransaction(r!.data as SerializedTransaction);
}

export async function updateTransaction(
  transaction: Transaction,
): Promise<Transaction> {
  const r = await makeRequest({
    method: 'put',
    url: `/api/v2/transaction/${transaction.id}/`,
    data: serializeTransaction(transaction),
  });
  return deserializeTransaction(r!.data as SerializedTransaction);
}

export async function deleteTransaction(trans: Transaction): Promise<void> {
  await makeRequest({
    method: 'delete',
    url: `/api/v2/transaction/${trans.id}/`,
    data: serializeTransaction(trans),
  });
}
