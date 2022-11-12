import { RootState } from "../../types";

export const selectMobileDrawerOpen = (state: RootState) =>
  state.location.ui.mobileDrawerOpen;
