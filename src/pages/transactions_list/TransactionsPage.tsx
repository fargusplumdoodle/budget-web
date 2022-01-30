import * as React from "react";
import { FunctionComponent } from "react";
import PaginatedTransactionTableContainer from "../../components/transactions/transactions_table/PaginatedTransactionTableContainer";

interface Props {}

const TransactionsPage: FunctionComponent<Props> = () => {
  return (
    <>
      <h1>Transactions</h1>
      <PaginatedTransactionTableContainer />
    </>
  );
};

export default TransactionsPage;
