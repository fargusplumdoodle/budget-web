import { combineReducers } from "redux";
import auth from "./authReducer";
import apiStatus from "./apiStatusReducer";
import budgets from "./budgetReducer";

const rootReducer = combineReducers({
  auth,
  apiStatus,
  budgets,
});
export default rootReducer;
