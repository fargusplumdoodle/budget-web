interface Model {
  id: number | null;
}
interface Tag extends Model {
  name: string;
}

interface Budget extends Model {
  name: string;
  percentage: number;
  balance: number;

  income_per_month: number;
  outcome_per_month: number;
}

interface Transaction extends Model {
  amount: number;
  description: string;
  budget_id: number;
  budget: Budget | null;
  date: Date;

  income: boolean;
  transfer: boolean;
  tags: string[];
}
