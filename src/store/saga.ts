import { fork, all } from "redux-saga/effects";
import { authSaga } from "./auth";
import transactionSaga from "./data/transactions/saga";
import budgetSaga from "./data/budgets/saga";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(transactionSaga), fork(budgetSaga)]);
}
