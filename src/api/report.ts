import { makeRequest } from "./util";
import { TimeBucketSize } from "./types/reports";
import { store } from "../store/configureStore";

interface SerializedBudgetBalanceReport {
  dates: string[];
  data: { [id: number]: number[] };
}

interface NumberBasedReport {
  dates: string[];
  data: number[];
}

interface BudgetBalanceReport {
  dates: string[];
  series: GraphSeries[];
}

export interface GraphSeries {
  name: string;
  data: number[];
}

export function deserializeBudgetBalanceReport(
  report: SerializedBudgetBalanceReport
): BudgetBalanceReport {
  const budgets = store.getState().budgets;
  const series: GraphSeries[] = [];

  for (const budgetId in report.data) {
    series.push({
      name: budgets.byId[budgetId].name,
      data: report.data[budgetId],
    });
  }

  return {
    dates: report.dates,
    series,
  };
}

export async function budgetBalanceReport(
  timeBucketSize: TimeBucketSize,
  query?: URLSearchParams
): Promise<BudgetBalanceReport> {
  const params = new URLSearchParams(query);

  params.set("time_bucket_size", timeBucketSize);

  const r = await makeRequest({
    method: "get",
    url: "/api/v2/reports/budget_balance/",
    params: params,
  });

  return deserializeBudgetBalanceReport(
    r.data as SerializedBudgetBalanceReport
  );
}

export async function transactionCountReport(
  timeBucketSize: TimeBucketSize,
  query?: URLSearchParams
): Promise<NumberBasedReport> {
  const params = new URLSearchParams(query);

  params.set("time_bucket_size", timeBucketSize);

  const r = await makeRequest({
    method: "get",
    url: "/api/v2/reports/transaction_count/",
    params: params,
  });

  return r.data;
}
