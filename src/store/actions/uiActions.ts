import { SET_SYSTEM_THEME } from "./actionTypes";
import { SystemThemeOption } from "@fargusplumdoodle/themes";
import { UIState } from "../types/stateTypes";
import { PayloadAction } from "@reduxjs/toolkit";

export function setSystemTheme(
  themeName: SystemThemeOption,
  darkMode: boolean
): PayloadAction<UIState> {
  return {
    type: SET_SYSTEM_THEME,
    payload: { theme: { themeName, darkMode } },
  };
}
