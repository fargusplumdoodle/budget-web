import { mean } from "lodash";
import { DateTime } from "luxon";
import api from "../api";
import { ReportTypes } from "../api/types";

export async function getAverageOutcomePerMonth() {
  const qp = new URLSearchParams({
    date__gte: DateTime.now().minus({ months: 6 }).toISODate(),
    date__lte: DateTime.now().toISODate(),
  });
  const r = await api.report(ReportTypes.OUTCOME, "one_month", qp);
  return mean(r.series.map((s) => s.data)[0]);
}
