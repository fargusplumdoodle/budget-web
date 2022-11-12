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
        padding={1}
        paddingTop={2}
        paddingBottom={2}
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
          xs={2}
          direction="column"
          justifyContent="center"
          alignItems="middle"
        >
          <Typography variant="body1">{transaction.amount}</Typography>
        </Grid>
      </Grid>
    </Background>
  );
};

export default TransactionListItem;
