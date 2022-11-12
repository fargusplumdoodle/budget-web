import sha1 from 'sha1';
import { Transaction } from './types';
import {
  CRUDAction,
  getId,
  makeRequest,
  RequestStatus,
} from '../../communication';

export const getTransactionHash = (transaction: Transaction): string => {
  const message = `
  ${transaction.id}
  ${transaction.amount}
  ${transaction.description}
  ${transaction.date}
  ${transaction.income}
  ${transaction.transfer}
  `;
  return sha1(message);
};

export const getTransactionRequest = (
  transaction: Transaction,
  action: CRUDAction,
  status: RequestStatus,
) => makeRequest({
  id: getId('transaction', transaction),
  key: 'transaction',
  action,
  status,
});
