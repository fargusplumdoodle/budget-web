import { makeRequest } from "../util";
import { GraphReport, ReportType } from "../types/reports";
import {
  deserializeMultipleValuesReport,
  deserializeSingleValueReport,
} from "../serializers";

export default async function report(
  reportType: ReportType,
  query: URLSearchParams
): Promise<GraphReport> {
  const params = new URLSearchParams(query);

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
