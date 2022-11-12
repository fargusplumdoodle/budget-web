import { Grid, styled } from "@mui/material";
import * as React from "react";
import { Transaction } from "../../../store";
import TransactionListItem from "./TransactionListItem";

type Props = {
  transactions: (Transaction | null)[];
  onCreateCallback?: (trans: Transaction) => void;
  onUpdateCallback?: (trans: Transaction) => void;
  onDeleteCallback?: (trans: Transaction) => void;
  defaultRowsPerPage?: number;
};
const Root = styled(Grid)({
  maxWidth: 312,
});

function TransactionList({ transactions }: Props) {
  return (
    <Root container gap={1} wrap="nowrap" direction="column">
      {transactions.map(
        (transaction) =>
          transaction && (
            <Grid item key={transaction.id}>
              <TransactionListItem transaction={transaction} />
            </Grid>
          )
      )}
    </Root>
  );
}

export default TransactionList;
