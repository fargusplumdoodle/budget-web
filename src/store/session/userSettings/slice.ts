import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_THEME } from "@fargusplumdoodle/themes";
import { UserSettingsState } from "./types";

export const initialState: UserSettingsState = {
  expected_monthly_net_income: -1,
  theme: {
    themeName: DEFAULT_THEME,
    darkMode: true,
  },
};

export const sliceKey = "userSettings";
const userSettingsSlice = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
    loadUserSettings(
      state: UserSettingsState,
      { payload: userSettings }: PayloadAction<UserSettingsState>
    ) {
      return userSettings;
    },
    updateUserSettings(state, _) {
      return state;
    },
    fetchUserSettings(state, _) {
      return state;
    },
  },
});
export const { loadUserSettings, updateUserSettings, fetchUserSettings } =
  userSettingsSlice.actions;
export default userSettingsSlice.reducer;
