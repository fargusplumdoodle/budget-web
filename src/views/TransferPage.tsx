import { Grid, styled } from "@mui/material";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { Transaction } from "../store";
import { TransferForm, TransactionList } from "../components";
import settings from "../app/settings";

const Container = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const FormContainer = styled(Grid)(() => ({
  minWidth: settings.mobileWidth,
}));

const TransactionsContainer = styled(Grid)(() => ({
  minWidth: settings.mobileWidth,
}));

const TransferPage: FunctionComponent = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  return (
    <Container container gap={1}>
      <FormContainer item>
        <TransferForm
          onCreateCallback={(newTransactions: Transaction[]) => {
            setTransactions([...newTransactions, ...transactions]);
          }}
        />
      </FormContainer>

      <TransactionsContainer item xs>
        <TransactionList transactions={transactions} />
      </TransactionsContainer>
    </Container>
  );
};

export default TransferPage;
