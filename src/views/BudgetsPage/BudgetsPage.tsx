import * as React from "react";
import { Card, CircularProgress, Grid } from "@mui/material";
import BudgetTree from "./BudgetTree";
import BudgetTreeTableHeader from "./BudgetTree/BudgetTreeTableHeader";
import BudgetsPageContext from "./BudgetPageContext";
import useBudgetsPage from "./useBudgetsPage";
import BudgetsPageHeader from "./BudgetsPageHeader";

const BudgetsPage: React.FC = function () {
  const { context, loading, analysisPeriod, setAnalysisPeriod } =
    useBudgetsPage();

  if (loading)
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Grid item component={CircularProgress} />
      </Grid>
    );

  return (
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
          <BudgetsPageContext.Provider value={context}>
            <BudgetTree />
          </BudgetsPageContext.Provider>
        </Grid>
      </Grid>
    </Card>
  );
};

export default BudgetsPage;
