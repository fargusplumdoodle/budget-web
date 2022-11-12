import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UIState } from "./types";

export const initialState: UIState = {
  mobileDrawerOpen: false,
};

export const sliceKey = "ui";
const uiSlice = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
    toggleMobileDrawer(state: UIState) {
      state.mobileDrawerOpen = !state.mobileDrawerOpen;
    },
  },
});
export const { toggleMobileDrawer } = uiSlice.actions;
export default uiSlice.reducer;
