import { RootState } from "../../types";

export const selectMobileDrawerOpen = (state: RootState) =>
  state.location.ui.mobileDrawerOpen;

export const selectEditTag = (state: RootState) =>
  state.location.ui.tagDialog.tag;

export const selectEditTagDialogOpen = (state: RootState) =>
  state.location.ui.tagDialog.dialogOpen;
