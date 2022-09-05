import { SET_SYSTEM_THEME } from "./actionTypes";
import { SystemThemeOption } from "@fargusplumdoodle/themes";

export function setSystemTheme(theme: SystemThemeOption, darkMode: boolean) {
  return { type: SET_SYSTEM_THEME, palette: { theme, darkMode } };
}
