import * as React from "react";
import { FunctionComponent } from "react";
import { generateBudget } from "../../util/generators";
import BudgetTable from "./BudgetTable";
import { Grid } from "@mui/material";
import DashboardTile from "./DashboardTile";
import BudgetHistoryGraph from "./BudgetHistoryGraph";
import StatusOverview from "./StatusOverview";

interface OwnProps {}

type Props = OwnProps;

const DashboardPage: FunctionComponent<Props> = (props) => {
  const budgets = [
    generateBudget({ name: "housing", percentage: 41 }),
    generateBudget({ name: "food", percentage: 22 }),
    generateBudget({ name: "debt", percentage: 11 }),
    generateBudget({ name: "transportation", percentage: 6 }),
    generateBudget({ name: "savings", percentage: 6 }),
    generateBudget({ name: "personal", percentage: 5 }),
    generateBudget({ name: "phone", percentage: 3 }),
    generateBudget({ name: "health", percentage: 2 }),
    generateBudget({ name: "camping", percentage: 1 }),
    generateBudget({ name: "server", percentage: 1 }),
    generateBudget({ name: "clothing", percentage: 1 }),
    generateBudget({ name: "charity", percentage: 1 }),
  ];
  // sx={{ display: "flex", p: 1, m: 1, bgcolor: "background.paper" }}
  return (
    <>
      <h1>Dashboard</h1>
      <Grid container spacing={1}>
        <Grid item xs={6} justifyContent="center" alignItems="center">
          <DashboardTile
            title="Budget Overview"
            description="Describes current status of budgets"
            child={<BudgetTable budgets={budgets} />}
          />
        </Grid>
        <Grid item xs={6} alignItems="center">
          <DashboardTile
            title="Balance History"
            description="Describes historical balance of your budgets"
            child={<BudgetHistoryGraph budgets={budgets} />}
          />
        </Grid>
        <Grid item xs={6}>
          <DashboardTile child={<StatusOverview />} />
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
