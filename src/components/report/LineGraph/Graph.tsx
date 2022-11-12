import * as React from "react";
import { CircularProgress } from "@mui/material";
import {ReportType} from "../../../api/report";

type LineGraphProps = {
  reportTypes: ReportType[];
  queryParams: URLSearchParams;
};

const LineGraph: React.FC<LineGraphProps> = () => <CircularProgress />;

/*
TODO:
  const [reportSeries, setReportSeries] = useState<GraphSeries[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const promises: Promise<SerializedReport>[] = [];
    setLoading(true);

    reportTypes.forEach(async (reportType) => {
      promises.push(api.report(reportType, queryParams));
    });
    Promise.all(promises).then((reports) => {
      setDates([...reports[0].dates]);
      setLoading(false);
      setReportSeries(
        reports
          .map((report) => deserializeMultipleValuesReport(report).series)
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
 */

export default LineGraph;
