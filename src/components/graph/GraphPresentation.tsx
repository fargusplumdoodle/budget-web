import { Box } from "@mui/material";
import * as React from "react";
import Chart from "react-apexcharts";
import { GraphSeries } from "../../api/types/reports";

type GraphPresentationProps = {
  dates: string[];
  series: GraphSeries[];
};

const GraphPresentation: React.FC<GraphPresentationProps> = function ({
  dates,
  series,
}) {
  const data = {
    options: {
      xaxis: {
        categories: dates,
      },
    },
    series: series,
  };
  return (
    <Box color="red">
      <Chart
        className="graph"
        height={400}
        options={data.options}
        series={data.series}
        type="line"
      />
    </Box>
  );
};

export default GraphPresentation;
