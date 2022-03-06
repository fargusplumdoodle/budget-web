import Chart from "react-apexcharts";
import * as React from "react";
import {
  GraphSeries,
  GraphReport,
  ReportType,
} from "../../../api/types";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import api from "../../../api";

type LineGraphProps = {
  reportTypes: ReportType[];
  queryParams: URLSearchParams;
};

const LineGraph: React.FC<LineGraphProps> = function ({
  reportTypes,
  queryParams,
}) {
  const [reportSeries, setReportSeries] = useState<GraphSeries[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const promises: Promise<GraphReport>[] = [];
    setLoading(true);

    reportTypes.forEach(async (reportType) => {
      promises.push(api.report(reportType, queryParams));
    });
    Promise.all(promises).then((reports) => {
      setDates([...reports[0].dates]);
      setLoading(false);
      setReportSeries(
        reports
          .map((report) => report.series)
          .reduce((previousValue, currentValue) => [
            ...previousValue,
            ...currentValue,
          ])
      );
    });
  }, [reportTypes, queryParams]);

  return loading ? (
    <CircularProgress sx={{ m: "auto" }} />
  ) : (
    <Box color="red">
      <Chart
        className="graph"
        height={400}
        options={{
          xaxis: {
            categories: dates,
          },
        }}
        series={reportSeries}
        type="line"
      />
    </Box>
  );
};

export default LineGraph;
