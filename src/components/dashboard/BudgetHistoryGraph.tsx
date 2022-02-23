import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Budget } from "../../store/types/models";
import { Button, CircularProgress } from "@mui/material";
import api from "../../api";
import { DateTime } from "luxon";
import { GraphSeries, ReportTypes } from "../../api/types/reports";

interface BudgetHistoryGraphProps {
  budgets: Budget[];
}

const BudgetHistoryGraph: FunctionComponent<BudgetHistoryGraphProps> = () => {
  const [loading, setLoading] = useState(false);
  const [series, setSeries] = useState<GraphSeries[]>([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {}, []);

  const fetch = () => {
    setLoading(true);
    const q = new URLSearchParams();
    q.set("date__gte", DateTime.now().minus({ months: 6 }).toISODate());
    q.set("date__lte", DateTime.now().toISODate());

    api.report(ReportTypes.BUDGET_DELTA, "one_week", q).then((r: any) => {
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
