import { SET_SYSTEM_THEME, TOGGLE_MOBILE_DRAWER } from "./actionTypes";
import { SystemThemeOption } from "@fargusplumdoodle/themes";
import { UIState } from "../types/stateTypes";
import { PayloadAction } from "@reduxjs/toolkit";

export function setSystemTheme(
  themeName: SystemThemeOption,
  darkMode: boolean
): PayloadAction<Partial<UIState>> {
  return {
    type: SET_SYSTEM_THEME,
    payload: { theme: { themeName, darkMode } },
  };
}

export function toggleMobileDrawer() {
  return {
    type: TOGGLE_MOBILE_DRAWER,
  };
}
