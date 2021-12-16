import { combineReducers } from "redux";
import auth from "./authReducer";
import apiStatus from "./apiStatusReducer";

const rootReducer = combineReducers({
  auth,
  apiStatus,
});
export default rootReducer;
