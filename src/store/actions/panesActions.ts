import { CLOSE_THEME_PANE, OPEN_THEME_PANE } from "./actionTypes";

export function openThemePane() {
  return { type: OPEN_THEME_PANE };
}
export function closeThemePane() {
  return { type: CLOSE_THEME_PANE };
}
