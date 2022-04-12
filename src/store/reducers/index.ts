import { combineReducers } from "redux";
import auth from "./authReducer";
import apiStatus from "./apiStatusReducer";
import budgets from "./budgetReducer";
import tags from "./tagReducer";
import transactions from "./transactionReducer";
import storage from "redux-persist/lib/storage";
import userInfo from "./userInfoReducer";
import { persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  auth: persistReducer(
    {
      key: "auth",
      storage,
    },
    auth
  ),
  budgets: persistReducer(
    {
      key: "budgets",
      storage,
    },
    budgets
  ),
  tags: persistReducer(
    {
      key: "tags",
      storage,
    },
    tags
  ),
  apiStatus,
  transactions,
  userInfo,
});
export default rootReducer;
