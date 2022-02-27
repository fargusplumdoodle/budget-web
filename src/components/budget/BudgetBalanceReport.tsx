import { Box, Button, SxProps } from "@mui/material";
import { DateTime } from "luxon";
import * as React from "react";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { ReportTypes, TimeBucketSize } from "../../api/types";
import { Budget } from "../../store/types/models";
import ControlledDateInput from "../common/forms/inputs/ControlledDateInput";
import GraphContainer from "../graph/GraphContainer";

const classes: { [name: string]: SxProps } = {
  form: {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    p: 1,
  },
  dateInput: {
    maxWidth: 100,
  },
};

interface BudgetBalanceReportProps {
  budget: Budget;
}

interface BudgetBalanceReportState {
  date__gte: string;
  date__lte: string;
  timeBucketSize: TimeBucketSize;
  budget__includes: string;
}

interface FormData {
  date__gte: Date;
  date__lte: Date;
  timeBucketSize: TimeBucketSize;
}

const BudgetBalanceReport: FunctionComponent<BudgetBalanceReportProps> = ({
  budget,
}) => {
  const initialState: BudgetBalanceReportState = {
    timeBucketSize: "one_day",
    date__gte: DateTime.now().minus({ months: 6 }).toISODate(),
    date__lte: DateTime.now().toISODate(),
    budget__includes: budget.id.toString(),
  };

  const [state, setState] = React.useState<BudgetBalanceReportState>({
    ...initialState,
  });
  const { timeBucketSize, ...params } = state;
  const queryParams = new URLSearchParams({ ...params });

  const { control, handleSubmit, getValues } = useForm<FormData>({
    defaultValues: {
      ...initialState,
      date__gte: new Date(initialState.date__gte),
      date__lte: new Date(initialState.date__lte),
    },
  });

  function onSubmit(data: FormData) {
    setState({
      ...state,
      ...data,
      date__gte: data.date__gte.toLocaleDateString(),
      date__lte: data.date__lte.toLocaleDateString(),
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={classes.form}>
          <ControlledDateInput label="From" control={control} name="date__gte" />
          <ControlledDateInput label="To" control={control} name="date__lte" />
          <Button type="submit">Search</Button>
        </Box>
      </form>
      <GraphContainer
        reportTypes={[ReportTypes.BUDGET_BALANCE, ReportTypes.BUDGET_DELTA]}
        timeBucketSize={timeBucketSize}
        queryParams={queryParams}
      />
    </div>
  );
};

export default BudgetBalanceReport;
