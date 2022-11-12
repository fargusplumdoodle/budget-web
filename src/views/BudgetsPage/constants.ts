import {
  RELATIVE_TIME_BUCKETS_OPTIONS,
  RelativeTimeBucket,
} from "../../api/report";
import { BudgetsPageContextType } from "./BudgetPageContext";

const defaultAnalysisPeriod =
  RELATIVE_TIME_BUCKETS_OPTIONS[RelativeTimeBucket.THIS_MONTH];

export const defaultBudgetPageContext: BudgetsPageContextType = {
  spentThisPeriod: {},
  analysisPeriod: defaultAnalysisPeriod,
};
