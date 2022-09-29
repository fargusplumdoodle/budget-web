import { fork } from "redux-saga/effects";
import transactionSaga from "./transaction";

export default function* rootSage() {
  yield [fork(transactionSaga)];
}
