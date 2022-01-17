import * as React from "react";
import { FunctionComponent } from "react";
import BudgetTable from "./BudgetTable";
import { Grid, Stack } from "@mui/material";
import DashboardTile from "./DashboardTile";
import BudgetHistoryGraph from "./BudgetHistoryGraph";
import StatusOverview from "./StatusOverview";
import TransactionForm from "../common/forms/transaction/TransactionForm";
import { connect } from "react-redux";
import { RootState } from "../../store/configureStore";
import { Budget } from "../../store/types/models";
import { ProviderContext, withSnackbar } from "notistack";
import TagForm from "../common/forms/TagForm";

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
      <h1>Dashboard</h1>
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
