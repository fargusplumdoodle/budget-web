import { BudgetState } from "./budgets";
import { ReportState } from "./reports";
import { TagState } from "./tags";
import { TransactionState } from "./transactions";

export interface DataState {
  budgets: BudgetState;
  tags: TagState;
  transactions: TransactionState;
  reports: ReportState;
}
