import {
  PanesState,
  TagState,
  UIState,
  UserInfoState,
} from "./types/stateTypes";
import { DEFAULT_THEME } from "@fargusplumdoodle/themes";

const initialTagState: TagState = {
  status: "init",
  list: [],
  byName: {},
  byId: {},
};

const initialUserInfoState: UserInfoState = {
  status: "init",
  expected_monthly_net_income: -1,
};

const initialUIState: UIState = {
  theme: {
    themeName: DEFAULT_THEME,
    darkMode: true,
  },
  mobileDrawerOpen: false,
};

const initialPanesState: PanesState = {
  current: null,
  transaction: null,
};

const initialState = {
  tags: initialTagState,
  userInfo: initialUserInfoState,
  ui: initialUIState,
  panes: initialPanesState,
};
export default initialState;
