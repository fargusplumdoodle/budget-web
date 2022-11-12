import { Box, LinearProgress } from "@mui/material";
import { DateTime } from "luxon";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import api from "../../../api";
import { Classes } from "../../../util/types";
import ReportForm from "../../forms/reports/ReportForm";
import SpendingSummaryTable from "./SpendingSummaryTable";
import { SpendingSummaryData } from "./types";
import {GraphReport, ReportTypes, TimeBucketSize} from "../../../api/report";

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
  queryParams?: URLSearchParams;
  defaultTimebucketSize: TimeBucketSize;
}

const SpendingSummary: FunctionComponent<SpendingSummaryProps> = ({
  queryParams,
  defaultTimebucketSize,
}) => {
  const initialState: Record<string, string> = {
    time_bucket_size: defaultTimebucketSize,
    date__gte: DateTime.now().minus({ months: 6 }).toISODate(),
    date__lte: DateTime.now().toISODate(),
  };

  const [loading, setLoading] = useState(false);
  const [spendingSummaryData, setSpendingSummaryData] = useState<
    SpendingSummaryData[]
  >([]);

  const [params, setParams] = useState<URLSearchParams>(
    new URLSearchParams({ ...initialState })
  );

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
      const outcome = await api.report(ReportTypes.OUTCOME, params);
      const income = await api.report(ReportTypes.INCOME, params);
      return presentData(income, outcome);
    };
    setLoading(true);
    fetchData().then((data: SpendingSummaryData[]) => {
      setLoading(false);
      setSpendingSummaryData([...data]);
    });
  }, [params]);

  function onSubmit(data: URLSearchParams) {
    setParams(data);
  }

  return (
    <Box sx={classes.root}>
      <ReportForm
        defaultTimebucketSize={defaultTimebucketSize}
        defaultDateGte={DateTime.now().minus({ months: 2 })}
        queryParams={queryParams}
        onSubmit={onSubmit}
      />
      {loading ? (
        <LinearProgress />
      ) : (
        <SpendingSummaryTable data={spendingSummaryData} />
      )}
    </Box>
  );
};

export default SpendingSummary;
