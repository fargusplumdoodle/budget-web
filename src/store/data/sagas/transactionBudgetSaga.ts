import { put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
  Transaction,
  UpdateTransactionPayloadAction,
} from "../transactions";
import { loadBudget } from "../budgets/slice";

function* executeCreateTransaction({
  payload: transaction,
}: PayloadAction<Transaction>) {
  const budget = {
    ...transaction.budget,
    balance: transaction.budget.balance + transaction.amount,
  };
  yield put(loadBudget(budget));
}

function* executeUpdateTransaction({
  payload,
}: UpdateTransactionPayloadAction) {
  const { newTransaction, oldTransaction } = payload;

  const oldBudget = {
    ...oldTransaction.budget,
    balance: oldTransaction.budget.balance - oldTransaction.amount,
  };
  const newBudget = {
    ...newTransaction.budget,
    balance: newTransaction.budget.balance + newTransaction.amount,
  };
  yield put(loadBudget(oldBudget));
  yield put(loadBudget(newBudget));
}

function* executeDeleteTransaction({
  payload: transaction,
}: PayloadAction<Transaction>) {
  const budget = {
    ...transaction.budget,
    balance: transaction.budget.balance - transaction.amount,
  };
  yield put(loadBudget(budget));
}

export default function* transactionBudgetSaga() {
  yield takeEvery(createTransaction.type, executeCreateTransaction);
  yield takeEvery(updateTransaction.type, executeUpdateTransaction);
  yield takeEvery(deleteTransaction.type, executeDeleteTransaction);
}
