import { Box, Card } from "@mui/material";
import * as React from "react";
import "./AddIncomePage.css";
import { FunctionComponent, useState } from "react";
import TransactionTable from "../../components/transactions/transactions_table/TransactionsTable";
import { Transaction } from "../../store/types/models";
import IncomeForm from "../../components/common/forms/transaction/IncomeForm/IncomeForm";

const AddIncomePage: FunctionComponent = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  return (
    <>
      <h2>Add Income</h2>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Card sx={{ width: "38%", m: 1, p: 1, maxHeight: 540 }}>
          <IncomeForm
            onCreateTransactions={(newTransactions) => {
              setTransactions([...newTransactions, ...transactions]);
            }}
          />
        </Card>

        <Card sx={{ width: "62%", m: 1 }}>
          <TransactionTable
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
            transactions={transactions}
            showBudget
          />
        </Card>
      </Box>
    </>
  );
};

export default AddIncomePage;
