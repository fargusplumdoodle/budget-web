import { Model } from "../../";
import { Budget } from "../budgets";

export interface Tag extends Model {
  name: string;

  rank?: number | null;
  common_budget: Budget | null;
  common_transaction_amount: number | null;
}

export interface TagState {
  list: Tag[];
  byName: { [k: string]: Tag };
  byId: { [k: number]: Tag };
  lastFetch: string | null; // ISO Format
}
