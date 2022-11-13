import { combineReducers } from "redux";
import { reportSettingsReducer } from "./reportSettings";
import { budgetsPageReducer } from "./budgetsPage";

const reportReducer = combineReducers({
  settings: reportSettingsReducer,
  budgetsPage: budgetsPageReducer,
});

export default reportReducer;
