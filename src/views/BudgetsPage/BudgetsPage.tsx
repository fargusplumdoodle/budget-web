import * as React from "react";
import { Card, CircularProgress, Fab, Grid } from "@mui/material";
import BudgetTree from "./BudgetTree";
import BudgetTreeTableHeader from "./BudgetTree/BudgetTreeTableHeader";
import useBudgetsPage from "./useBudgetsPage";
import BudgetsPageHeader from "./BudgetsPageHeader";
import { Add } from "@mui/icons-material";

const BudgetsPage: React.FC = function () {
  const { loading, analysisPeriod, setAnalysisPeriod, addBudget } =
    useBudgetsPage();

  if (loading)
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Grid item component={CircularProgress} />
      </Grid>
    );

  return (
    <>
      <Card
        sx={(theme) => ({
          borderRadius: 4,
          p: 4,
          [theme.breakpoints.down("sm")]: {
            p: 2,
          },
        })}
      >
        <Grid container gap={2} direction="column">
          <BudgetsPageHeader
            analysisPeriod={analysisPeriod}
            setAnalysisPeriod={setAnalysisPeriod}
          />
          <Grid item>
            <BudgetTreeTableHeader />
            <BudgetTree />
          </Grid>
        </Grid>
      </Card>
      <Fab
        color="primary"
        size="medium"
        aria-label="add"
        onClick={addBudget}
        sx={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 20,
          left: "auto",
          position: "fixed",
        }}
      >
        <Add />
      </Fab>
    </>
  );
};

export default BudgetsPage;
