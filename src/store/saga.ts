import { fork, all } from "redux-saga/effects";
import { dataSaga } from "./data";
import { sessionSaga } from "./session";

export default function* rootSaga() {
  yield all([fork(sessionSaga), fork(dataSaga)]);
}
