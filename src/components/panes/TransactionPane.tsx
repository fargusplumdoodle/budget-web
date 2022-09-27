import React, { FunctionComponent, useState } from "react";
import { RootState } from "../../store/configureStore";
import { useSelector } from "react-redux";
import TransactionForm from "../forms/TransactionForm/TransactionForm";
import { Transaction } from "../../store/models/types";

interface Props {}

const TransactionPane: FunctionComponent<Props> = (props) => {
  const stateTransaction = useSelector(
    (state: RootState) => state.panes.transaction
  );
  const [loading, setLoading] = useState(false);

  const updateTransaction = async (transaction: Transaction) => {};
  const createTransaction = async (transaction: Transaction) => {};
  const deleteTransaction = async (transaction: Transaction) => {};

  const onSubmit = (transaction: Transaction) => {
    const submitFn = transaction.id ? updateTransaction : createTransaction;
  };

  return (
    <TransactionForm
      transaction={stateTransaction}
      onSubmit={onSubmit}
      onDelete={deleteTransaction}
      loading={loading}
    />
  );
};

export default TransactionPane;
