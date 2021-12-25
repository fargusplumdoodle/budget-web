import * as React from "react";
import { FunctionComponent, useEffect } from "react";
import { generateTestBudget } from "../../util/generators";
import BudgetTable from "./BudgetTable";
import { Button, Grid, Stack } from "@mui/material";
import DashboardTile from "./DashboardTile";
import BudgetHistoryGraph from "./BudgetHistoryGraph";
import StatusOverview from "./StatusOverview";
import TransactionForm from "../common/forms/transaction/TransactionForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchBudgets } from "../../store/actions/budgetActions";
import { RootState } from "../../store/configureStore";

interface OwnProps {}

type Props = OwnProps;

const DashboardPage: FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch();
  const [budgets, setBudgets] = useSelector(
    (state: RootState) => state.budgets.list
  );
  console.log(typeof budgets, budgets);

  useEffect(() => {
    dispatch(fetchBudgets());
  }, []);
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
              {/*<BudgetTable budgets={budgets} />*/}
            </DashboardTile>
            <DashboardTile
              title="Add Transaction"
              description="Add a new Transaction"
            >
              {/*<TransactionForm />*/}
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
              {/*<BudgetHistoryGraph budgets={budgets} />*/}
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

export default DashboardPage;
