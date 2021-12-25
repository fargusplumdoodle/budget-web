import * as React from "react";
import { FunctionComponent, useEffect } from "react";
import { generateTestBudget } from "../../util/generators";
import BudgetTable from "./BudgetTable";
import { Button, Grid, Stack } from "@mui/material";
import DashboardTile from "./DashboardTile";
import BudgetHistoryGraph from "./BudgetHistoryGraph";
import StatusOverview from "./StatusOverview";
import TransactionForm from "../common/forms/transaction/TransactionForm";
import { useDispatch } from "react-redux";
import { fetchBudgets } from "../../store/actions/budgetActions";

interface OwnProps {}

type Props = OwnProps;

const DashboardPage: FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBudgets());
  });
  const budgets = [
    generateTestBudget({ name: "housing", percentage: 41 }),
    generateTestBudget({ name: "food", percentage: 22 }),
    generateTestBudget({ name: "debt", percentage: 11 }),
    generateTestBudget({ name: "transportation", percentage: 6 }),
    generateTestBudget({ name: "savings", percentage: 6 }),
    generateTestBudget({ name: "personal", percentage: 5 }),
    generateTestBudget({ name: "phone", percentage: 3 }),
    generateTestBudget({ name: "health", percentage: 2 }),
    generateTestBudget({ name: "camping", percentage: 1 }),
    generateTestBudget({ name: "server", percentage: 1 }),
    generateTestBudget({ name: "clothing", percentage: 1 }),
    generateTestBudget({ name: "charity", percentage: 1 }),
  ];
  // sx={{ display: "flex", p: 1, m: 1, bgcolor: "background.paper" }}
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

export default DashboardPage;
