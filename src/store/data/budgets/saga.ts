import { call, put, takeEvery } from "redux-saga/effects";
import { createBudget, deleteBudget, loadBudget, updateBudget } from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { Budget } from "./types";
import { getBudgetRequest } from "./utils";
import api from "../../../api/";

function* executeCreateBudget({ payload: budget }: PayloadAction<Budget>) {
  yield put(getBudgetRequest(budget, "create", "loading"));
  try {
    const response: Budget = yield call(api.budget.createBudget, budget);
    yield put(getBudgetRequest(budget, "create", "loaded"));
    yield put(loadBudget(response));
  } catch {
    yield put(getBudgetRequest(budget, "create", "error"));
  }
}

function* executeUpdateBudget({ payload: budget }: PayloadAction<Budget>) {
  yield put(getBudgetRequest(budget, "update", "loading"));

  try {
    const response: Budget = yield call(api.budget.updateBudget, budget);
    yield put(loadBudget(response));
    yield put(getBudgetRequest(budget, "update", "loaded"));
  } catch {
    yield put(getBudgetRequest(budget, "update", "error"));
  }
}

function* executeDeleteBudget({ payload: budget }: PayloadAction<Budget>) {
  yield put(getBudgetRequest(budget, "delete", "loading"));

  try {
    yield call(api.budget.deleteBudget, budget);
    yield put(getBudgetRequest(budget, "delete", "loaded"));
  } catch {
    yield put(getBudgetRequest(budget, "delete", "error"));
  }
}

export default function* budgetSaga() {
  yield takeEvery(createBudget.type, executeCreateBudget);
  yield takeEvery(updateBudget.type, executeUpdateBudget);
  yield takeEvery(deleteBudget.type, executeDeleteBudget);
}
