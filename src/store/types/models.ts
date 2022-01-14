interface Model {
  id: number | null;
}
export interface Tag extends Model {
  name: string;
  rank: number;
}

export interface Budget extends Model {
  id: number;
  name: string;
  percentage: number;
  balance: number;

  income_per_month: number;
  outcome_per_month: number;
}

export interface Transaction extends Model {
  amount: number | null;
  description: string | null;
  budget_id: number | null;
  budget: Budget | null;
  date: Date | null;

  income: boolean;
  transfer: boolean;
  tags: Tag[];
}
