import * as React from "react";
import { FunctionComponent, useState } from "react";
import Chart from "react-apexcharts";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DesktopDatePicker } from "@mui/lab";
import { LocalizationProvider } from "@mui/lab";
interface OwnProps {
  budgets: Budget[];
}

type Props = OwnProps;

const BudgetHistoryGraph: FunctionComponent<Props> = (props) => {
  const data = {
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
      {
        name: "series-2",
        data: [40, 27, 44, 57, 4, 57, 70, 88, 130],
      },
    ],
  };
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  return (
    <>
      <Chart
        height={400}
        options={data.options}
        series={data.series}
        type="line"
      />
    </>
  );
};

export default BudgetHistoryGraph;
