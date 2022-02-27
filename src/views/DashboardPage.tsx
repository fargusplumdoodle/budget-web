import * as React from "react";
import { FunctionComponent } from "react";
import BudgetTable from "../components/dashboard/BudgetTable";
import { Grid, Stack } from "@mui/material";
import DashboardTile from "../components/dashboard/DashboardTile";
import BudgetHistoryGraph from "../components/dashboard/BudgetBalanceGraph";
import StatusOverview from "../components/dashboard/StatusOverview";
import { connect } from "react-redux";
import { RootState } from "../store/configureStore";
import { Budget } from "../store/types/models";
import { ProviderContext, withSnackbar } from "notistack";
import IncomeOutcomeGraph from "../components/dashboard/IncomeOutcomeGraph";
import BalanceGraph from "../components/dashboard/BalanceGraph";

interface OwnProps extends ProviderContext {
  budgets: Budget[];
}

type Props = OwnProps;

const DashboardPage: FunctionComponent<Props> = ({ budgets }) => {
  if (budgets.length === 0) {
    return <></>;
  }
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6} justifyContent="center" alignItems="center">
          <Stack spacing={1}>
            <DashboardTile
              title="Budget Overview"
            >
              <BudgetTable budgets={budgets} />
            </DashboardTile>
            <DashboardTile title="Income / Outcome">
              <IncomeOutcomeGraph />
            </DashboardTile>
          </Stack>
        </Grid>
        <Grid item xs={6} alignItems="center">
          <Stack spacing={1}>
            <DashboardTile>
              <StatusOverview />
            </DashboardTile>

            <DashboardTile title="Budget Balance History">
              <BudgetHistoryGraph />
            </DashboardTile>

            <DashboardTile title="Balance History">
              <BalanceGraph />
            </DashboardTile>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  budgets: state.budgets.list,
});

export default connect(mapStateToProps)(withSnackbar(DashboardPage));
