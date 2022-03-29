import * as React from "react";
import { FunctionComponent } from "react";
import BudgetTable from "../components/budget/BudgetTable";
import { Grid, Stack } from "@mui/material";
import DashboardTile from "../components/dashboard/DashboardTile";
import StatusOverview from "../components/dashboard/StatusOverview";
import { connect } from "react-redux";
import { RootState } from "../store/configureStore";
import { Budget } from "../store/types/models";
import { ProviderContext, withSnackbar } from "notistack";
import LineGraph from "../components/report/LineGraph/LineGraph";
import { ReportTypes } from "../api/types";
import SpendingSummary from "../components/report/spending_summary/SpendingSummary";

interface OwnProps extends ProviderContext {
  budgets: Budget[];
}

type Props = OwnProps;

const DashboardPage: FunctionComponent<Props> = ({ budgets }) => {
  if (budgets.length === 0) {
    return <></>;
  }
  return (
    <Grid container flexDirection={["column", "row"]} spacing={1}>
      <Grid item xs={6} justifyContent="center" alignItems="center">
        <Stack spacing={1}>
          <DashboardTile>
            <StatusOverview />
          </DashboardTile>

          <DashboardTile title="Budget Overview">
            <BudgetTable budgets={budgets} />
          </DashboardTile>

          <DashboardTile title="Income / Outcome">
            <LineGraph
              defaultTimebucketSize="one_week"
              reportTypes={[ReportTypes.INCOME, ReportTypes.OUTCOME]}
            />
          </DashboardTile>
        </Stack>
      </Grid>
      <Grid item xs={6} alignItems="center">
        <Stack spacing={1}>
          <DashboardTile title="Budget Balance History">
            <LineGraph
              defaultTimebucketSize="one_week"
              reportTypes={[ReportTypes.BUDGET_BALANCE]}
            />
          </DashboardTile>

          <DashboardTile title="Spending Summary">
            <SpendingSummary defaultTimebucketSize="one_month" />
          </DashboardTile>

          <DashboardTile title="Balance History">
            <LineGraph
              defaultTimebucketSize="one_month"
              reportTypes={[ReportTypes.BALANCE]}
            />
          </DashboardTile>
        </Stack>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: RootState) => ({
  budgets: state.budgets.list,
});

export default connect(mapStateToProps)(withSnackbar(DashboardPage));
