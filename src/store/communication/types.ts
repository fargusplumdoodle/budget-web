import { PayloadAction } from "@reduxjs/toolkit";
import { budgetKey, tagKey, transactionKey } from "../data";
import { authKey, userSettingsKey } from "../session";

export type CommunicationKey =
  | typeof authKey
  | typeof transactionKey
  | typeof budgetKey
  | typeof tagKey
  | typeof userSettingsKey;

export type CRUDAction = "create" | "update" | "delete" | "retrieve";
export type RequestStatus = "loading" | "loaded" | "error";

export interface RequestState {
  key: CommunicationKey;
  action: CRUDAction;
  status: RequestStatus;
  id: string | number;
}

export interface CommunicationState {
  [id: string | number]: RequestState;
}

export type UpdateRequestStatusPayloadAction = PayloadAction<{
  id: string | number;
  status: RequestStatus;
}>;
