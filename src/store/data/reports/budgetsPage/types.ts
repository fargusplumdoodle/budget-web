import { RelativeTimeBucketReport } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";
import { RelativeTimeBucket } from "../../../../api/report";

export type BudgetFinancialReport = {
  [budgetId: number]: number;
} | null;

export type BudgetsPageReportState = {
  incomeReport: RelativeTimeBucketReport<BudgetFinancialReport>;
  outcomeReport: RelativeTimeBucketReport<BudgetFinancialReport>;
};

export type SpendingReportPayloadAction = PayloadAction<{
  analysisPeriod: RelativeTimeBucket;
  incomeReport?: BudgetFinancialReport;
  outcomeReport?: BudgetFinancialReport;
}>;
