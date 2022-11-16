import React, { FunctionComponent } from "react";
import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import {
  RELATIVE_TIME_BUCKETS_OPTIONS,
  RelativeTimeBucket,
  RelativeTimeBucketOption,
} from "../../api/report";

interface Props {
  analysisPeriod: RelativeTimeBucket;
  setAnalysisPeriod: (analysisPeriod: RelativeTimeBucket) => void;
}

const BudgetsPageHeader: FunctionComponent<Props> = ({
  analysisPeriod,
  setAnalysisPeriod,
}) => {
  return (
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
        value={RELATIVE_TIME_BUCKETS_OPTIONS[analysisPeriod]}
        id="time-period-select"
        options={Object.values(RELATIVE_TIME_BUCKETS_OPTIONS)}
        sx={(theme) => ({
          width: 200,
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        })}
        onChange={(_e: any, option: any) => setAnalysisPeriod(option.value)}
        renderInput={(params: any) => (
          <TextField {...params} label="Analysis Period" />
        )}
      />
    </Grid>
  );
};

export default BudgetsPageHeader;
