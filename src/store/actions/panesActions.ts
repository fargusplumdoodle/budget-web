import { CLOSE_ALL_PANES, OPEN_THEME_PANE } from "./actionTypes";

export function openThemePane() {
  return { type: OPEN_THEME_PANE };
}
export function closeAllPanes() {
  return { type: CLOSE_ALL_PANES };
}
