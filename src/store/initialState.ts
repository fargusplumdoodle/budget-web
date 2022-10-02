import { UIState } from "./types/stateTypes";
import { DEFAULT_THEME } from "@fargusplumdoodle/themes";

const initialUIState: UIState = {
  theme: {
    themeName: DEFAULT_THEME,
    darkMode: true,
  },
  mobileDrawerOpen: false,
};
