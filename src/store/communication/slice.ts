import {
  CommunicationState,
  RequestState,
  UpdateRequestStatusPayloadAction,
} from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: CommunicationState = {};

export const sliceKey = "communication";
const communicationSlice = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
    makeRequest(state, action: PayloadAction<RequestState>) {
      const requestState = action.payload;
      state[requestState.id] = { ...requestState };
    },
    updateRequestStatus(state, action: UpdateRequestStatusPayloadAction) {
      const { id, status } = action.payload;
      state[id].status = status;
    },
  },
});
export const { makeRequest, updateRequestStatus } = communicationSlice.actions;
export default communicationSlice.reducer;
