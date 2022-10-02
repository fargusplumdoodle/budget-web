import { combineReducers } from "redux";
import { authReducer } from "../auth";
import { budgetReducer as budgets } from "../data/budgets";
import tags from "./tagReducer";
import { transactionReducer as transactions } from "../data/transactions";
import storage from "redux-persist/lib/storage";
import userInfo from "./userInfoReducer";
import { reducer as communication } from "../communication";
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
  communication,
});
export default rootReducer;
