import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth";
import ui from "./reducers/uiReducer";
import tags from "./reducers/tagReducer";
import userInfo from "./reducers/userInfoReducer";
import panes from "./reducers/panesReducer";
import { reducer as communication } from "./communication";
import { dataReducer } from "./data";

const rootReducer = combineReducers({
  auth: persistReducer(
    {
      key: "auth",
      storage,
    },
    authReducer
  ),
  ui: persistReducer(
    {
      key: "UI",
      storage,
    },
    ui
  ),
  userInfo,
  panes,
  communication,
  data: dataReducer,
});
export default rootReducer;
