import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION,
} from "../actions/actionTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../models/types";
import api from "../../api";
import {
  loadTransactionSuccess,
  setTransactionStateStatus,
} from "../actions/transactionActions";
import { Operation } from "../types/stateTypes";

const generateSaga = (
  apiCall: (transaction: Transaction) => Promise<Transaction>,
  operation: Operation
) => {
  return function* (action: PayloadAction<Transaction>): Generator<any> {
    yield put(
      setTransactionStateStatus(action.payload, {
        status: "loading",
        operation: operation,
      })
    );

    const transaction = yield call(apiCall, action.payload);

    yield put(
      setTransactionStateStatus(action.payload, {
        status: "loaded",
        operation: operation,
      })
    );
    yield put(loadTransactionSuccess(transaction as Transaction));
  };
};

export default function* transactionSaga() {
  yield takeEvery(
    CREATE_TRANSACTION,
    generateSaga(api.transaction.createTransaction, "create")
  );
  // yield takeEvery(
  //   UPDATE_TRANSACTION,
  //   generateSaga(api.transaction.updateTransaction, "update")
  // );
  yield takeEvery(
    DELETE_TRANSACTION,
    generateSaga(api.transaction.deleteTransaction, "update")
  );
}
