import { RelativeTimeBucket, TimeBuckets } from "./types";
import startOfToday from "date-fns/startOfToday";
import startOfWeek from "date-fns/startOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import startOfQuarter from "date-fns/startOfQuarter";
import startOfYear from "date-fns/startOfYear";

type Params = { [key: string]: any };

const dateParamsToISOStrings = (params: Params) => ({
  ...params,
  date__gte: params.date__gte.toISOString(),
  date__lte: params.date__lte.toISOString(),
});

const getRelativeTimeDates = (
  relativeTimeBucket: RelativeTimeBucket
): Params => {
  const now = new Date();
  const defaultParams = {
    date__lte: now,
  };

  switch (relativeTimeBucket) {
    case RelativeTimeBucket.TODAY:
      return {
        ...defaultParams,
        date__gte: startOfToday(),
      };
    case RelativeTimeBucket.THIS_WEEK:
      return {
        ...defaultParams,
        date__gte: startOfWeek(now),
      };
    case RelativeTimeBucket.THIS_MONTH:
      return {
        ...defaultParams,
        date__gte: startOfMonth(now),
      };
    case RelativeTimeBucket.THIS_QUARTER:
      return {
        ...defaultParams,
        date__gte: startOfQuarter(now),
      };
    case RelativeTimeBucket.THIS_YEAR:
      return {
        ...defaultParams,
        date__gte: startOfYear(now),
      };
    case RelativeTimeBucket.ALL_TIME:
    default:
      return {
        ...defaultParams,
        date__gte: new Date(1970, 1, 1),
      };
  }
};

export const dateURLParamsFromRelativeTimeBucket = (
  relativeTimeBucket: RelativeTimeBucket
) => {
  const relativeDates = getRelativeTimeDates(relativeTimeBucket);

  return new URLSearchParams({
    time_bucket_size: TimeBuckets.ONE,
    ...dateParamsToISOStrings(relativeDates),
  });
};
