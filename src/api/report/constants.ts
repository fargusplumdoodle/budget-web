import {
  RelativeTimeBucket,
  RelativeTimeBucketOption,
  ReportType,
  TimeBuckets,
  TimeBucketSize,
} from "./types";

export const RELATIVE_TIME_BUCKETS_OPTIONS: Record<
  RelativeTimeBucket,
  RelativeTimeBucketOption
> = {
  [RelativeTimeBucket.TODAY]: {
    label: "Today",
    value: RelativeTimeBucket.TODAY,
  },
  [RelativeTimeBucket.THIS_WEEK]: {
    label: "This Week",
    value: RelativeTimeBucket.THIS_WEEK,
  },
  [RelativeTimeBucket.THIS_MONTH]: {
    label: "This Month",
    value: RelativeTimeBucket.THIS_MONTH,
  },
  [RelativeTimeBucket.THIS_QUARTER]: {
    label: "This Quarter",
    value: RelativeTimeBucket.THIS_QUARTER,
  },
  [RelativeTimeBucket.THIS_YEAR]: {
    label: "This Year",
    value: RelativeTimeBucket.THIS_YEAR,
  },
  [RelativeTimeBucket.ALL_TIME]: {
    label: "All Time",
    value: RelativeTimeBucket.ALL_TIME,
  },
};

export const timeBuckets: TimeBucketSize[] = [
  TimeBuckets.ONE,
  TimeBuckets.ONE_DAY,
  TimeBuckets.ONE_WEEK,
  TimeBuckets.ONE_MONTH,
  TimeBuckets.THREE_MONTHS,
  TimeBuckets.SIX_MONTHS,
  TimeBuckets.ONE_YEAR,
];

export const ReportTypes: { [name: string]: ReportType } = {
  TRANSACTION_COUNT: {
    name: "transaction_counts",
    label: "Transaction Counts",
    currency: false,
    multiple: false,
  },
  INCOME: {
    name: "income",
    label: "Income",
    currency: true,
    multiple: false,
  },
  BALANCE: {
    name: "balance",
    label: "Balance",
    currency: true,
    multiple: false,
  },
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
  BUDGET_BALANCE: {
    name: "budget_balance",
    label: "balance",
    currency: true,
    multiple: true,
  },
  BUDGET_INCOME: {
    name: "budget_income",
    label: "balance",
    currency: true,
    multiple: true,
  },
  BUDGET_OUTCOME: {
    name: "budget_outcome",
    label: "balance",
    currency: true,
    multiple: true,
  },
  TAG_DELTA: {
    name: "tag_delta",
    label: "Δ",
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
