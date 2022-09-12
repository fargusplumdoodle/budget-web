import * as React from "react";
import { FunctionComponent, useState } from "react";
import PaginatedTransactionsTable from "../../components/transactions/transactions_table/PaginatedTransactionsTable";
import { Transaction } from "../../store/models/types";
import { removeFromValuesList, updateValuesList } from "../../util/state";
import api from "../../api";
import Card from "@mui/material/Card";
import ApiErrorDialog, { ApiError } from "../../components/ApiErrorDialog";
import { Box, LinearProgress } from "@mui/material";
import QueryForm from "../../components/query";
import { Expression } from "../../components/query/types";
import { getQueryParametersFromExpressions } from "../../api/util";

interface Props {}

const TransactionsPage: FunctionComponent<Props> = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [query, setQuery] = useState({});
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);
  const [expressions, setExpressions] = useState<Expression<any>[]>([]);

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

  const onChangeExpressions = (newExpressions: Expression<any>[]) => {
    setExpressions(newExpressions);
    onSubmitQuery(getQueryParametersFromExpressions(newExpressions));
  };

  return (
    <>
      <Box sx={{ marginBottom: 2 }}>
        <QueryForm
          expressions={expressions}
          onChangeExpressions={onChangeExpressions}
        />
      </Box>
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
