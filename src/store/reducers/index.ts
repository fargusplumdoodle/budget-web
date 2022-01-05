import { combineReducers } from "redux";
import auth from "./authReducer";
import apiStatus from "./apiStatusReducer";
import budgets from "./budgetReducer";
import tags from "./tagReducer";
import transactions from "./transactionReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, auth),
  // budgets: persistReducer(persistConfig, budgets),
  // tags: persistReducer(persistConfig, tags),
  budgets,
  tags,
  apiStatus,
  transactions,
});
export default rootReducer;
