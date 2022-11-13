import { all, fork } from "redux-saga/effects";
import { transactionSaga } from "./transactions";
import { budgetSaga } from "./budgets";
import { tagSaga } from "./tags";
import transactionBudgetSaga from "./sagas/transactionBudgetSaga";

export * from "./budgets";
export * from "./transactions";
export * from "./tags";
export * from "./reports";

export function* dataSaga() {
  yield all([
    fork(transactionSaga),
    fork(budgetSaga),
    fork(tagSaga),
    fork(transactionBudgetSaga),
  ]);
}
