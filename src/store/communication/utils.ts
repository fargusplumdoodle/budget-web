import { CommunicationKey } from "./types";
import { getTransactionHash } from "../transactions/utils";
import { Transaction } from "../transactions/types";

export const getId = (key: CommunicationKey, obj: any) => {
  if (obj.id) return obj.id;
  if (key === "transaction") return getTransactionHash(obj as Transaction);

  return null;
};
