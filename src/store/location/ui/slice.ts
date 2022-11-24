import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UIState } from "./types";
import { Tag } from "../../data";

export const initialState: UIState = {
  mobileDrawerOpen: false,
  tagDialog: {
    dialogOpen: false,
    tag: null,
  },
};

export const sliceKey = "ui";
const uiSlice = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
    toggleMobileDrawer(state: UIState) {
      state.mobileDrawerOpen = !state.mobileDrawerOpen;
    },
    closeTagDialog(state: UIState) {
      state.tagDialog.dialogOpen = false;
    },
    editTag(state: UIState, { payload: tag }: PayloadAction<Tag | null>) {
      state.tagDialog.tag = tag;
      state.tagDialog.dialogOpen = true;
    },
  },
});
export const { toggleMobileDrawer, closeTagDialog, editTag } = uiSlice.actions;
export default uiSlice.reducer;
