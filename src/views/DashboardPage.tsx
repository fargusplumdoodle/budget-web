import * as React from "react";
import { FunctionComponent } from "react";
import BudgetTable from "../components/dashboard/BudgetTable";
import { Grid, Stack } from "@mui/material";
import DashboardTile from "../components/dashboard/DashboardTile";
import BudgetHistoryGraph from "../components/dashboard/BudgetHistoryGraph";
import StatusOverview from "../components/dashboard/StatusOverview";
import TransactionForm from "../components/common/forms/transaction/TransactionForm";
import { connect } from "react-redux";
import { RootState } from "../store/configureStore";
import { Budget } from "../store/types/models";
import { ProviderContext, withSnackbar } from "notistack";
import TagForm from "../components/common/forms/tag/TagForm";

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
              description="Describes current status of budgets"
            >
              <BudgetTable budgets={budgets} />
            </DashboardTile>
            <DashboardTile
              title="Add Transaction"
              description="Add a new Transaction"
            >
              <TransactionForm />
            </DashboardTile>
          </Stack>
        </Grid>
        <Grid item xs={6} alignItems="center">
          <Stack spacing={1}>
            <DashboardTile small={true}>
              <StatusOverview />
            </DashboardTile>
            <DashboardTile
              title="Balance History"
              description="Describes historical balance of your budgets"
            >
              <BudgetHistoryGraph budgets={budgets} />
            </DashboardTile>
            <DashboardTile small={true}>
              <TagForm />
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
