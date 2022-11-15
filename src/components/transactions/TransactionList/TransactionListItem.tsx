import React, { FunctionComponent } from "react";
import { Card, Grid, styled, Typography } from "@mui/material";
import capitalize from "lodash/capitalize";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { openTransactionPane, Transaction } from "../../../store";

interface Props {
  transaction: Transaction;
}

const Background = styled(Card)({
  borderRadius: "10px",
});

const TransactionListItem: FunctionComponent<Props> = ({ transaction }) => {
  const dispatch = useDispatch();
  const tags = transaction.tags.map((t) => capitalize(t.name)).join(", ");
  return (
    <Background onClick={() => dispatch(openTransactionPane(transaction))}>
      <Grid
        container
        gap={1}
        p={2}
        direction="row"
        justifyContent="space-between"
        wrap="nowrap"
      >
        <Grid item container direction="column" justifyContent="center">
          <Grid item component={Typography} variant="body1">
            {tags}
          </Grid>
          <Grid
            item
            component={Typography}
            variant="body2"
            color="text.disabled"
          >
            {capitalize(transaction.budget.name)} -{" "}
            {format(transaction.date, "LLL d, yyyy")}
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent="flex-end"
          alignItems="center"
          xs={1}
        >
          <Typography variant="body1" textAlign="right">
            {transaction.amount}
          </Typography>
        </Grid>
      </Grid>
    </Background>
  );
};

export default TransactionListItem;
