import { RelativeTimeBucket } from "../../../../api/report";
import { BudgetsPageReportState } from "../budgetsPage/types";

export interface ReportSettingsState {
  analysisPeriod: RelativeTimeBucket;
}
