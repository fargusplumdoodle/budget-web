import * as React from "react";
import { FunctionComponent, useState } from "react";
import { Box, LinearProgress } from "@mui/material";
import api from "../../api";
import ApiErrorDialog, { ApiError } from "../ApiErrorDialog";
import { Budget, Transaction } from "../../store";
import { TransactionList } from "../transactions";

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
        <TransactionList transactions={transactions} />
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
