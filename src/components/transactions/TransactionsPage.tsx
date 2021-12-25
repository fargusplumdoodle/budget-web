import * as React from "react";
import { bulkGenerator, generateTestTransaction } from "../../util/generators";
import TransactionsTable from "./TransactionsTable";

interface Props {}

export default function TransactionsPage(props: Props) {
  const transactions = bulkGenerator(generateTestTransaction, 100);
  return (
    <>
      <h1>Transactions</h1>
      <TransactionsTable transactions={transactions} showBudget />
    </>
  );
}
