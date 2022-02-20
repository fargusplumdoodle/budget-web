export type TimeBucketSize =
  | "one"
  | "one_day"
  | "one_week"
  | "one_month"
  | "three_months"
  | "six_months"
  | "one_year";

export interface GraphSeries {
  name: string;
  data: number[];
}

export interface SerializedBudgetBalanceReport {
  dates: string[];
  data: { [id: number]: number[] };
}

export interface BudgetBalanceReport {
  dates: string[];
  series: GraphSeries[];
}

export interface NumberBasedReport {
  dates: string[];
  data: number[];
}
