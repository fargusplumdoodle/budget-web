export enum TimeBuckets {
  ONE = "one",
  ONE_DAY = "one_day",
  ONE_WEEK = "one_week",
  ONE_MONTH = "one_month",
  THREE_MONTHS = "three_months",
  SIX_MONTHS = "six_months",
  ONE_YEAR = "one_year",
}

export type TimeBucketSize =
  | TimeBuckets.ONE
  | TimeBuckets.ONE_DAY
  | TimeBuckets.ONE_WEEK
  | TimeBuckets.ONE_MONTH
  | TimeBuckets.THREE_MONTHS
  | TimeBuckets.SIX_MONTHS
  | TimeBuckets.ONE_YEAR;

export enum RelativeTimeBucket {
  TODAY = "today",
  THIS_WEEK = "this_week",
  THIS_MONTH = "this_month",
  THIS_QUARTER = "this_quarter",
  THIS_YEAR = "this_year",
  ALL_TIME = "all_time",
}

export interface RelativeTimeBucketOption {
  label: string;
  value: RelativeTimeBucket;
}

export interface ReportType {
  name: string;
  label: string;
  currency: boolean;
  multiple: boolean;
}

export interface GraphSeries {
  name: string;
  data: number[];
}

export interface SerializedReport {
  dates: string[];
  data: { [id: number]: number[] };
}

export interface GraphReport {
  dates: string[];
  series: GraphSeries[];
}