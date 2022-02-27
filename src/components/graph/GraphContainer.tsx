import * as React from "react";
import {
  GraphSeries,
  GraphReport,
  ReportType,
  TimeBucketSize,
} from "../../api/types";
import { useEffect, useState } from "react";
import GraphPresentation from "./GraphPresentation";
import { CircularProgress } from "@mui/material";
import api from "../../api";

type GraphContainerProps = {
  reportTypes: ReportType[];
  timeBucketSize: TimeBucketSize;
  queryParams?: URLSearchParams;
};

const GraphContainer: React.FC<GraphContainerProps> = function ({
  reportTypes,
  timeBucketSize,
  queryParams,
}) {
  const [reportSeries, setReportSeries] = useState<GraphSeries[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const promises: Promise<GraphReport>[] = [];
    setLoading(true);

    reportTypes.forEach(async (reportType) => {
      promises.push(api.report(reportType, timeBucketSize, queryParams));
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
  }, [reportTypes, timeBucketSize, queryParams]);

  return loading ? (
    <CircularProgress sx={{ m: "auto" }} />
  ) : (
    <GraphPresentation dates={dates} series={reportSeries} />
  );
};

export default GraphContainer;
