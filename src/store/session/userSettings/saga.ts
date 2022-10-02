import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchUserSettings,
  loadUserSettings,
  updateUserSettings,
} from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { getUserSettingsRequest } from "./utils";
import api from "../../../api/";
import { UserSettingsState } from "./types";

function* executeUpdateUserSettings({
  payload: userSettings,
}: PayloadAction<UserSettingsState>) {
  yield put(getUserSettingsRequest("update", "loading"));

  try {
    const response: UserSettingsState = yield call(
      api.userInfo.updateUserInfo,
      userSettings
    );
    yield put(loadUserSettings(response));
    yield put(getUserSettingsRequest("update", "loaded"));
  } catch {
    yield put(getUserSettingsRequest("update", "error"));
  }
}

function* executeFetchUserSettings() {
  yield put(getUserSettingsRequest("retrieve", "loading"));

  try {
    const response: UserSettingsState = yield call(
      api.userInfo.receiveUserInfo
    );
    yield put(loadUserSettings(response));
    yield put(getUserSettingsRequest("retrieve", "loaded"));
  } catch {
    yield put(getUserSettingsRequest("retrieve", "error"));
  }
}

export default function* userSettingsSaga() {
  yield takeEvery(updateUserSettings.type, executeUpdateUserSettings);
  yield takeEvery(fetchUserSettings.type, executeFetchUserSettings);
}
