import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import PaginatedTransactionTable from "./PaginatedTransactionsTable";
import { Transaction } from "../../../store/types/models";
import { PaginatedResponse } from "../../../api/types";
import { fetchTransactionPage } from "../../../api/transaction";
import { CircularProgress } from "@mui/material";

interface OwnProps {}
type Props = OwnProps;

interface State {
  transactions: Transaction[];
  count: number;
  page: number;
  pageSize: number;
  loading: boolean;
}

const initialState: State = {
  transactions: [],
  count: 0,
  page: 1,
  pageSize: 25,
  loading: true,
};

const PaginatedTransactionTableContainer: FunctionComponent<Props> = () => {
  const [state, setState] = useState(initialState);

  const getPage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setState({ ...state, loading: true });
    console.log("fetching page: ", page, "size", state.pageSize);
    fetchTransactionPage(page, state.pageSize).then(
      (response: PaginatedResponse<Transaction>) => {
        setState({
          ...state,
          transactions: response.results,
          count: response.count,
          page: state.page + 1,
          loading: false,
        });
      }
    );
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    console.log(parseInt(event.target.value));
    setState({ ...state, pageSize: parseInt(event.target.value) });
    getPage(null, state.page);
  };

  useEffect(() => {
    if (state.transactions.length === 0) {
      getPage(null, 0);
    }
  }, [state.transactions.length]); // eslint-disable-line react-hooks/exhaustive-deps

  if (state.loading) {
    return <CircularProgress />;
  }
  return (
    <PaginatedTransactionTable
      transactions={state.transactions}
      showBudget
      rowsPerPage={state.pageSize}
      count={state.count}
      page={state.page}
      onPageChange={getPage}
      handlePageSizeChange={handlePageSizeChange}
    />
  );
};

export default PaginatedTransactionTableContainer;
