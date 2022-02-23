export type TimeBucketSize =
  | "one"
  | "one_day"
  | "one_week"
  | "one_month"
  | "three_months"
  | "six_months"
  | "one_year";

export interface ReportType {
  name: string;
  label: string;
  currency: boolean;
  multiple: boolean;
}

export const ReportTypes: { [name: string]: ReportType } = {
  TRANSACTION_COUNT: {
    name: "transaction_counts",
    label: "Transaction Counts",
    currency: false,
    multiple: false,
  },
  INCOME: { name: "income", label: "Income", currency: true, multiple: false },
  TRANSFER: {
    name: "transfer",
    label: "Transfer",
    currency: true,
    multiple: false,
  },
  OUTCOME: {
    name: "outcome",
    label: "Outcome",
    currency: true,
    multiple: false,
  },
  BUDGET_DELTA: {
    name: "budget_delta",
    label: "Δ",
    currency: true,
    multiple: true,
  },
  TAG_DELTA: {
    name: "tag_delta",
    label: "Δ",
    currency: true,
    multiple: true,
  },
  BUDGET_BALANCE: {
    name: "budget_balance",
    label: "balance",
    currency: true,
    multiple: true,
  },
  TAG_BALANCE: {
    name: "tag_balance",
    label: "balance",
    currency: true,
    multiple: true,
  },
};

export interface GraphSeries {
  name: string;
  data: number[];
}

export interface SerializedBudgetBalanceReport {
  dates: string[];
  data: { [id: number]: number[] };
}

export interface GraphReport {
  dates: string[];
  series: GraphSeries[];
}

export type ReportFetchFunc = (
  timeBucketSize: TimeBucketSize,
  query?: URLSearchParams
) => Promise<GraphReport>;

export interface SerializedSingleValueReport {
  dates: string[];
  data: number[];
}
