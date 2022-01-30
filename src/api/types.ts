export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface PaginatedQueryParams {
  page?: number;
  page_size: number;
}

interface SerializedModel {
  id?: number;
}

export interface SerializedTransaction extends SerializedModel {
  amount: number;
  description: string;
  budget: number;
  date: string;
  income: boolean;
  transfer: boolean;
  tags: SerializedTag[];
}

export interface SerializedTag extends SerializedModel {
  rank?: number;
  name: string;
}

export interface SerializedBudget extends SerializedModel {
  name: string;
  percentage: number;
  balance: number;
  income_per_month: number;
  outcome_per_month: number;
}
