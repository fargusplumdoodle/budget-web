import * as React from "react";
import { FunctionComponent } from "react";
import TransactionTable from "../../components/transactions/transactions_table/TransactionsTable";

interface Props {}

const TransactionsPage: FunctionComponent<Props> = () => {
  return (
    <>
      <TransactionTable showBudget={false} transactions={[]} />
    </>
  );
};

export default TransactionsPage;
