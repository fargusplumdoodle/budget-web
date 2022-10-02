import { combineReducers } from "redux";
import { authReducer } from "../auth";
import tags from "./tagReducer";
import storage from "redux-persist/lib/storage";
import userInfo from "./userInfoReducer";
import { reducer as communication } from "../communication";
import ui from "./uiReducer";
import panes from "./panesReducer";
import { persistReducer } from "redux-persist";
import { dataReducer } from "../data";

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
  tags,
  userInfo,
  panes,
  communication,
  data: dataReducer,
});
export default rootReducer;
