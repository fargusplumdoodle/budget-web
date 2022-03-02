import { Box, Card, Tab, Tabs } from "@mui/material";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import "./AddTransactionsPage.css";
import TransactionForm from "../../components/forms/transaction/TransactionForm";
import TransactionTable from "../../components/transactions/transactions_table/TransactionsTable";
import { Transaction } from "../../store/types/models";
import IncomeForm from "../../components/forms/transaction/IncomeForm";
import { TabPanel, tabProps } from "../../components/common/tabs";
import TransferForm from "../../components/forms/transaction/TransferForm";

const ADD = 0;
const INCOME = 1;
const TRANSFER = 2;

const AddTransactionsPage: FunctionComponent = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tab, setTab] = useState<number>(ADD);

  const handleTabChange = (_: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Card sx={{ width: "38%", m: 1, p: 1 }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Tab label="Add" {...tabProps(ADD)} />
            <Tab label="Income" {...tabProps(INCOME)} />
            <Tab label="Transfer" {...tabProps(TRANSFER)} />
          </Tabs>

          <TabPanel value={tab} index={ADD}>
            <TransactionForm
              onCreateCallback={(trans) => {
                setTransactions([trans, ...transactions]);
              }}
            />
          </TabPanel>

          <TabPanel value={tab} index={INCOME}>
            <IncomeForm
              onCreateTransactions={(newTransactions: Transaction[]) => {
                setTransactions([...newTransactions, ...transactions]);
              }}
            />
          </TabPanel>

          <TabPanel value={tab} index={TRANSFER}>
            <TransferForm
              onCreateCallback={(newTransactions: Transaction[]) => {
                setTransactions([...newTransactions, ...transactions]);
              }}
            />
          </TabPanel>
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

export default AddTransactionsPage;
