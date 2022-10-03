import { call, select, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  fetchUserSettings,
  loadUserSettings,
  setSystemTheme,
  updateUserSettings,
} from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { getUserSettingsRequest } from "./utils";
import api from "../../../api/";
import { ThemeSettings, UserSettingsState } from "./types";
import { Simulate } from "react-dom/test-utils";
import { selectUserSettings } from "./selectors";

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

function* executeSetSystemTheme({
  payload: theme,
}: PayloadAction<ThemeSettings>) {
  yield put(getUserSettingsRequest("update", "loading"));
  const existingSettings: UserSettingsState = yield select(selectUserSettings);

  try {
    const response: UserSettingsState = yield call(
      api.userInfo.updateUserInfo,
      { ...existingSettings, theme }
    );
    yield put(loadUserSettings(response));
    yield put(getUserSettingsRequest("update", "loaded"));
  } catch {
    yield put(getUserSettingsRequest("update", "error"));
  }
}

export default function* userSettingsSaga() {
  yield takeEvery(updateUserSettings.type, executeUpdateUserSettings);
  yield takeEvery(fetchUserSettings.type, executeFetchUserSettings);
  yield takeLatest(setSystemTheme.type, executeSetSystemTheme);
}
