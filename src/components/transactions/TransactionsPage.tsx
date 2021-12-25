import * as React from "react";
import TransactionsTable from "./TransactionsTable";
import { FunctionComponent, useEffect } from "react";
import { Transaction } from "../../store/types/models";
import { connect, useDispatch } from "react-redux";
import { RootState } from "../../store/configureStore";
import { fetchTransactions } from "../../store/actions/transactionActions";

interface OwnProps {
  transactions: Transaction[];
}

type Props = OwnProps;

const TransactionsPage: FunctionComponent<Props> = ({ transactions }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (transactions.length == 0) {
      dispatch(fetchTransactions());
    }
  });
  return (
    <>
      <h1>Transactions</h1>
      <TransactionsTable transactions={transactions} showBudget />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  transactions: state.transactions.list,
});

export default connect(mapStateToProps)(TransactionsPage);
