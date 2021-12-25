import { combineReducers } from "redux";
import auth from "./authReducer";
import apiStatus from "./apiStatusReducer";
import budgets from "./budgetReducer";
import transactions from "./transactionReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, auth),
  apiStatus,
  budgets,
  transactions,
});
export default rootReducer;
