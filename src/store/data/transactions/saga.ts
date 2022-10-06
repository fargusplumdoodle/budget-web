import { call, put, takeEvery } from "redux-saga/effects";
import {
  createTransaction,
  deleteTransaction,
  loadTransaction,
  updateTransaction,
} from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { Transaction, UpdateTransactionPayloadAction } from "./types";
import { getTransactionRequest } from "./utils";
import api from "../../../api/";
import { closeAllPanes } from "../../";

function* executeCreateTransaction({
  payload: transaction,
}: PayloadAction<Transaction>) {
  yield put(getTransactionRequest(transaction, "create", "loading"));
  try {
    const response: Transaction = yield call(
      api.transaction.createTransaction,
      transaction
    );
    yield put(loadTransaction(response));
    yield put(getTransactionRequest(transaction, "create", "loaded"));
  } catch {
    yield put(getTransactionRequest(transaction, "create", "error"));
  }
}

function* executeUpdateTransaction({
  payload: { newTransaction: transaction },
}: UpdateTransactionPayloadAction) {
  yield put(getTransactionRequest(transaction, "update", "loading"));

  try {
    const response: Transaction = yield call(
      api.transaction.updateTransaction,
      transaction
    );
    yield put(getTransactionRequest(transaction, "update", "loaded"));
    yield put(loadTransaction(response));
  } catch {
    yield put(getTransactionRequest(transaction, "update", "error"));
  }
}

function* executeDeleteTransaction({
  payload: transaction,
}: PayloadAction<Transaction>) {
  yield put(getTransactionRequest(transaction, "delete", "loading"));

  try {
    yield call(api.transaction.deleteTransaction, transaction);
    yield put(getTransactionRequest(transaction, "delete", "loaded"));
    yield put(closeAllPanes());
  } catch {
    yield put(getTransactionRequest(transaction, "delete", "error"));
  }
}

export default function* transactionSaga() {
  yield takeEvery(createTransaction.type, executeCreateTransaction);
  yield takeEvery(updateTransaction.type, executeUpdateTransaction);
  yield takeEvery(deleteTransaction.type, executeDeleteTransaction);
}
