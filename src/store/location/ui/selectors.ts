import { RootState } from "../../configureStore";

export const selectMobileDrawerOpen = (state: RootState) =>
  state.location.ui.mobileDrawerOpen;
