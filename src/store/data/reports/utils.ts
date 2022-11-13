import { RelativeTimeBucket } from "../../../api/report";
import { RelativeTimeBucketReport } from "./types";

export const generateReportForEachRelativeTimeBucket = <T>(initialState: T) =>
  Object.values(RelativeTimeBucket).reduce(
    (acc: RelativeTimeBucketReport<T>, curr) => {
      acc[curr as RelativeTimeBucket] = initialState;
      return acc;
    },
    {} as RelativeTimeBucketReport<T>
  );
