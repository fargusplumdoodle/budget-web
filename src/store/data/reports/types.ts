import { ReportSettingsState } from "./reportSettings";
import { RelativeTimeBucket } from "../../../api/report";
import { BudgetsPageReportState } from "./budgetsPage";

export type RelativeTimeBucketReport<ReportType> = Record<
  RelativeTimeBucket,
  ReportType | null
>;

export interface ReportState {
  settings: ReportSettingsState;
  budgetsPage: BudgetsPageReportState;
}
