import { makeRequest } from "../util";
import { GraphReport, ReportType, TimeBucketSize } from "../types/reports";
import {
  deserializeMultipleValuesReport,
  deserializeSingleValueReport,
} from "../serializers";

export default async function report(
  reportType: ReportType,
  timeBucketSize: TimeBucketSize,
  query?: URLSearchParams
): Promise<GraphReport> {
  const params = new URLSearchParams(query);
  params.set("time_bucket_size", timeBucketSize);

  const r = await makeRequest({
    method: "get",
    url: `/api/v2/reports/${reportType.name}/`,
    params: params,
  });

  const serializer = reportType.multiple
    ? deserializeMultipleValuesReport
    : deserializeSingleValueReport;

  return serializer(reportType, r.data);
}
