import { RootState } from "../../../types";
import { selectReportState } from "../selectors";
import { RelativeTimeBucket } from "../../../../api/report";
import { BudgetsPageReportState, SpentThisPeriodReport } from "./types";

export const selectBudgetPageState = (
  state: RootState
): BudgetsPageReportState => selectReportState(state).budgetsPage;

export const selectBudgetPageSpendingReportByAnalysisPeriod =
  (analysisPeriod: RelativeTimeBucket) =>
  (state: RootState): SpentThisPeriodReport | null =>
    selectBudgetPageState(state).spendingReport?.[analysisPeriod];
