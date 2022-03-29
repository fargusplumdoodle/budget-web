import { DateTime } from "luxon";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { ReportType, TimeBucketSize } from "../../../api/types";
import { mergeURLSearchParams } from "../../../api/util";
import ReportForm from "../../forms/reports/ReportForm";
import Graph from "./Graph";

type LineGraphProps = {
  hideTimebucketSelector?: boolean;
  hideDateLte?: boolean;

  defaultTimebucketSize?: TimeBucketSize;
  defaultDateGte?: DateTime;
  queryParams?: URLSearchParams;

  reportTypes: ReportType[];
};

const LineGraph: FunctionComponent<LineGraphProps> = ({
  hideTimebucketSelector,
  hideDateLte,
  defaultTimebucketSize,
  defaultDateGte,
  queryParams,
  reportTypes,
}) => {
  const initialState = {
    time_bucket_size: defaultTimebucketSize || "one_month",
    date__gte: (
      defaultDateGte || DateTime.now().minus({ months: 6 })
    ).toISODate(),
    date__lte: DateTime.now().toISODate(),
  };

  const [params, setParams] = useState<URLSearchParams>(
    mergeURLSearchParams([
      new URLSearchParams({ ...initialState }),
      queryParams,
    ])
  );
  const onSubmit = (params: URLSearchParams) => setParams(params);

  return (
    <div>
      <ReportForm
        {...{
          hideTimebucketSelector,
          hideDateLte,
          queryParams,
          defaultTimebucketSize: defaultTimebucketSize || "one_month",
          defaultDateGte: defaultDateGte || DateTime.now().minus({ months: 6 }),
        }}
        onSubmit={onSubmit}
      />
      <Graph reportTypes={reportTypes} queryParams={params} />
    </div>
  );
};

export default LineGraph;
