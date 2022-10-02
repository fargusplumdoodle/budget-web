import { combineReducers } from "redux";
import { panesReducer } from "./panes";
import { uiReducer } from "./ui";

export * from "./panes";
export * from "./ui";

export const locationReducer = combineReducers({
  panes: panesReducer,
  ui: uiReducer,
});
