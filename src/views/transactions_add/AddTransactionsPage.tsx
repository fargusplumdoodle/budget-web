import { Box, Card, styled, Tab, Tabs } from "@mui/material";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import "./AddTransactionsPage.css";
import TransactionTable from "../../components/transactions_legacy/transactions_table/TransactionsTable";
import { TabPanel, tabProps } from "../../components/tabs";
import TransferForm from "../../components/forms/transaction_legacy/TransferForm";
import settings from "../../app/settings";
import { Transaction } from "../../store/data/transactions/types";

const TRANSFER = 2;

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const FormContainer = styled(Box)(() => ({
  minWidth: settings.mobileWidth,
}));

const TransactionsContainer = styled(Card)(() => ({
  minWidth: settings.mobileWidth,
  flexGrow: 1,
}));

const AddTransactionsPage: FunctionComponent = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tab, setTab] = useState<number>(TRANSFER);

  const handleTabChange = (_: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  return (
    <Container>
      <FormContainer>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Tab label="Transfer" {...tabProps(TRANSFER)} />
        </Tabs>

        <TabPanel value={tab} index={TRANSFER}>
          <TransferForm
            onCreateCallback={(newTransactions: Transaction[]) => {
              setTransactions([...newTransactions, ...transactions]);
            }}
          />
        </TabPanel>
      </FormContainer>

      <TransactionsContainer>
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
      </TransactionsContainer>
    </Container>
  );
};

export default AddTransactionsPage;
