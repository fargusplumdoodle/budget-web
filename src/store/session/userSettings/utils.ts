import { Budget } from "../../data";
import {
  CRUDAction,
  getId,
  makeRequest,
  RequestStatus,
} from "../../communication";

export const getUserSettingsRequest = (
  action: CRUDAction,
  status: RequestStatus
) =>
  makeRequest({
    id: action,
    key: "userSettings",
    action,
    status,
  });
