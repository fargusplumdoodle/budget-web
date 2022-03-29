interface Model {
  id: number | null;
}
export interface Tag extends Model {
  name: string;
  rank: number | null;
}

export interface Budget extends Model {
  name: string;
  percentage: number;
  balance: number;

  income_per_month: number;
  outcome_per_month: number;
}

export interface Transaction extends Model {
  amount: number;
  description: string | null;
  budget: Budget;
  date: Date;

  income: boolean;
  transfer: boolean;
  tags: Tag[];
}

export interface UserInfo {
  expected_monthly_net_income: number;
}
