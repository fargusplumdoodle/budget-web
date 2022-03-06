import * as React from "react";
import { FunctionComponent, useState } from "react";
import PaginatedTransactionsTable from "../../components/transactions/transactions_table/PaginatedTransactionsTable";
import { Transaction } from "../../store/types/models";
import { removeFromValuesList, updateValuesList } from "../../util/state";
import VariableInputForm from "../../components/forms/search/VariableInputForm";
import api from "../../api";
import Card from "@mui/material/Card";
import ApiErrorDialog, { ApiError } from "../../components/ApiErrorDialog";
import { Box, LinearProgress } from "@mui/material";

interface Props {}

const TransactionsPage: FunctionComponent<Props> = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [query, setQuery] = useState({});
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);

  // TODO: FETCH MORE PAGES
  React.useEffect(() => {
    setLoading(true);
    api.transaction
      .fetchTransactionPage(0, 25, query)
      .then((page) => {
        setTransactions(page.results);
      })
      .catch((err) => {
        setLoading(false);
        setApiError(err);
      });
  }, [query]);

  function onSubmitQuery(queryParams: URLSearchParams) {
    setQuery(new URLSearchParams(queryParams));
  }

  return (
    <>
      <Card sx={{ marginBottom: 1 }}>
        <VariableInputForm submit={onSubmitQuery} />
      </Card>
      <Card>
        {!loading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          <PaginatedTransactionsTable
            showBudget
            transactions={transactions}
            onUpdateCallback={(trans: Transaction) =>
              updateValuesList<Transaction>(
                trans,
                transactions,
                setTransactions
              )
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
      </Card>

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

export default TransactionsPage;
