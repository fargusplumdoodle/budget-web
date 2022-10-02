import { fork, all } from "redux-saga/effects";
import { authSaga } from "./auth";
import { dataSaga } from "./data";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(dataSaga)]);
}
