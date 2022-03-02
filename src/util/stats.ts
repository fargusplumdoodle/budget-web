import { mean } from "lodash";
import { DateTime } from "luxon";
import api from "../api";
import { ReportTypes } from "../api/types";
import { EXPECTED_BUDGETS } from "../app/settings";
import { store } from "../store/configureStore";

export async function getAverageOutcomePerMonth() {
  const state = store.getState();
  const savings = state.budgets.byName[EXPECTED_BUDGETS.SAVINGS];
  const qp = new URLSearchParams({
    date__gte: DateTime.now().minus({ months: 6 }).toISODate(),
    date__lte: DateTime.now().toISODate(),
    budget__excludes: savings.id.toString(),
    time_bucket_size: "one_month",
  });
  const r = await api.report(ReportTypes.OUTCOME, qp);
  return mean(r.series.map((s) => s.data)[0]);
}
