import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Budget } from "../../store/types/models";
import { Button, CircularProgress } from "@mui/material";
import { budgetBalanceReport, GraphSeries } from "../../api/report";
import { DateTime } from "luxon";

interface OwnProps {
  budgets: Budget[];
}

type Props = OwnProps;

const BudgetHistoryGraph: FunctionComponent<Props> = () => {
  const [loading, setLoading] = useState(false);
  const [series, setSeries] = useState<GraphSeries[]>([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {}, []);

  const fetch = () => {
    setLoading(true);
    const q = new URLSearchParams();
    q.set("date__gte", DateTime.now().minus({ months: 6 }).toISODate());
    q.set("date__lte", DateTime.now().toISODate());

    budgetBalanceReport("one_week", q).then((r: any) => {
      setLoading(false);
      setCategories([...r.dates]);
      setSeries([...r.series]);
    });
  };

  const data = {
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: categories,
      },
    },
    series: series,
  };
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Button onClick={fetch}> FETCH</Button>
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
