import * as React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Grid, Stack, SxProps, Typography } from "@mui/material";
import { capitalize } from "lodash";
import { RootState } from "../store/configureStore";
import { formatCurrency } from "../util/formatters";
import DashboardTile from "../components/dashboard/DashboardTile";
import BudgetBalanceReport from "../components/budget/BudgetBalanceReport";
import BudgetTransactionTable from "../components/budget/BudgetTransactionTable";
import SpendingSummary from "../components/budget/spending_summary/SpendingSummary";

const classes: { [id: string]: SxProps } = {
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    p: 2,
    paddingTop: 4,
  },
};

const BudgetDetailPage: React.FC = function () {
  const { id } = useParams();
  const budget = useSelector(
    (state: RootState) => state.budgets.byId[parseInt(id)]
  );
  if (!budget) {
    return <Typography variant="h1">ooof, can't find that one</Typography>;
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={6} justifyContent="center" alignItems="center">
        <Stack spacing={1}>
          <Card sx={classes.header}>
            <Typography variant="h3">{capitalize(budget.name)}</Typography>
            <Typography variant="h3">
              {formatCurrency(budget.balance, false)}
            </Typography>
          </Card>

          <Card>
            <BudgetTransactionTable budget={budget} />
          </Card>
        </Stack>
      </Grid>

      <Grid item xs={6} justifyContent="center" alignItems="center">
        <Stack spacing={1}>
          <DashboardTile>
            <BudgetBalanceReport budget={budget} />
          </DashboardTile>

          <DashboardTile>
            <SpendingSummary budget={budget} />
          </DashboardTile>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BudgetDetailPage;
