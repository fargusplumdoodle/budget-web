import { CommunicationKey } from "./types";
import { RootState } from "../configureStore";
import { getId } from "./utils";

export const selectRequestByModel = <T>(
  key: CommunicationKey,
  obj: T | null
) => {
  const id = getId(key, obj);
  return (state: RootState) => state.communication[id];
};

export const selectRequestById = (
  key: CommunicationKey,
  id: string | number | null
) => {
  return (state: RootState) => state.communication[id!];
};
