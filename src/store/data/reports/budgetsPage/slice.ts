import { createSlice } from "@reduxjs/toolkit";
import {
  BudgetsPageReportState,
  SpendingReportPayloadAction,
  BudgetFinancialReport,
} from "./types";
import { generateReportForEachRelativeTimeBucket } from "../utils";

export const initialState: BudgetsPageReportState = {
  incomeReport:
    generateReportForEachRelativeTimeBucket<BudgetFinancialReport>(null),
  outcomeReport:
    generateReportForEachRelativeTimeBucket<BudgetFinancialReport>(null),
};

export const sliceKey = "budgetPageReport";
const budgetPageReport = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
    loadSpendingReport(
      state: BudgetsPageReportState,
      { payload }: SpendingReportPayloadAction
    ) {
      const { analysisPeriod, incomeReport, outcomeReport } = payload;
      if (incomeReport) state.incomeReport[analysisPeriod] = incomeReport;
      if (outcomeReport) state.outcomeReport[analysisPeriod] = outcomeReport;
    },
  },
});
export const { loadSpendingReport } = budgetPageReport.actions;
export default budgetPageReport.reducer;
