import { UserInfo } from "../../store/types/models";

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
  common_budget?: number | null;
  common_transaction_amount?: number | null;
}

export interface SerializedBudget extends SerializedModel {
  name: string;
  percentage: number;
  balance: number;
  income_per_month: number;
  outcome_per_month: number;
}

export interface SerializedUserInfo extends UserInfo {
  // currently identical
}
