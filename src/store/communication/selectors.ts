import { CommunicationKey } from "./types";
import { getId } from "./utils";
import { RootState } from "../types";

export const selectRequestByModel = <T>(
  key: CommunicationKey,
  obj: T | null
) => {
  const id = getId(key, obj);
  return (state: RootState) => state.communication[id];
};

export const selectRequestById =
  (key: CommunicationKey, id: string | number | null) => (state: RootState) =>
    state.communication[getId(key, id)];
