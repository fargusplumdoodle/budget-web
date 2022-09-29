import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  refreshAuthToken,
  requestAuthToken,
  resetAuth,
  setAuth,
} from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./types";
import * as authApi from "../../api/endpoints/auth";
import axios from "axios";

function* executeRequestAuthToken({ payload }: PayloadAction<AuthState>) {
  try {
    const response: AuthState = yield call(
      authApi.retrieveToken,
      payload.authCode
    );
    console.log("here", response);
    yield put(setAuth(response));
  } catch {
    yield put(setAuth({ ...payload, status: "error" }));
  }
}

function* executeRefreshAuthToken({ payload }: PayloadAction<AuthState>) {
  try {
    const response: AuthState = yield call(
      authApi.refreshToken,
      payload.refreshToken
    );
    yield put(setAuth(response));
  } catch {
    yield put(setAuth({ ...payload, status: "error" }));
  }
}

function* executeResetAuth() {
  axios.defaults.headers.common.Authorization = "";
  yield;
}

export function* authSaga(): SagaIterator {
  yield takeLatest(requestAuthToken.type, executeRequestAuthToken);
  yield takeLatest(refreshAuthToken.type, executeRefreshAuthToken);
  yield takeLatest(resetAuth.type, executeResetAuth);
}
