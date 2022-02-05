import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { range } from "lodash";
import { fetchTransactionPage } from "../../api/transaction";
import PaginatedTransactionsTable from "../../components/transactions/transactions_table/PaginatedTransactionsTable";
import { Transaction } from "../../store/types/models";
import { PaginatedResponse } from "../../api/types";

interface Props {}

const TransactionsPage: FunctionComponent<Props> = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    const promises = range(10).map((page) => {
      return fetchTransactionPage(page);
    });
    Promise.allSettled(promises).then(
      (
        promiseStates: PromiseFulfilledResult<PaginatedResponse<Transaction>>[]
      ) => {
        const trans: Transaction[] = [];
        promiseStates
          .filter((p) => p.status === "fulfilled")
          .map((promise) => trans.push(...promise.value.results));
        setTransactions([...transactions, ...trans]);
        console.log("transactions ", [...transactions, ...trans]);
      }
    );
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <PaginatedTransactionsTable
        showBudget
        transactions={transactions}
        onUpdateCallback={(trans: Transaction) => {
          const index = transactions.findIndex(
            (t: Transaction) => t.id === trans.id
          );
          setTransactions([
            ...transactions.slice(0, index),
            trans,
            ...transactions.slice(index + 1),
          ]);
        }}
        onDeleteCallback={(trans: Transaction) => {
          const index = transactions.findIndex(
            (t: Transaction) => t.id === trans.id
          );
          setTransactions([
            ...transactions.slice(0, index),
            ...transactions.slice(index + 1),
          ]);
        }}
      />
    </>
  );
};

export default TransactionsPage;
