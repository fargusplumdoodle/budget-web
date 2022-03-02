import { Box, Button, LinearProgress, TextField } from "@mui/material";
import { DateTime } from "luxon";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../../api";
import {
  GraphReport,
  ReportTypes,
  timeBuckets,
  TimeBucketSize,
} from "../../../api/types";
import { Budget } from "../../../store/types/models";
import { Classes } from "../../../util/types";
import ControlledAutocomplete from "../../forms/inputs/ControlledAutoComplete";
import ControlledDateInput from "../../forms/inputs/ControlledDateInput";
import SpendingSummaryTable from "./SpendingSummaryTable";
import { SpendingSummaryData } from "./types";

const classes: Classes = {
  root: {},
  form: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 1,
    p: 1,
  },
};

interface SpendingSummaryProps {
  budget: Budget;
}

interface BudgetBalanceReportState {
  date__gte: Date;
  timeBucketSize: TimeBucketSize;
}

interface FormData {
  date__gte: Date;
  timeBucketSize: TimeBucketSize;
}

const SpendingSummary: FunctionComponent<SpendingSummaryProps> = ({
  budget,
}) => {
  const initialState: BudgetBalanceReportState = {
    timeBucketSize: "one_week",
    date__gte: new Date(DateTime.now().minus({ months: 2 }).toISODate()),
  };
  const [{ timeBucketSize, date__gte }, setFormData] =
    React.useState<BudgetBalanceReportState>({
      ...initialState,
    });
  const [spendingSummaryData, setSpendingSummaryData] = useState<
    SpendingSummaryData[]
  >([]);

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, getValues } = useForm<FormData>({
    defaultValues: {
      ...initialState,
      date__gte: new Date(initialState.date__gte),
    },
  });

  function presentData(
    income: GraphReport,
    outcome: GraphReport
  ): SpendingSummaryData[] {
    const data: SpendingSummaryData[] = [];
    for (let i = 0; i < income.dates.length; i++) {
      data.push({
        date: income.dates[i],
        income: income.series[0].data[i].toString(),
        outcome: outcome.series[0].data[i].toString(),
      });
    }
    return data;
  }
  React.useEffect(() => {
    const fetchData = async (): Promise<SpendingSummaryData[]> => {
      const queryParams = new URLSearchParams({
        date__gte: date__gte.toLocaleDateString(),
        date__lte: DateTime.now().toISODate(),
        budget__includes: budget.id.toString(),
      });

      const outcome = await api.report(
        ReportTypes.OUTCOME,
        timeBucketSize,
        queryParams
      );
      const income = await api.report(
        ReportTypes.INCOME,
        timeBucketSize,
        queryParams
      );
      return presentData(income, outcome);
    };
    setLoading(true);
    fetchData().then((data: SpendingSummaryData[]) => {
      setLoading(false);
      setSpendingSummaryData([...data]);
    });
  }, [timeBucketSize, date__gte, budget.id]);

  function onSubmit(data: FormData) {
    setFormData({
      ...data,
    });
  }

  return (
    <Box sx={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={classes.form}>
          <ControlledDateInput
            label="From"
            control={control}
            name="date__gte"
          />
          <ControlledAutocomplete<string, FormData>
            control={control}
            name="timeBucketSize"
            options={timeBuckets}
            getValues={getValues}
            sx={{ width: 200 }}
            disableClearable
            renderInput={(params: any) => (
              <TextField {...params} variant="standard" label="Time Bucket" />
            )}
          />
          <Button type="submit">Search</Button>
        </Box>
      </form>
      {loading ? (
        <LinearProgress />
      ) : (
        <SpendingSummaryTable data={spendingSummaryData} />
      )}
    </Box>
  );
};

export default SpendingSummary;
