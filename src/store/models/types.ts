export interface Model {
  id: number | null;
}
export interface Tag extends Model {
  name: string;

  rank?: number | null;
  common_budget: Budget | null;
  common_transaction_amount: number | null;
}

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

export interface UserInfo {
  expected_monthly_net_income: number;
}
