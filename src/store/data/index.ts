import { all, fork } from "redux-saga/effects";
import budgetSaga from "./budgets/saga";
import { transactionReducer, transactionSaga } from "./transactions";
import { combineReducers } from "redux";
import { budgetReducer } from "./budgets";

export * from "./budgets";
export * from "./transactions";

export function* dataSaga() {
  yield all([fork(transactionSaga), fork(budgetSaga)]);
}

export const dataReducer = combineReducers({
  budget: budgetReducer,
  transactions: transactionReducer,
});
