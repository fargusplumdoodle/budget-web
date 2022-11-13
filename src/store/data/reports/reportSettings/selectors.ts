import { RootState } from "../../../types";
import { selectReportState } from "../selectors";
import { RelativeTimeBucket } from "../../../../api/report";
import { ReportSettingsState } from "./types";

const selectReportSettingsState = (state: RootState): ReportSettingsState =>
  selectReportState(state).settings;

export const selectAnalysisPeriod = (state: RootState): RelativeTimeBucket =>
  selectReportSettingsState(state).analysisPeriod;
