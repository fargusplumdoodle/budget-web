import { RootState } from "../../types";
import { selectDataState } from "../selectors";
import { ReportState } from "./types";

export const selectReportState = (state: RootState): ReportState =>
  selectDataState(state).reports;
