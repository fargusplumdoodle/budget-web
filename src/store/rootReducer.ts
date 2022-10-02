import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ui from "./reducers/uiReducer";
import userInfo from "./reducers/userInfoReducer";
import { communicationReducer } from "./communication";
import { dataReducer } from "./data";
import { locationReducer } from "./location";
import { sessionReducer } from "./session";

const rootReducer = combineReducers({
  ui: persistReducer(
    {
      key: "UI",
      storage,
    },
    ui
  ),
  userInfo,
  location: locationReducer,
  session: sessionReducer,
  communication: communicationReducer,
  data: dataReducer,
});
export default rootReducer;
