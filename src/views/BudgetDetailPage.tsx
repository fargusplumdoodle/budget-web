import * as React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Card, Grid, Stack, SxProps, Typography } from "@mui/material";
import { capitalize } from "lodash";
import { RootState } from "../store/configureStore";
import { formatCurrency } from "../util/formatters";
import DashboardTile from "../components/dashboard/DashboardTile";
import BudgetTransactionTable from "../components/budget/BudgetTransactionTable";
import { ReportTypes } from "../api/types";
import LineGraph from "../components/report/LineGraph";

const classes: { [id: string]: SxProps } = {
  header: {
    p: 2,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 3,
    paddingBottom: 1,
  },
  subheader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "top",
  },
};

const BudgetDetailPage: React.FC = function () {
  const { id } = useParams();
  const budget = useSelector(
    (state: RootState) => state.budgets.byId[parseInt(id)]
  );

  const queryParams = new URLSearchParams({
    budget__includes: budget.id.toString(),
  });

  if (!budget) {
    return <Typography variant="h1">ooof, can't find that one</Typography>;
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={6} justifyContent="center" alignItems="center">
        <Stack spacing={1}>
          <Card sx={classes.header}>
            <Box sx={classes.title}>
              <Typography variant="h3">{capitalize(budget.name)}</Typography>
              <Typography variant="h3">
                {formatCurrency(budget.balance, false)}
              </Typography>
            </Box>
            <Box sx={classes.subheader}>
              <Typography variant="h4">{budget.percentage}%</Typography>
              <div>
                <Typography variant="body2">
                  Monthly Income:{" "}
                  {formatCurrency(budget.income_per_month, false)}
                </Typography>
                <Typography variant="body2">
                  Monthly Outcome:{" "}
                  {formatCurrency(budget.outcome_per_month, false)}
                </Typography>
              </div>
            </Box>
          </Card>

          <Card>
            <BudgetTransactionTable budget={budget} />
          </Card>
        </Stack>
      </Grid>

      <Grid item xs={6} justifyContent="center" alignItems="center">
        <Stack spacing={1}>
          <DashboardTile>
            <LineGraph
              queryParams={queryParams}
              reportTypes={[
                ReportTypes.BUDGET_BALANCE,
                ReportTypes.BUDGET_DELTA,
              ]}
            />
          </DashboardTile>

          <DashboardTile>
            {/* <SpendingSummary budget={budget} /> */}
          </DashboardTile>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BudgetDetailPage;
