import { makeRequest } from "./util";
import {
  BudgetBalanceReport,
  NumberBasedReport,
  SerializedBudgetBalanceReport,
  TimeBucketSize,
} from "./types/reports";
import { deserializeBudgetBalanceReport } from "./serializers";

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
