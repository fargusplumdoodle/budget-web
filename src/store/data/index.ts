import { all, fork } from "redux-saga/effects";
import { combineReducers } from "redux";
import { transactionReducer, transactionSaga } from "./transactions";
import { budgetReducer, budgetSaga } from "./budgets";
import { tagReducer, tagSaga } from "./tags";
import transactionBudgetSaga from "./sagas/transactionBudgetSaga";

export * from "./budgets";
export * from "./transactions";
export * from "./tags";

export function* dataSaga() {
  yield all([
    fork(transactionSaga),
    fork(budgetSaga),
    fork(tagSaga),
    fork(transactionBudgetSaga),
  ]);
}

export const dataReducer = combineReducers({
  budgets: budgetReducer,
  transactions: transactionReducer,
  tags: tagReducer,
});
