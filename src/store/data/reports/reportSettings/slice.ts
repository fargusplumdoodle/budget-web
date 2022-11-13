import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReportSettingsState } from "./types";
import { RelativeTimeBucket } from "../../../../api/report";

export const initialState: ReportSettingsState = {
  analysisPeriod: RelativeTimeBucket.THIS_MONTH,
};

export const sliceKey = "report";
const reportSettingsSlice = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
    setAnalysisPeriod(
      state: ReportSettingsState,
      { payload }: PayloadAction<RelativeTimeBucket>
    ) {
      state.analysisPeriod = payload;
    },
  },
});
export const { setAnalysisPeriod } = reportSettingsSlice.actions;
export default reportSettingsSlice.reducer;
