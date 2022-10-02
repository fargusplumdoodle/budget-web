import { ExternalState } from "../../types/stateTypes";
import { Model } from "../../models/types";

export interface Budget extends Model {
  name: string;
  monthlyAllocation: number;
  balance: number;
  parent: Budget | null;
  parentId: number | null;
  isNode: boolean;
  income_per_month: number;
  outcome_per_month: number;
}

export interface BudgetState extends ExternalState {
  list: Budget[];
  byId: { [k: number]: Budget };
  byName: { [k: string]: Budget };
  root: Budget | null;
}
