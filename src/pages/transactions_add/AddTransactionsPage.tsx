import { Box, Card } from "@mui/material";
import * as React from "react";
import "./AddTransactionsPage.css";
import { FunctionComponent, useState } from "react";
import TransactionForm from "../../components/common/forms/transaction/TransactionForm";
import TransactionTable from "../../components/transactions/transactions_table/TransactionsTable";
import { Transaction } from "../../store/types/models";
import { range } from "lodash";
import {
  generateTestTag,
  generateTestTransaction,
} from "../../util/generators";

interface Props {}

const AddTransactionsPage: FunctionComponent<Props> = ({}) => {
  const tmpInitState = range(20).map(() =>
    generateTestTransaction({ tags: [generateTestTag()] })
  );
  const [transactions, setTransactions] = useState<Transaction[]>(tmpInitState);
  return (
    <>
      <h2>Add Transactions</h2>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Card sx={{ width: "38%", m: 1, p: 1, maxHeight: 700 }}>
          <p className="transactionFormHeader">Transaction</p>
          <TransactionForm
            onSubmitCallback={(trans) => {
              setTransactions([trans, ...transactions]);
            }}
          />
        </Card>

        <Card sx={{ width: "62%", m: 1 }}>
          <TransactionTable transactions={transactions} showBudget />
        </Card>
      </Box>
    </>
  );
};

export default AddTransactionsPage;
