import * as React from "react";
import { FunctionComponent, useEffect } from "react";
import BudgetTable from "./BudgetTable";
import { Button, Grid, Stack } from "@mui/material";
import DashboardTile from "./DashboardTile";
import BudgetHistoryGraph from "./BudgetHistoryGraph";
import StatusOverview from "./StatusOverview";
import TransactionForm from "../common/forms/transaction/TransactionForm";
import { connect, useDispatch } from "react-redux";
import { fetchBudgets } from "../../store/actions/budgetActions";
import { RootState } from "../../store/configureStore";
import { Budget } from "../../store/types/models";

interface OwnProps {
  budgets: Budget[];
}

type Props = OwnProps;

const DashboardPage: FunctionComponent<Props> = ({ budgets }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (budgets.length === 0) {
      dispatch(fetchBudgets());
    }
  }, [budgets.length, dispatch]);

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
              <p>ey p</p>
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
              <h2>Information! Wow</h2>
            </DashboardTile>
            <DashboardTile small={true}>
              <Button
                onClick={() => {
                  dispatch(fetchBudgets());
                }}
              >
                Request a thing
              </Button>
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

export default connect(mapStateToProps)(DashboardPage);
