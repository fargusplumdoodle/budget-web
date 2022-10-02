import { CommunicationKey } from "./types";
import { getTransactionHash } from "../data/transactions/utils";
import { Transaction } from "../data/transactions/types";
import { Budget } from "../data/budgets/types";
import { getBudgetHash } from "../data/budgets/utils";

export const getId = (key: CommunicationKey, obj: any) => {
  if (obj.id) return obj.id;
  if (key === "transaction") return getTransactionHash(obj as Transaction);
  if (key === "budget") return getBudgetHash(obj as Budget);

  return null;
};
