import { cloneDeep } from 'lodash';
import exampleTransactions from '../../../../__fixtures__/transactions';
import reducer, {
  createTransaction,
  deleteTransaction,
  loadTransaction,
  loadTransactions,
  updateTransaction,
} from '../slice';
import { Transaction, TransactionState } from '../types';

const getEmptyState = (): TransactionState => ({ list: [], byId: {} });

const getStateFromTransaction = (
  transaction: Transaction,
): TransactionState => ({
  list: [transaction],
  byId: { [transaction.id]: transaction },
});

describe('Transaction reducer', () => {
  it('load transactions', () => {
    const transactions = cloneDeep(exampleTransactions.slice(0, 5));

    const nextState = reducer(getEmptyState(), loadTransactions(transactions));

    transactions.forEach((t) => {
      expect(nextState.byId[t.id]).toBe(t);
      expect(nextState.list).toContain(t);
    });
  });

  it('load transactions, prevent duplicate transactions', () => {
    const transactions = exampleTransactions.slice(0, 2);

    // with existing transactions
    const state = reducer(getEmptyState(), loadTransactions(transactions));

    const modifiedTransactions: Transaction[] = transactions.map((t) => ({
      ...t,
      description: 'ey',
    }));

    const nextState = reducer(state, loadTransactions(modifiedTransactions));
    expect(nextState.list.length).toEqual(2);
    modifiedTransactions.forEach((t) => {
      expect(nextState.byId[t.id]).toBe(t);
      expect(nextState.list).toContain(t);
    });
  });

  it('should load transaction', () => {
    const initialTrans = cloneDeep(exampleTransactions[0]);
    const initialState = getStateFromTransaction(initialTrans);
    const modifiedTransaction = { ...initialTrans, description: 'ay' };

    const nextState = reducer(
      initialState,
      loadTransaction(modifiedTransaction),
    );

    expect(nextState).toEqual(getStateFromTransaction(modifiedTransaction));
  });

  it('should not modify state on create transaction', () => {
    // Saga will create transaction in API and then loadTransaction
    const transaction = cloneDeep(exampleTransactions[0]);
    const initialState = getEmptyState();

    const nextState = reducer(initialState, createTransaction(transaction));

    expect(nextState).toEqual(initialState);
  });

  it('should delete transaction', () => {
    const transaction = cloneDeep(exampleTransactions[0]);
    const initialState = getStateFromTransaction(transaction);

    const nextState = reducer(initialState, deleteTransaction(transaction));

    expect(nextState).toEqual(getEmptyState());
  });

  it('should update transaction', () => {
    const transaction = cloneDeep(exampleTransactions[0]);
    const initialState = getStateFromTransaction(transaction);
    const modifiedTransaction = { ...transaction, description: 'ey' };

    const nextState = reducer(
      initialState,
      updateTransaction({
        newTransaction: modifiedTransaction,
        oldTransaction: transaction,
      }),
    );

    expect(nextState).toEqual(getStateFromTransaction(modifiedTransaction));
  });
});
