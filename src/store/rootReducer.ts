import { combineReducers } from "redux";
import { communicationReducer } from "./communication";
import { locationReducer } from "./location";
import { dataReducer } from "./data";
import { sessionReducer } from "./session";

const rootReducer = combineReducers({
  location: locationReducer,
  data: dataReducer,
  session: sessionReducer,
  communication: communicationReducer,
});
export default rootReducer;
