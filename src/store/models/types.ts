import { Budget } from "../data/budgets/types";

export interface Model {
  id: number | null;
}
export interface Tag extends Model {
  name: string;

  rank?: number | null;
  common_budget: Budget | null;
  common_transaction_amount: number | null;
}

export interface UserInfo {
  expected_monthly_net_income: number;
}
