import getDaysInMonth from "date-fns/getDaysInMonth";
import { RelativeTimeBucket, TimeBuckets } from "../api/report";

export const adaptMonthlyValue = (
  monthlyValue: number,
  analysisPeriod: RelativeTimeBucket | TimeBuckets
) => {
  switch (analysisPeriod) {
    case RelativeTimeBucket.TODAY:
      return monthlyValue / getDaysInMonth(new Date());
    case RelativeTimeBucket.THIS_WEEK:
      return monthlyValue / 4;
    case RelativeTimeBucket.THIS_MONTH || TimeBuckets.ONE_MONTH:
      return monthlyValue;
    case RelativeTimeBucket.THIS_QUARTER || TimeBuckets.THREE_MONTHS:
      return monthlyValue * 4;
    case RelativeTimeBucket.THIS_YEAR || TimeBuckets.ONE_YEAR:
      return monthlyValue * 12;
    default:
      return null;
  }
};

export const valueToMonthly = (value: number, timeBucket: TimeBuckets) => {
  switch (timeBucket) {
    case TimeBuckets.THREE_MONTHS:
      return value / 3;
    case TimeBuckets.ONE_YEAR:
      return value / 12;
    default:
    case TimeBuckets.ONE_MONTH:
      return value;
  }
};
