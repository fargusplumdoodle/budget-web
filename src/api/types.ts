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
