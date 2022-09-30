import * as React from "react";
import { FunctionComponent, useState } from "react";
import PaginatedTransactionsTable from "../../components/transactions/transactions_table/PaginatedTransactionsTable";
import { Budget } from "../../store/models/types";
import { removeFromValuesList, updateValuesList } from "../../util/state";
import api from "../../api";
import ApiErrorDialog, { ApiError } from "../ApiErrorDialog";
import { Box, LinearProgress } from "@mui/material";
import {Transaction} from "../../store/transactions/types";

interface Props {
  budget: Budget;
}

const BudgetTransactionTable: FunctionComponent<Props> = ({ budget }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);

  // TODO: FETCH MORE PAGES
  React.useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams({ budget: budget.id!.toString() });
    api.transaction
      .fetchTransactionPage(0, 25, query)
      .then((page) => {
        setTransactions(page.results);
      })
      .catch((err) => {
        setLoading(false);
        setApiError(err);
      });
  }, [budget.id]);

  return (
    <>
      {!loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <PaginatedTransactionsTable
          showBudget={false}
          transactions={transactions}
          onUpdateCallback={(trans: Transaction) =>
            updateValuesList<Transaction>(trans, transactions, setTransactions)
          }
          onDeleteCallback={(trans: Transaction) => {
            removeFromValuesList<Transaction>(
              trans,
              transactions,
              setTransactions
            );
          }}
        />
      )}

      <ApiErrorDialog
        error={apiError}
        onClose={() => {
          setApiError(null);
          setLoading(false);
        }}
      />
    </>
  );
};

export default BudgetTransactionTable;
