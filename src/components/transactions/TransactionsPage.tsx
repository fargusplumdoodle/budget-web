import * as React from "react";
import TransactionsTable from "./_components/TransactionsTable";
import { FunctionComponent, useEffect } from "react";
import { Transaction } from "../../store/types/models";
import { connect, useDispatch } from "react-redux";
import { RootState } from "../../store/configureStore";
import TransactionTableContainer from "./_components/TransactionTableContainer";

interface OwnProps {
  transactions: Transaction[];
}

type Props = OwnProps;

const TransactionsPage: FunctionComponent<Props> = ({ transactions }) => {
  return (
    <>
      <h1>Transactions</h1>
      <TransactionTableContainer />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  transactions: state.transactions.list,
});

export default connect(mapStateToProps)(TransactionsPage);
