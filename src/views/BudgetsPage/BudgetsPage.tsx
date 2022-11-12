import * as React from "react";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  Card,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import BudgetTree from "./BudgetTree";
import BudgetTreeTableHeader from "./BudgetTree/BudgetTreeTableHeader";
import { relativeReport } from "../../api/endpoints";
import {
  RelativeTimeBucket,
  RELATIVE_TIME_BUCKETS_OPTIONS,
  ReportTypes,
} from "../../api/report";
import BudgetsPageContext, {
  BudgetsPageContextType,
} from "./BudgetPageContext";
import { deserializeReportData } from "./utils";
import { defaultBudgetPageContext } from "./constants";

const BudgetsPage: React.FC = function () {
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState<BudgetsPageContextType>(
    defaultBudgetPageContext
  );
  const { analysisPeriod } = context;

  const requestSpentThisPeriod = async (
    relativeTimeBucket: RelativeTimeBucket
  ) => {
    const serializedReport = await relativeReport(
      ReportTypes.BUDGET_DELTA,
      relativeTimeBucket
    );

    setContext({
      ...context,
      spentThisPeriod: deserializeReportData(serializedReport),
    });
  };

  useEffect(() => {
    setLoading(true);
    requestSpentThisPeriod(analysisPeriod).then(() => {
      setLoading(false);
    });
  }, [analysisPeriod]);

  const setAnalysisPeriod = (newAnalysisPeriod: RelativeTimeBucket) => {
    setContext({ ...context, analysisPeriod: newAnalysisPeriod });
  };

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
        <Grid
          item
          container
          justifyContent="space-between"
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              gap: theme.spacing(1),
            },
          })}
        >
          <Grid item component={Typography} variant="h4">
            Budgets
          </Grid>
          <Grid
            item
            component={Autocomplete}
            disablePortal
            disableClearable
            value={analysisPeriod}
            id="time-period-select"
            options={Object.values(RELATIVE_TIME_BUCKETS_OPTIONS)}
            sx={(theme) => ({
              width: 200,
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
            })}
            onChange={(_e, option: any) => setAnalysisPeriod(option)}
            renderInput={(params) => (
              <TextField {...params} label="Analysis Period" />
            )}
          />
        </Grid>
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
