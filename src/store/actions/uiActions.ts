import { SET_SYSTEM_THEME } from "./actionTypes";
import { SystemThemeOption } from "@fargusplumdoodle/themes";

export function setSystemTheme(
  themeName: SystemThemeOption,
  darkMode: boolean
) {
  return { type: SET_SYSTEM_THEME, payload: { themeName, darkMode } };
}
