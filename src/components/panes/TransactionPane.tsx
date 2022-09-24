import React, { FunctionComponent } from "react";
import { RootState } from "../../store/configureStore";
import { useSelector } from "react-redux";
import TransactionForm from "../forms/TransactionForm/TransactionForm";
import { Transaction } from "../../store/models/types";

interface Props {}

const TransactionPane: FunctionComponent<Props> = (props) => {
  const transaction = useSelector(
    (state: RootState) => state.panes.transaction
  );

  const onSubmit = (transaction: Transaction) => {
    console.log("Submitting", transaction);
  };

  return <TransactionForm transaction={transaction} onSubmit={onSubmit} />;
};

export default TransactionPane;
