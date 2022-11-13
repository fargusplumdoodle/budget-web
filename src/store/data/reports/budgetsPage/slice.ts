import { createSlice } from "@reduxjs/toolkit";
import {
  BudgetsPageReportState,
  SpendingReportPayloadAction,
  SpentThisPeriodReport,
} from "./types";
import { generateReportForEachRelativeTimeBucket } from "../utils";

export const initialState: BudgetsPageReportState = {
  spendingReport:
    generateReportForEachRelativeTimeBucket<SpentThisPeriodReport>(null),
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
      const { analysisPeriod, spentThisPeriod } = payload;
      state.spendingReport[analysisPeriod] = { ...spentThisPeriod };
    },
  },
});
export const { loadSpendingReport } = budgetPageReport.actions;
export default budgetPageReport.reducer;
