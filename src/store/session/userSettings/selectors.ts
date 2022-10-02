import { RootState } from "../../configureStore";

export const selectUserSettings = (state: RootState) =>
  state.session.userSettings;

export const selectThemeSettings = (state: RootState) =>
  state.session.userSettings.theme;
