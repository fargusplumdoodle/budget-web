import * as React from "react";
import { FunctionComponent } from "react";
import PaginatedTransactionTableContainer from "../../components/transactions/transactions_table/PaginatedTransactionTableContainer";

interface Props {}

const TransactionsPage: FunctionComponent<Props> = () => {
  return (
    <>
      <PaginatedTransactionTableContainer />
    </>
  );
};

export default TransactionsPage;
