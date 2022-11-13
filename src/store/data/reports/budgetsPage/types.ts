import { RelativeTimeBucketReport } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";
import { RelativeTimeBucket } from "../../../../api/report";

export type SpentThisPeriodReport = {
  [budgetId: number]: number;
} | null;

export type BudgetsPageReportState = {
  spendingReport: RelativeTimeBucketReport<SpentThisPeriodReport>;
};

export type SpendingReportPayloadAction = PayloadAction<{
  analysisPeriod: RelativeTimeBucket;
  spentThisPeriod: SpentThisPeriodReport;
}>;
