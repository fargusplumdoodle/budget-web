import { combineReducers } from "redux";
import {authReducer}from "../auth";
import budgets from "./budgetReducer";
import tags from "./tagReducer";
import transactions from "./transactionReducer";
import storage from "redux-persist/lib/storage";
import userInfo from "./userInfoReducer";
import ui from "./uiReducer";
import panes from "./panesReducer";
import { persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  auth: persistReducer(
    {
      key: "auth",
      storage,
    },
    authReducer
  ),
  ui: persistReducer(
    {
      key: "UI",
      storage,
    },
    ui
  ),
  budgets,
  tags,
  userInfo,
  transactions,
  panes,
});
export default rootReducer;
