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
  children: Budget[];
  isNode: boolean;
  income_per_month: number;
  outcome_per_month: number;
}

export interface Transaction extends Model {
  amount: number;
  description: string | null;
  budget: Budget;
  date: Date;

  created: Date;
  modified: Date;

  income: boolean;
  transfer: boolean;
  tags: Tag[];
}

export interface UserInfo {
  expected_monthly_net_income: number;
}
