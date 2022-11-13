import { combineReducers } from "redux";
import { budgetReducer } from "./budgets";
import { transactionReducer } from "./transactions";
import { tagReducer } from "./tags";
import { reportReducer } from "./reports";

const dataReducer = combineReducers({
  budgets: budgetReducer,
  transactions: transactionReducer,
  tags: tagReducer,
  reports: reportReducer,
});

export default dataReducer;
