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
  amount: number;
  description: string | null;
  budget: Budget;
  date: Date;

  income: boolean;
  transfer: boolean;
  tags: Tag[];
}
