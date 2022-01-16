import * as React from "react";
import { FunctionComponent } from "react";
import TransactionTableContainer from "./_components/TransactionTableContainer";

interface Props {}

const TransactionsPage: FunctionComponent<Props> = () => {
  return (
    <>
      <h1>Transactions</h1>
      <TransactionTableContainer />
    </>
  );
};

export default TransactionsPage;
