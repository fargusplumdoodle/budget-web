import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { all, fork } from 'redux-saga/effects';
import { userSettingsReducer, userSettingsSaga } from './userSettings';
import { authReducer, authSaga } from './auth';

export * from './auth';
export * from './userSettings';

export const sessionReducer = combineReducers({
  auth: persistReducer(
    {
      key: 'auth',
      storage,
    },
    authReducer,
  ),
  userSettings: userSettingsReducer,
});

export function* sessionSaga() {
  yield all([fork(authSaga), fork(userSettingsSaga)]);
}
