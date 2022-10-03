import { RootState } from "../../types";
import { differenceInHours, parseISO } from "date-fns";
import { selectBudgetList, selectBudgetsLastFetched } from "../../data";

export const selectUserSettings = (state: RootState) =>
  state.session.userSettings;

export const selectThemeSettings = (state: RootState) =>
  state.session.userSettings.theme;

export const selectUserSettingsLastFetched = (state: RootState) =>
  state.session.userSettings.lastFetched;

export const selectFetchUserSettingsRequired = (state: RootState) => {
  const settings = selectUserSettings(state);

  const lastFetched = selectUserSettingsLastFetched(state);
  if (!lastFetched) return true;

  return differenceInHours(parseISO(lastFetched), new Date()) > 24;
};
