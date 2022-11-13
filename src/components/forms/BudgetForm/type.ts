import { Budget } from "../../../store";
import { TimeBuckets } from "../../../api/report";

export interface BudgetFormType {
  id: number | null;
  name: string;
  monthlyAllocation: number;
  parent: Budget | null;
}
