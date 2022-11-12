import getDaysInMonth from "date-fns/getDaysInMonth";
import { RelativeTimeBucket } from "../api/report";

export const adaptMonthlyValue = (
  monthlyValue: number,
  analysisPeriod: RelativeTimeBucket
) => {
  switch (analysisPeriod) {
    case RelativeTimeBucket.TODAY:
      return monthlyValue / getDaysInMonth(new Date());
    case RelativeTimeBucket.THIS_WEEK:
      return monthlyValue / 4;
    case RelativeTimeBucket.THIS_MONTH:
      return monthlyValue;
    case RelativeTimeBucket.THIS_QUARTER:
      return monthlyValue * 4;
    case RelativeTimeBucket.THIS_YEAR:
      return monthlyValue * 12;
    case RelativeTimeBucket.ALL_TIME:
      return null;
  }
};
