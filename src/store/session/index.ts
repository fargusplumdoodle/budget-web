import { authReducer } from "./auth";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userSettingsReducer } from "./userSettings";

export * from "./auth";
export * from "./userSettings";

export const sessionReducer = combineReducers({
  auth: persistReducer(
    {
      key: "auth",
      storage,
    },
    authReducer
  ),
  userSettings: userSettingsReducer,
});
