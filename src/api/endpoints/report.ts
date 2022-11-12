import { makeRequest } from "../util";
import { RelativeTimeBucket, ReportType, SerializedReport } from "../report";
import { dateURLParamsFromRelativeTimeBucket } from "../report/utils";

export default async function report(
  reportType: ReportType,
  query: URLSearchParams
): Promise<SerializedReport> {
  const params = new URLSearchParams(query);

  const r = await makeRequest({
    method: "get",
    url: `/api/v2/reports/${reportType.name}/`,
    params,
  });

  return r!.data;
}

export async function relativeReport(
  reportType: ReportType,
  relativeTimeBucket: RelativeTimeBucket
): Promise<SerializedReport> {
  const params = dateURLParamsFromRelativeTimeBucket(relativeTimeBucket);
  return await report(reportType, params);
}
