import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_THEME, SystemThemeOption } from "@fargusplumdoodle/themes";
import { ThemeSettings, UserSettingsState } from "./types";

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
    setSystemTheme(state, { payload }: PayloadAction<ThemeSettings>) {
      state.theme = { ...payload };
    },
    updateUserSettings(state, _action) {
      return state;
    },
    fetchUserSettings(state, _) {
      return state;
    },
  },
});
export const {
  loadUserSettings,
  updateUserSettings,
  setSystemTheme,
  fetchUserSettings,
} = userSettingsSlice.actions;
export default userSettingsSlice.reducer;
